type AIContent = {
    englishHistory: string;
    englishExample: string;
    chineseExample: string;
};

export async function getChengyuAIContent(
    word: string,
    pinyin: string,
    explanation: string,
): Promise<AIContent | null> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.warn('No GEMINI_API_KEY found, skipping AI content');
        return null;
    }

    const prompt = `You are a scholar of classical Chinese literature.

For the Chinese idiom "${word}" (pinyin: ${pinyin}), which means: "${explanation}"

Respond ONLY with this JSON, no markdown, no backticks, no extra text:
{"englishHistory":"2-3 sentences about its historical origin and cultural significance","englishExample":"one natural English sentence showing how this concept is used","chineseExample":"one natural modern Chinese sentence using this idiom"}`;

    const MAX_RETRIES = 3;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 1024,
                            responseMimeType: 'application/json',
                        },
                    }),
                },
            );

            if (!response.ok) {
                const err = await response.text();
                console.error(`Gemini attempt ${attempt} failed:`, response.status, err);
                if (attempt < MAX_RETRIES) {
                    await new Promise(r => setTimeout(r, 1000 * attempt));
                    continue;
                }
                return null;
            }

            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!text) {
                console.error('No text in Gemini response', JSON.stringify(data));
                return null;
            }

            const cleaned = text.replace(/```json|```/g, '').trim();
            return JSON.parse(cleaned) as AIContent;
        } catch (err) {
            console.error(`AI attempt ${attempt} failed:`, err);
            if (attempt < MAX_RETRIES) {
                await new Promise(r => setTimeout(r, 1000 * attempt));
                continue;
            }
            return null;
        }
    }

    return null;
}