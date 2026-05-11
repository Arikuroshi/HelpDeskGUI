import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

const DEV_USER_ID = process.env.DEV_USER_ID ?? "";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { content } = await req.json();

  if (!content?.trim()) {
    return NextResponse.json(
      { error: "Comment cannot be empty" },
      { status: 400 },
    );
  }

  if (!DEV_USER_ID) {
    return NextResponse.json({ error: "DEV_USER_ID not set" }, { status: 500 });
  }

  const comment = await prisma.comment.create({
    data: {
      content: content.trim(),
      ticketId: id,
      userId: DEV_USER_ID,
    },
    include: { user: true },
  });

  return NextResponse.json(comment, { status: 201 });
}
