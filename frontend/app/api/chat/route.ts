"use server";

import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";

export async function POST(req: Request) {
	const { messages } = await req.json();

	const response = streamText({
		model: groq("llama-3.1-8b-instant"),
		messages,
		system:
			"You are a helpful HTML expert. Help users understand and modify their HTML code.",
	});

	return response.toDataStreamResponse();
}
