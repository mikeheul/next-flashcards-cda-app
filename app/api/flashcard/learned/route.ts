import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";


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

// Marquer une carte comme "learned"
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, cardId } = body;

        if (!userId || !cardId) {
            return NextResponse.json(
                { error: "User ID and Card ID are required" },
                { status: 400 }
            );
        }

        const existing = await db.learned.findUnique({
            //  alias généré par Prisma pour représenter une contrainte unique composée
            where: { id_user_id_card: { id_user: userId, id_card: cardId } },
        });

        if (existing) {
            return NextResponse.json(
                { error: "Card is already marked as learned" },
                { status: 400 }
            );
        }

        const learned = await db.learned.create({
            data: { id_user: userId, id_card: cardId },
        });

        return NextResponse.json({
            success: true,
            message: "Card marked as learned",
            data: learned,
        });
    } catch (error) {
        console.error("[MARK AS LEARNED]", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}

// Supprimer l'état "learned" d'une carte
export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, cardId } = body;

        if (!userId || !cardId) {
            return NextResponse.json(
                { error: "User ID and Card ID are required" },
                { status: 400 }
            );
        }

        await db.learned.delete({
            where: { id_user_id_card: { id_user: userId, id_card: cardId } },
        });

        return NextResponse.json({
            success: true,
            message: "Card marked as unlearned",
        });
    } catch (error) {
        console.error("[UNMARK AS LEARNED]", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}