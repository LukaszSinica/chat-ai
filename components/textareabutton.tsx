import { ChatMessage } from "@/app/page";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";
import { Field, FieldDescription, FieldLabel } from "./ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const DEFAULT_MODEL = "qwen3-coder:30b"

interface TextareaButtonProps {
  setChat: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  generateResponse: (prompt: string, model: string) => void;
}

export function TextareaButton({ setChat, generateResponse }: TextareaButtonProps) {
  
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState<string>(DEFAULT_MODEL)
  function sendPrompt() {
    if (!prompt.trim()) return;

    setChat(prev => [
      ...prev,
      { from: "user", text: prompt }
    ]);

    generateResponse(prompt, model);
    
    setPrompt("");
    
  }

  return (
    <div className="grid w-full gap-2">
      <div className="flex h-full">
      <Textarea 
        placeholder="Type your message here." 
        className="resize-none w-3/4"         
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}/>
        <Field className="w-1/4">
          <Select defaultValue={DEFAULT_MODEL} onValueChange={(selectedModel) => setModel(selectedModel)}>
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={DEFAULT_MODEL}>qwen3-coder:30b</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Button onClick={sendPrompt}>Send message</Button>
    </div>
  )
}