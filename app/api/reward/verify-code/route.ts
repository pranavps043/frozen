import { NextResponse } from "next/server";
import { post } from "@/lib/api";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

        const { data, error, status } = await post<any, any>(
            `${apiUrl}/api/verify-code`,
            { code: body.code }
        );

        if (error) {
            return NextResponse.json({ error }, { status: status || 400 });
        }

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
