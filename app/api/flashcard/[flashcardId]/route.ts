import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
    params: Promise<{ flashcardId: string }>
}

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const { flashcardId } = await params;
        
        if (!flashcardId) {
            return NextResponse.json(
                { error: "Flashcard ID is required" }, 
                { status: 400 }
            );
        }

        const card = await db.card.findUnique({  
            where : {
                id: flashcardId
            },
        });

        if (!card) {
            return NextResponse.json(
                { error: "Card not found" },
                { status: 404 } 
            );
        }

        return NextResponse.json(card);
        
    } catch (error) {
        console.log("[CARD]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}