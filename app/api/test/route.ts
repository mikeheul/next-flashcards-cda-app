import { NextResponse } from 'next/server';

export async function GET() {
    try {
        return NextResponse.json("Test API OK");

    } catch (error) {
        console.log("[TEST_API]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}