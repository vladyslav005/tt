#!/bin/bash
# Bumps + commits + tags both publishable packages (packages/core, apps/vscode-extension)
# in one go, then optionally pushes to trigger the actual publish via release.yml.
#
# Uses `npm version --no-git-tag-version` (file bump only) followed by explicit git
# commands, instead of npm version's built-in git integration — that integration was
# found to silently skip the commit+tag step in this environment with no error.
set -euo pipefail

BUMP="${1:-patch}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [ -n "$(git status --porcelain)" ]; then
  echo "Working tree isn't clean — commit or stash changes first." >&2
  exit 1
fi

release_package() {
  local workspace_name="$1"
  local package_dir="$2"
  local tag_prefix="$3"
  local commit_scope="$4"

  # Redirect these commands' own stdout to stderr so it still shows live in the
  # terminal, but doesn't get swept into the `$(...)` capture of this function's
  # only real return value: the tag name, printed last.
  npm version "$BUMP" --no-git-tag-version --workspace="$workspace_name" >&2

  local new_version
  new_version="$(node -p "require('./$package_dir/package.json').version")"
  local tag="${tag_prefix}${new_version}"

  git add "$package_dir/package.json" package-lock.json
  git commit -m "chore($commit_scope): release $tag" >&2
  git tag "$tag"

  echo "$tag"
}

CORE_TAG="$(release_package "@vladyslav005/tt-core" "packages/core" "core-v" "core")"
echo "Tagged $CORE_TAG"

EXT_TAG="$(release_package "tt-vscode-extension" "apps/vscode-extension" "vscode-v" "extension")"
echo "Tagged $EXT_TAG"

echo
echo "Both packages bumped, committed, and tagged locally."
read -r -p "Push now to trigger the actual publish? [y/N] " reply
if [[ "$reply" =~ ^[Yy]$ ]]; then
  # Push the branch and each tag as SEPARATE `git push` calls — pushing multiple tags
  # together in one push can make GitHub only fire a workflow run for one of them.
  git push origin main
  git push origin "$CORE_TAG"
  git push origin "$EXT_TAG"
  echo "Pushed. Check the Actions tab on GitHub — you should see two separate publish runs."
else
  echo "Not pushed. When ready, push the branch and each tag separately:"
  echo "  git push origin main"
  echo "  git push origin $CORE_TAG"
  echo "  git push origin $EXT_TAG"
fi
