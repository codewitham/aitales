import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req) {
    try {
        const { prompt } = await req.json();

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `generate story based on the prompt: ${prompt}` }]
        });


        const generatedStory = response.data.choices[0].message.content;

        return NextResponse.json({ story: generatedStory, message: prompt }, { status: 200 });
    } catch (error) {
        console.error('Error generating story:', error.message);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
