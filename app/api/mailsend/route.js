import { NextResponse } from "next/server";
import { sendMail } from "../../lib/mailsend/actions";

export async function POST(request) {
  const { email, message } = await request.json();
  if (!email) {
    return NextResponse.json({
      message: "No email provided!",
    });
  }
  try {
    await sendMail({ email, message });
    return NextResponse.json({
      type: "success",
      message:
        "Thanks for sending the email, I will reply to you as fast as possible 😀",
    });
  } catch (error) {
    console.error("Error sending message!", error);
  }
}
