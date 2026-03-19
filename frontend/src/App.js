import { useState } from "react";
import "./styles.css";

export default function App() {
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState("");

  const askAI = async () => {
    const res = await fetch("http://localhost:3000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    });

    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div className="container">
      <h1>💰 AI Debt Assistant</h1>

      <input
        placeholder="Ask something..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button onClick={askAI}>Ask AI</button>

      <div className="response">
        {reply}
      </div>
    </div>
  );
}
