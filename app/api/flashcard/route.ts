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


