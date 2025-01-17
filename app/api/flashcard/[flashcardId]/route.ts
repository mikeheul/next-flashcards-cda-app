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
        // return NextResponse.json(card);
        return NextResponse.json({
            data: card, //null si erreur
            message: "Succesfully send the card", // msg d'erreur si erreur
            success: true, // false si erreur 
        })
        
    } catch (error) {
        console.log("[CARD]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}

export async function POST(request: Request) {

    try {
        const body = await request.json();
        const { question, answer, userId} = body;

        if (!question || !answer || !userId) {
            return NextResponse.json(
                { error: "Missing required fields" }, 
                { status: 400 }
            );
        }
        const card = await db.card.create({
            data: {
                question,
                answer,
                id_user: userId,
            }
        });
        // return NextResponse.json(card, { status: 201 });
        return NextResponse.json({
            data: card, 
            message: " Card succesfully added", 
            success: true, 
        })

    } catch (error) {
        console.log("[CREATE_CARD]", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }

}