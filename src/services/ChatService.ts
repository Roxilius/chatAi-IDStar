type Data = {
    question: string;
    answer: string;
};

type Response = {
    success: boolean;
    message: string;
    data: Data;
};

export const askAI = async ({ question }: { question: string }): Promise<Response> => {
    const res = await fetch('/ask', {
        method: 'POST',
        headers: {
        'x-api-key': import.meta.env.VITE_API_KEY,
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
    });
        
    if (!res.ok) {
        throw new Error('Failed to fetch AI response');
    }

    const result: Response = await res.json();
    return result;
}