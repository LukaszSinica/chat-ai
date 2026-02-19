import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { prompt, model } = await request.json();
        
        // Validate input
        if (!prompt || !model) {
            return NextResponse.json(
                { error: 'Prompt and model are required' },
                { status: 400 }
            );
        }

        const res = await fetch('http://localhost:11434/api/generate', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                prompt: prompt,
                model: model,
                stream: false
            })
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error('Ollama error:', errorData);
            return NextResponse.json(
                { error: `Ollama error: ${errorData.error || res.statusText}` },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (error: {message: string} | any) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: error?.message },
            { status: 500 }
        );
    }
}