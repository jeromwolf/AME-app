import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { text, voice = 'ko-KR-Wavenet-A', speakingRate = 1.0 } = await request.json()

    // 실제 프로덕션에서는 Google Cloud TTS API를 사용
    // 현재는 데모용으로 간단한 응답 반환
    if (process.env.GOOGLE_CLOUD_TTS_KEY) {
      // Google Cloud TTS 실제 구현
      const textToSpeech = require('@google-cloud/text-to-speech')
      const client = new textToSpeech.TextToSpeechClient({
        keyFilename: process.env.GOOGLE_CLOUD_TTS_KEY
      })

      const ttsRequest = {
        input: { text },
        voice: {
          languageCode: 'ko-KR',
          name: voice
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate
        }
      }

      const [response] = await client.synthesizeSpeech(ttsRequest)
      
      return new NextResponse(response.audioContent, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Length': response.audioContent.length.toString()
        }
      })
    } else {
      // 개발/데모 환경: 브라우저 TTS 사용 권장 메시지
      return NextResponse.json(
        { 
          error: 'Google TTS API 키가 설정되지 않았습니다. 브라우저 TTS를 사용하세요.',
          fallback: 'browser-tts'
        }, 
        { status: 501 }
      )
    }
  } catch (error) {
    console.error('TTS API Error:', error)
    return NextResponse.json(
      { error: 'TTS 변환 실패' }, 
      { status: 500 }
    )
  }
}