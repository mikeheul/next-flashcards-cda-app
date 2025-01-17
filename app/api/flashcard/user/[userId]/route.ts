import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
    params: Promise<{ userId: string }>
}

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const { userId } = await params;
        console.log("userid", userId)
        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" }, 
                { status: 400 }
            );
        }
        const cards = await db.card.findMany({  
            where : {
                id_user: userId
            },
            orderBy: {
                createdAt: 'desc'   
            }
        });
        // return NextResponse.json(cards);
        return NextResponse.json({
            data: cards, //null si erreur
            message: "Succesfully send the cards", // msg d'erreur si erreur
            success: true, // false si erreur 
        })
        
    } catch (error) {
        console.log("[MY_CARDS]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}
