import { cn, parseTextWithSnippets } from '@/lib/utils';
import TypingIndicator from './typingIndicator';

type TextProps = {
    text: string;
    isLoading: boolean;
    from: string;
}

export default function Text({text, isLoading, from}: TextProps) {

    const parts = parseTextWithSnippets(text);


    return (
        <>
            {parts.map(part => 
                part.type === "snippet" ? (
                    <pre className={"bg-gray-700 p-4 border-2 rounded-lg text-background overflow-x-auto whitespace-pre-wrap break-all"} key={part.index}>
                            {part.content}
                    </pre>
                ) : (
                    isLoading ? <TypingIndicator key={`loader-${part.index}`}/>:
                    <div
                        key={part.index} 
                        className={from === "user" 
                            ? "self-end w-fit max-w-[85%] bg-gray-100 rounded-lg p-1 px-2 text-left break-words" 
                            : "break-words"
                    }>
                    {part.content}
                    </div>
                )
            )}
        </>
    )
}
