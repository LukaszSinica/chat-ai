import { parseTextWithSnippets } from '@/lib/utils';

type TextProps = {
    text: string;
}

export default function Text({text}: TextProps) {

    const parts = parseTextWithSnippets(text);
    return (
        <>
            {parts.map(part =>
                part.type === "snippet" ? (
                    <pre className="bg-gray-700 p-4 border-2 rounded-lg text-background" key={part.index}>
                        {part.content}
                    </pre>
                ) : (
                    <p key={part.index}>{part.content}</p>
                )
            )}
        </>
    )
}
