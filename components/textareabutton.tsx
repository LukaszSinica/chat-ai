import { ChatMessage } from "@/app/page";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";
import { Field } from "./ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const DEFAULT_MODEL = "qwen3-coder:30b"

interface TextareaButtonProps {
  setChat: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  generateResponse: (prompt: string, model: string) => void;
}

type ModelType = { name: string }

const models: ModelType[] = []

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
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendPrompt();
          }
        }}/>
        <Field className="w-1/4">
          <Select defaultValue={DEFAULT_MODEL} onValueChange={(selectedModel) => setModel(selectedModel)}>
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={DEFAULT_MODEL}>qwen3-coder:30b</SelectItem>
              {models.length > 0 ? models.map(({ name }, key) => (
                <SelectItem key={key} value={name}>{name}</SelectItem>
              )): 
              <SelectItem value={"No available model"} disabled>No available model</SelectItem>
              }
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Button onClick={sendPrompt}>Send message</Button>
    </div>
  )
}