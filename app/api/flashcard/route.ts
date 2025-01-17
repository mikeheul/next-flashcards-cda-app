import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cards = await db.card.findMany({
            orderBy: {
                createdAt: 'desc'
            },
        })

        return NextResponse.json(cards)

    } catch (error) {
        console.log("[CARDS]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}