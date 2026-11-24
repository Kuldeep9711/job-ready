import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { question, answer } = await req.json();

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Question and answer are required" },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert interview coach.
Evaluate the following interview answer and give short, clear, helpful feedback.

Question: ${question}
Answer: ${answer}

Please provide:
1. Overall rating (out of 10)
2. What was good
3. What can be improved
4. A better version of the answer (short)

Keep the response concise and professional.
`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
       model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "AI request failed" },
        { status: 500 }
      );
    }

    const feedback = data.choices[0]?.message?.content || "No feedback generated.";

    return NextResponse.json({ feedback });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}


