import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const user = await currentUser();

    const userEmail = user?.emailAddresses[0].emailAddress;
    if (!userEmail) {
        return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    const users = await db.select().from(usersTable).where(
        eq(usersTable.email, userEmail)
    );
    if (users.length === 0) {
        const data = {
            name: user.fullName ?? 'User',
            email: userEmail
        }
        const result = await db.insert(usersTable).values(data).returning();
        return NextResponse.json({
            user: result[0]
        }, { status: 200 });
    }

    return NextResponse.json({
        user: users[0]
    }, { status: 200 });
}