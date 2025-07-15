import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { text, voice = 'ko-KR-Wavenet-A', speakingRate = 1.0, pitch = 0, volumeGainDb = 0 } = await request.json()

    const apiKey = process.env.GOOGLE_TTS_API_KEY
    if (!apiKey) {
      throw new Error('Google TTS API 키가 설정되지 않았습니다.')
    }
    
    const apiUrl = 'https://texttospeech.googleapis.com/v1/text:synthesize'

    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: { text },
        voice: {
          languageCode: 'ko-KR',
          name: voice
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate,
          pitch,
          volumeGainDb
        }
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Google TTS API 오류:', response.status, errorData)
      throw new Error(`Google TTS API 오류: ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json({
      success: true,
      audioContent: data.audioContent
    })

  } catch (error) {
    console.error('Google TTS API Error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Google TTS 변환 실패',
        details: error instanceof Error ? error.message : '알 수 없는 오류'
      }, 
      { status: 500 }
    )
  }
}