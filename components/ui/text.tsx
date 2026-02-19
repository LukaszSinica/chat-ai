import { cn, parseTextWithSnippets } from '@/lib/utils';
import TypingIndicator from './typingIndicator';

type TextProps = {
    text: string;
    isLoading: boolean;
}

export default function Text({text, isLoading}: TextProps) {

    const parts = parseTextWithSnippets(text);


    return (
        <>
            {parts.map(part => 
                part.type === "snippet" ? (
                    <pre className={"bg-gray-700 p-4 border-2 rounded-lg text-background"} key={part.index}>
                        {part.content}
                    </pre>
                ) : (
                    isLoading ? <TypingIndicator key={`loader-${part.index}`}/>:
                    <p key={part.index}>{part.content}</p>
                )
            )}
        </>
    )
}
