const esbuild = require("esbuild");
const fs = require("fs");

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');

const WEBVIEW_CSS_FILES = [
	['src/webview/evaluationSteps/styles.css', 'dist/webview/evaluationSteps.css'],
	['src/webview/proofTree/styles.css', 'dist/webview/proofTree.css'],
];

function copyWebviewCss() {
	fs.mkdirSync('dist/webview', { recursive: true });
	for (const [from, to] of WEBVIEW_CSS_FILES) {
		fs.copyFileSync(from, to);
	}
}

/**
 * @type {import('esbuild').Plugin}
 */
const esbuildProblemMatcherPlugin = {
	name: 'esbuild-problem-matcher',

	setup(build) {
		build.onStart(() => {
			console.log('[watch] build started');
		});
		build.onEnd((result) => {
			result.errors.forEach(({ text, location }) => {
				console.error(`✘ [ERROR] ${text}`);
				console.error(`    ${location.file}:${location.line}:${location.column}:`);
			});
			console.log('[watch] build finished');
		});
	},
};

async function main() {
	const nodeCtx = await esbuild.context({
		define: {
			"import.meta.url": "import_meta_url",
		},
		banner: {
			js: `const import_meta_url = require("url").pathToFileURL(__filename).href;`,
		},
		entryPoints: [
			'src/extension.ts'
		],
		bundle: true,
		format: 'cjs',
		minify: production,
		sourcemap: !production,
		sourcesContent: false,
		platform: 'node',
		outfile: 'dist/extension.js',
		external: ['vscode'],
		logLevel: 'silent',
		plugins: [
			/* add to the end of plugins array */
			esbuildProblemMatcherPlugin,
		],
	});

	const webviewCtx = await esbuild.context({
		entryPoints: [
			{ in: 'src/webview/evaluationSteps/main.ts', out: 'evaluationSteps' },
			{ in: 'src/webview/proofTree/main.ts', out: 'proofTree' },
		],
		bundle: true,
		format: 'iife',
		platform: 'browser',
		target: 'es2020',
		outdir: 'dist/webview',
		minify: production,
		sourcemap: !production,
		sourcesContent: false,
		logLevel: 'silent',
		plugins: [
			esbuildProblemMatcherPlugin,
		],
	});

	copyWebviewCss();

	if (watch) {
		await Promise.all([nodeCtx.watch(), webviewCtx.watch()]);
	} else {
		await Promise.all([nodeCtx.rebuild(), webviewCtx.rebuild()]);
		await Promise.all([nodeCtx.dispose(), webviewCtx.dispose()]);
	}
}

main().catch(e => {
	console.error(e);
	process.exit(1);
});
