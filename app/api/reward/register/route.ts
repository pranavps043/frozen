import { post } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { full_name, email_or_phone, password, password_confirmation } = body;
        const { data, error } = await post<any, any>(
            `${process.env.NEXT_PUBLIC_API_URL}/api/register-member`,
            {
                full_name,
                email_or_phone,
                password,
                password_confirmation
            }
        );
        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
