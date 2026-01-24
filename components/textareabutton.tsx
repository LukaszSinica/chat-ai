import { ChatMessage } from "@/app/page";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";


interface TextareaButtonProps {
  setChat: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  generateResponse: (prompt: string) => void;
}

export function TextareaButton({ setChat, generateResponse }: TextareaButtonProps) {
  
  const [prompt, setPrompt] = useState("");
  function sendPrompt() {
    if (!prompt.trim()) return;

    setChat(prev => [
      ...prev,
      { from: "user", text: prompt }
    ]);

    generateResponse(prompt);
    
    setPrompt("");
    
  }

  return (
    <div className="grid w-full gap-2">
      <Textarea 
        placeholder="Type your message here." 
        className="resize-none"         
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}/>
      <Button onClick={sendPrompt}>Send message</Button>
    </div>
  )
}