import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { unit, lesson } = await req.json();

    const systemPrompt = `
You are an expert Vietnamese high school Physics teacher.
You master the Vietnamese General Education Curriculum 2018 and the National High School Exam orientation.
You create accurate, structured, exam-oriented Physics 12 content.
All responses must be in Vietnamese.
Always prioritize scientific correctness, clarity, and pedagogical value.
`;

    const userPrompt = `
Create a Physics 12 lesson aligned with Vietnamese knowledge and skills standards.

Subject: Physics
Grade: 12
Unit (Chapter): ${unit}
Lesson: ${lesson}

Output STRICTLY in JSON format:

{
  "metadata": {
    "subject": "Vật lí",
    "grade": "12",
    "unit": "${unit}",
    "lesson": "${lesson}",
    "orientation": "Chuẩn kiến thức – kĩ năng & luyện thi THPT"
  },
  "slides": [
    {
      "slide_type": "theory",
      "title": "Kiến thức trọng tâm",
      "content": [
        {
          "concept": "",
          "definition": "",
          "formula": "",
          "units": "",
          "note": ""
        }
      ]
    },
    {
      "slide_type": "exam_skills",
      "title": "Kĩ năng giải bài tập",
      "content": []
    },
    {
      "slide_type": "worked_example",
      "title": "Bài tập thực chiến",
      "content": {
        "question": "",
        "analysis": "",
        "solution_steps": [],
        "final_answer": ""
      }
    },
    {
      "slide_type": "practice",
      "title": "Bài tập tự luyện",
      "content": []
    },
    {
      "slide_type": "summary",
      "title": "Tổng kết – ghi nhớ",
      "content": []
    }
  ]
}

Rules:
- Output ONLY valid JSON
- No markdown, no emojis
- Physics must be correct and exam-oriented
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.3,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const content = completion.choices[0].message.content;

    return NextResponse.json(JSON.parse(content as string));
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to generate lesson", details: error.message },
      { status: 500 }
    );
  }
}
