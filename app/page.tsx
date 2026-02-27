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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function generateResponse(prompt: string, model: string) {
    setChat(prev => [
      ...prev,
      { from: "ai", text: "..." }
    ]);
    setIsLoading(true);
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
      setIsLoading(false);

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
      else {
        setChat(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            from: "ai",
            text: data.error,
          };
          return updated;
        });
      }
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
      <main className="flex min-h-screen w-full max-w-5xl items-center py-32 px-16 sm:items-start">

          <div className="flex w-full h-full">
          <div className="flex flex-col w-2/6 border-2">
            <div className="text-center border-2 text-sm rounded border-gray-300 font-semibold p-2 hover:bg-gray-200 my-0.1">
              first room
            </div>
            <div className="text-center border-2 text-sm rounded border-gray-300 font-semibold p-2 hover:bg-gray-200 my-0.1">
              second room
            </div>
            <div className="text-center border-2 text-sm rounded border-gray-300 font-semibold p-2 hover:bg-gray-200 my-0.1">
              third room
            </div>
          </div>
          <div className="flex flex-col w-4/5">
            <Chat chat={chat} isLoading={isLoading}/>
            <TextareaButton setChat={setChat} generateResponse={generateResponse}/>
            </div>
          </div>

      </main>
    </div>
  );
}
