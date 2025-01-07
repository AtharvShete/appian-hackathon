"use client";

import { useState, useEffect } from "react";
import { DiffEditor, Editor } from "@monaco-editor/react";
import Preview from "@/components/Preview";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Toggle } from "@/components/ui/toggle";

export default function EditorPage() {
  const [originalHtml, setOriginalHtml] = useState("");
  const [modifiedHtml, setModifiedHtml] = useState("");
  const [viewMode, setViewMode] = useState<
    "original" | "modified" | "diff"
  >("original");
  const [dialogOpen, setDialogOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedOriginalHtml = localStorage.getItem("userHTMLContent");
    const savedModifiedHtml = localStorage.getItem("newHTMLContent");
    if (!savedOriginalHtml || !savedModifiedHtml) {
      router.push("/");
      return;
    }
    setOriginalHtml(savedOriginalHtml);
    setModifiedHtml(savedModifiedHtml);
  }, [router]);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      if (viewMode === "original") {
        setOriginalHtml(value);
        localStorage.setItem("userHTMLContent", value);
      } else if (viewMode === "modified") {
        setModifiedHtml(value);
        localStorage.setItem("newHTMLContent", value);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Navbar modifiedHtml={modifiedHtml} />

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Improved Web Page!</AlertDialogTitle>
            <AlertDialogDescription>
              Your web page has been improved! Feel free to edit or download the modified version. You can also request further modifications through our chatbox.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setDialogOpen(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="relative bg-white">
          {viewMode === "diff" ? (
            <DiffEditor
              height="calc(100% - 50px)" 
              language="html"
              original={originalHtml}
              modified={modifiedHtml}
              theme="vs-dark"
              options={{
                fontSize: 16,
                wordWrap: "on",
                minimap: { enabled: false },
              }}
            />
          ) : (
            <Editor
              height="calc(100% - 50px)" 
              language="html"
              value={viewMode === "original" ? originalHtml : modifiedHtml}
              onChange={handleEditorChange}
              theme="vs-dark"
              options={{
                fontSize: 16,
                wordWrap: "on",
                minimap: { enabled: false },
              }}
            />
          )}

          <div className="absolute bottom-0 left-0 flex justify-center w-full bg-white py-2 gap-4">
            <Toggle
              pressed={viewMode === "original"}
              className="bg-black text-white"
              onClick={() => setViewMode("original")}
            >
              Original HTML
            </Toggle>
            <Toggle
              pressed={viewMode === "modified"}
              className="bg-black text-white"
              onClick={() => setViewMode("modified")}
            >
              Modified HTML
            </Toggle>
            <Toggle
              pressed={viewMode === "diff"}
              className="bg-black text-white"
              onClick={() => setViewMode("diff")}
            >
              View Differences
            </Toggle>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="h-full bg-white">
          <Preview
            html={viewMode === "original" ? originalHtml : modifiedHtml}
            onHtmlChange={(updatedHtml) => {
              if (viewMode === "original") {
                setOriginalHtml(updatedHtml);
                localStorage.setItem("userHTMLContent", updatedHtml);
              } else {
                setModifiedHtml(updatedHtml);
                localStorage.setItem("newHTMLContent", updatedHtml);
              }
            }}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
