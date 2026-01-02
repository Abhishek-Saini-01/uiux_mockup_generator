import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        const user = await currentUser();

        const userEmail = user?.emailAddresses?.[0]?.emailAddress;
        if (!userEmail) {
            return NextResponse.json({ error: "Email not found" }, { status: 404 });
        }

        const data = {
            name: user.fullName ?? 'User',
            email: userEmail
        }

        const result = await db.insert(usersTable)
            .values(data)
            .onConflictDoNothing({ target: usersTable.email })
            .returning();

        if (result.length > 0) {
            return NextResponse.json({
                user: result[0]
            }, { status: 200 });
        }

        const existingUser = await db.select().from(usersTable).where(
            eq(usersTable.email, userEmail)
        ).limit(1);

        return NextResponse.json({
            user: existingUser[0]
        }, { status: 200 });

    } catch (error) {
        console.log("Error creating user", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}