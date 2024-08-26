// /pages/api/generatePoem.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Create an asynchronous function to handle POST request
export async function POST(req: Request) {
  console.log("request method", req.method);
  const prompt = await req.json();
  console.log(prompt.prompt);
  // return NextResponse.json({prompt})
  const message = prompt.prompt;

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined");
  }

  try {
    // Access your API key by creating an instance of GoogleGenerativeAI
    const genAI = new GoogleGenerativeAI(apiKey);

    // Initialize a generative model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-exp-0801",
      generationConfig: { responseMimeType: "application/json" },
    });

    // Pass the prompt to the model and retrieve the output
    const result = await model.generateContent(message);

    console.log(result);

    const text_str =
      result?.response?.candidates?.[0].content.parts?.[0].text ?? null;
    const text = JSON.parse(text_str ?? "Parse Error");
    console.log(text);

    // Send the LLM output as a server response object

    return NextResponse.json({ text });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "There might be something wrong" },
      { status: 500 },
    );
  }
}
