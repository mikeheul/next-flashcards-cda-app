import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const learnedCard = await db.learned.findMany({
            orderBy: {
                createdAt: 'desc'
            },
        })

        // return NextResponse.json(cards)
        return NextResponse.json({
            data: learnedCard, //null si erreur
            message: "Succesfully send the learned cards", // msg d'erreur si erreur
            success: true, // false si erreur 
        })

    } catch (error) {
        console.log("[LEARNED]", error)
        return NextResponse.json({ error: "Internal Error2" }, { status: 500 })
    }
}