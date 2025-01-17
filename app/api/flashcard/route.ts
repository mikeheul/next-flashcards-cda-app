import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cards = await db.card.findMany({
            orderBy: {
                createdAt: 'desc'
            },
        })

        // return NextResponse.json(cards)
        return NextResponse.json({
            data: cards, //null si erreur
            message: "Succesfully send the cards", // msg d'erreur si erreur
            success: true, // false si erreur 
        })

    } catch (error) {
        console.log("[CARDS]", error)
        return NextResponse.json({ error: "Internal Error2" }, { status: 500 })
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
