"use server";

import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";

export async function modifyHtmlWithGroq(query: string, currentHtml: string) {
	try {
		const { text } = await generateText({
			model: groq("llama-3.1-8b-instant"),
			prompt: `Given this HTML content:
${currentHtml}

Modify the HTML based on this request: "${query}"

Return ONLY the modified HTML without any explanation or markdown formatting.`,
		});

		return { success: true, html: text };
	} catch (error) {
		console.error("Groq API error:", error);
		return { success: false, error: "Failed to process request" };
	}
}
