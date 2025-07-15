import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { text, voice = 'ko-KR-Wavenet-A', speakingRate = 1.0 } = await request.json()

    // 개발/데모 환경: 브라우저 TTS 사용 권장 메시지
    return NextResponse.json(
      { 
        error: 'Google TTS API는 프로덕션 환경에서 사용 가능합니다. 브라우저 TTS를 사용하세요.',
        fallback: 'browser-tts',
        message: 'TTS 기능은 브라우저의 Web Speech API를 통해 제공됩니다.'
      }, 
      { status: 501 }
    )
  } catch (error) {
    console.error('TTS API Error:', error)
    return NextResponse.json(
      { error: 'TTS 변환 실패' }, 
      { status: 500 }
    )
  }
}