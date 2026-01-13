"use client";

import { useState } from "react";

/* ================== CHAPTER DATA ================== */
const chapters = [
  "Chương 1 – Dao động cơ",
  "Chương 2 – Sóng cơ",
  "Chương 3 – Dòng điện xoay chiều",
  "Chương 4 – Sóng điện từ",
  "Chương 5 – Lượng tử ánh sáng",
  "Chương 6 – Hạt nhân nguyên tử",
];

export default function Home() {
  const [chapter, setChapter] = useState("");
  const [lesson, setLesson] = useState("");
  const [copied, setCopied] = useState(false);

  const prompt = `
You are Mr. Cảnh’s AI teaching assistant, specializing in Physics Grade 12.

TEXTBOOK:
Vật lí 12 – Kết nối tri thức với cuộc sống

${chapter}
${lesson}

Yêu cầu nội dung:

1. KIẾN THỨC LÝ THUYẾT
- Trình bày khái niệm, định luật, hiện tượng vật lí
- Công thức chuẩn, đúng chương trình THPT
- Giải thích ý nghĩa các đại lượng

2. KIẾN THỨC TRỌNG TÂM
- Tóm tắt gạch đầu dòng
- Công thức cần nhớ, hay ra đề

3. BÀI TẬP VẬN DỤNG
- Ít nhất 2 bài
- Đúng dạng kiểm tra – thi THPT Quốc gia

4. GỢI Ý CÁCH GIẢI
- Phân tích hiện tượng
- Xác định dữ kiện
- Chọn công thức
- Trình bày từng bước rõ ràng
- Kết luận đúng đơn vị

Yêu cầu:
- Chính xác, không lan man
- Phù hợp dạy học, ôn thi
- Có thể trình bày trên Canva Slides
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: 24,
        fontFamily: "system-ui",
      }}
    >
      <h1>📘 Physics 12 Prompt Generator</h1>
      <p>Vật lí 12 – Kết nối tri thức với cuộc sống</p>

      <div style={{ marginTop: 16 }}>
        <label>Chọn chương:</label>
        <select
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        >
          <option value="">-- Chọn chương --</option>
          {chapters.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: 16 }}>
        <label>Nhập bài:</label>
        <input
          type="text"
          placeholder="Ví dụ: Bài 1 – Dao động điều hòa"
          value={lesson}
          onChange={(e) => setLesson(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        />
      </div>

      <button
        onClick={handleCopy}
        style={{
          marginTop: 20,
          padding: "10px 16px",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        {copied ? "✔ PROMPT COPIED – DÁN VÀO CANVA" : "GENERATE & COPY PROMPT"}
      </button>

      <pre
        style={{
          marginTop: 24,
          padding: 16,
          background: "#f5f5f5",
          whiteSpace: "pre-wrap",
        }}
      >
        {prompt}
      </pre>
    </main>
  );
}
