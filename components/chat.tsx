import { ChatMessage } from "@/app/page"
import { ScrollArea } from "./ui/scroll-area";

interface ChatProps {
    chat: ChatMessage[];
}
export default function Chat({ chat }: ChatProps) {
  return (
    <ScrollArea  className='flex h-96 border-2 border-gray w-full flex-col px-4 py-4 r'>
        {chat.map(({ from, text }, key) => (
            <div
            key={key}
            className={`w-full ${from === "ai" ? "text-left" : "text-right"}`}
            >
            {text}
            </div>
        ))}
    </ScrollArea >
  )
}
