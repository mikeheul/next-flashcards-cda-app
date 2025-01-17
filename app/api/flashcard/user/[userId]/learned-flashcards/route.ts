import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
    params: Promise<{ userId: string }>
}

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const { userId } = await params;

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" }, 
                { status: 400 }
            );
        }

        const learnedCards = await db.learned.findMany({
            where : {
                id_user: userId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {  
                card : true
            }
        })

        return NextResponse.json({
            data: learnedCards,
            message: "Succesfully send the learned cards",
            success: true, 
        })

    } catch (error) {
        console.log("[LEARNED CARDS]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}