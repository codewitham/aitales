import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function GET() {
    try {
        const stories = await prisma.story.findMany()
        return NextResponse.json({ stories }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { prompt, story, userId } = await req.json();
        const newStory = await prisma.story.create({
            data: {
                prompt,
                story,
                userId
            },
        });
        return NextResponse.json({ message: "new story added", story: newStory }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}



