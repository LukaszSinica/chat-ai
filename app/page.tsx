"use client"
import Chat from "@/components/chat";
import { TextareaButton } from "@/components/textareabutton";
import { useState } from "react";

const chatMessages: ChatMessage[] = [
  { from: "ai", text: "hello" },
  { from: "user", text: "hi" },
];


export interface ChatMessage {
  from: "ai" | "user";
  text: string;
}


export default function Home() {

  const [chat, setChat] = useState<ChatMessage[]>(chatMessages);

  async function generateResponse(prompt: string, model: string) {
    setChat(prev => [
      ...prev,
      { from: "ai", text: "..." }
    ]);
  
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          prompt,
        }),
      });
  
      const data = await res.json();
      
      if(!data.error) {
        setChat(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            from: "ai",
            text: data.response,
          };
          return updated;
        });
      }
      
      setChat(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          from: "ai",
          text: data.error,
        };
        return updated;
      });
  
    } catch (error) {

      setChat(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          from: "ai",
          text: "⚠️ Something went wrong.",
        };
        return updated;
      });
    }
  }


  return (
    <div className="flex min-h-screen items-center justify-center  font-sans ">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 sm:items-start">
          <Chat chat={chat}/>
          <TextareaButton setChat={setChat} generateResponse={generateResponse}/>
      </main>
    </div>
  );
}
