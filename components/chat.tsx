import { ChatMessage } from "@/app/page"
import { ScrollArea } from "./ui/scroll-area";
import Text from "./ui/text";
interface ChatProps {
    chat: ChatMessage[];
}
export default function Chat({ chat }: ChatProps) {

  return (
    <ScrollArea className='flex h-96 border-2 border-gray w-full flex-col p-4'>
      <main className="h-full w-full flex flex-col">
        {chat.map(({ from, text }, key) => (
            <div
            key={key}
            className={`w-full ${from === "ai" ? "text-left" : "text-right"}`}
            >
            <Text text={text}/>
            </div>
        ))}
      </main>
    </ScrollArea >
  )
}
