import { ChatMessage } from "@/app/page"
import { ScrollArea } from "./ui/scroll-area";
import Text from "./ui/text";
interface ChatProps {
    chat: ChatMessage[];
    isLoading: boolean;
}
export default function Chat({ chat, isLoading }: ChatProps) {

  return (
    <ScrollArea className='flex h-116 border-2 border-gray w-full flex-col p-4 overflow-hidden'>
      <main className="h-full w-full flex flex-col overflow-hidden">
          {chat.map(({ from, text }, key) => (
            <div
              key={key}
              className={`flex flex-col w-full py-1 overflow-hidden ${from === "ai" ? "text-left" : "justify-end text-right"}`}
            >
              <Text key={key} text={text} from={from} isLoading={isLoading && key === chat.length - 1}/>
              </div>
          ))}
      </main>
    </ScrollArea >
  )
}
