import {useState} from "react";
import {Copy, Download, Eye, FileText} from "lucide-react";
import {toast} from "sonner";
import type {TexTree} from "@/shared/presentation/tex/texTree.ts";
import {texTreeToEbproofDocument} from "@/shared/presentation/tex/ebproofExport.ts";
import {useTexRefExpansion} from "@/features/proof-tree/components/proof-tree-using-css/TexRefExpansionContext.tsx";
import {downloadTextFile} from "@/shared/lib/downloadTextFile.ts";
import {Button} from "@/shared/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog.tsx";

interface ExportLatexButtonsProps {
  // Takes the currently-expanded key set so a caller building a TexTree from
  // something other than a plain proof (e.g. Build & Check's student tree)
  // can resolve its own Γ/def toggles the same way the shared renderer does.
  buildTree: (expandedKeys: ReadonlySet<string>) => TexTree;
  filename: string;
}

// Must render inside the TexRefExpansionProvider that scopes the tree being
// exported, so its expand/collapse snapshot matches what's on screen.
export function ExportLatexButtons({buildTree, filename}: ExportLatexButtonsProps) {
  const {expandedKeys} = useTexRefExpansion();
  const [previewOpen, setPreviewOpen] = useState(false);

  const buildDocument = () => texTreeToEbproofDocument(buildTree(expandedKeys), {expandedKeys});

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(buildDocument());
      toast.success("LaTeX copied to clipboard");
    } catch (e) {
      console.error("Failed to copy LaTeX", e);
      toast.error("Couldn't copy to clipboard");
    }
  };

  const download = () => {
    downloadTextFile(filename, buildDocument(), "text/x-tex");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="secondary"
            className="shadow-lg hover:shadow-xl transition-shadow"
            title="Export LaTeX"
          >
            <FileText className="h-4 w-4"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Export LaTeX (ebproof)</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuItem onSelect={() => setPreviewOpen(true)}>
            <Eye className="h-4 w-4"/>
            Preview
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={copy}>
            <Copy className="h-4 w-4"/>
            Copy
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={download}>
            <Download className="h-4 w-4"/>
            Download .tex
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>LaTeX export preview</DialogTitle>
            <DialogDescription>
              Standalone document using the ebproof package — matches exactly what's expanded or collapsed on screen right now.
            </DialogDescription>
          </DialogHeader>

          <pre className="max-h-[60vh] overflow-auto rounded-lg border bg-muted/30 p-4 text-xs font-mono whitespace-pre">
            {previewOpen ? buildDocument() : ""}
          </pre>

          <DialogFooter>
            <Button variant="outline" onClick={copy}>
              <Copy className="h-4 w-4"/>
              Copy
            </Button>
            <Button onClick={download}>
              <Download className="h-4 w-4"/>
              Download .tex
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
