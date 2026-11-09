import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { apiKey } = await req.json();

    if (!apiKey || typeof apiKey !== "string" || apiKey.trim() === "") {
      return NextResponse.json(
        { success: false, error: "API key cannot be empty." },
        { status: 400 }
      );
    }

    const cleanKey = apiKey.trim();

    // Direct Google Gemini API verification
    const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`;
    const response = await fetch(googleUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (!response.ok) {
      const errMsg =
        data?.error?.message ||
        `Google API returned HTTP ${response.status}: ${response.statusText}`;
      return NextResponse.json(
        { success: false, error: errMsg },
        { status: response.status }
      );
    }

    // Key is verified and active!
    return NextResponse.json({
      success: true,
      message: "Gemini API key verified successfully! AI features unlocked.",
      modelsCount: data?.models?.length || 0,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error:
          err.message ||
          "Unable to reach Google Gemini API. Please check your internet connection.",
      },
      { status: 500 }
    );
  }
}
