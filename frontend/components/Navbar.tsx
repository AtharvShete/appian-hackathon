"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react"; // Import the download icon

interface NavbarProps {
  modifiedHtml: string;
}

export default function Navbar({ modifiedHtml }: NavbarProps) {
  const downloadModifiedHtml = () => {
    const blob = new Blob([modifiedHtml], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "modified.html";
    link.click();
  };

  return (
    <div className="flex items-center px-4 py-2 bg-white shadow-md">
      <div className="flex-1 flex justify-start">
        <img src="/appian-logo.png" alt="Appian Logo" className="w-15 h-6" />
      </div>

      <div className="flex-1 text-lg font-semibold text-black text-center">
        Appian HTML Improver Tool
      </div>

      <div className="flex-1 flex justify-end">
        <Button
          variant="default"
          className="bg-black text-white flex items-center gap-2"
          onClick={downloadModifiedHtml}
        >
          <Download size={16} /> 
          Download Modified HTML
        </Button>
      </div>
    </div>
  );
}
