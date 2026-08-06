import { NextResponse } from 'next/server';
import { askGeminiSensoryAI } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    if (!prompt) {
      return NextResponse.json({ success: false, error: 'Prompt is required' }, { status: 400 });
    }

    const aiResult = await askGeminiSensoryAI(prompt);
    return NextResponse.json(aiResult);
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      text: 'Gemini AI Assistant is ready. Recommended: Try Miyabi Omakase or Fornace 800° Neapolitan Pizza.',
    });
  }
}
