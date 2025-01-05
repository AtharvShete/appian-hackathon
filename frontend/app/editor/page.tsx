"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Preview from "@/components/Preview";
import { useRouter } from "next/navigation";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function EditorPage() {
	const [html, setHtml] = useState("");
	const router = useRouter();

	useEffect(() => {
		const savedHtml = localStorage.getItem("htmlContent");
		if (!savedHtml) {
			router.push("/");
			return;
		}
		setHtml(savedHtml);
	}, [router]);

	const handleEditorChange = (value: string | undefined) => {
		if (value !== undefined) {
			setHtml(value);
			localStorage.setItem("htmlContent", value);
		}
	};

	return (
		<div className="flex h-screen">
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel>
					<Editor
						height="100%"
						defaultLanguage="html"
						value={html}
						onChange={handleEditorChange}
						theme="vs-dark"
						options={{
							minimap: { enabled: false },
							fontSize: 16,
							wordWrap: "on",
						}}
					/>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel className="h-full">
					{" "}
                    <Preview
						html={html}
						onHtmlChange={setHtml}
					/>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
