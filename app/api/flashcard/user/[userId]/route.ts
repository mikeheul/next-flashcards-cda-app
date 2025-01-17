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
        const cards = await db.card.findMany({  
            where : {
                id_user: userId
            },
            orderBy: {
                createdAt: 'desc'   
            }
        });
        return NextResponse.json(cards);
        
    } catch (error) {
        console.log("[MY_CARDS]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}


