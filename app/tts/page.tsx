'use client'

import { useState } from 'react'

export default function TTSPage() {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState('')

  const handleTTS = async () => {
    if (!text.trim()) return

    setIsLoading(true)
    try {
      // Web Speech API 사용 (브라우저 내장 TTS)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'ko-KR'
      utterance.rate = 1.0
      utterance.pitch = 1.0
      
      speechSynthesis.speak(utterance)
    } catch (error) {
      console.error('TTS Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleTTS = async () => {
    if (!text.trim()) return

    setIsLoading(true)
    try {
      // 프로덕션에서는 실제 Google TTS API 엔드포인트 사용
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voice: 'ko-KR-Wavenet-A',
          speakingRate: 1.0
        })
      })

      if (response.ok) {
        const audioBlob = await response.blob()
        const url = URL.createObjectURL(audioBlob)
        setAudioUrl(url)
      } else {
        throw new Error('TTS API 호출 실패')
      }
    } catch (error) {
      console.error('Google TTS Error:', error)
      // 실패 시 브라우저 TTS로 폴백
      handleTTS()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">텍스트 음성 변환 (TTS)</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
            변환할 텍스트를 입력하세요
          </label>
          <textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="여기에 텍스트를 입력하세요..."
          />
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={handleTTS}
            disabled={!text.trim() || isLoading}
            className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? '변환 중...' : '브라우저 TTS로 재생'}
          </button>
          
          <button
            onClick={handleGoogleTTS}
            disabled={!text.trim() || isLoading}
            className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? '변환 중...' : 'Google TTS로 변환'}
          </button>
        </div>

        {audioUrl && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">생성된 오디오</h3>
            <audio controls className="w-full" src={audioUrl}>
              브라우저가 오디오를 지원하지 않습니다.
            </audio>
          </div>
        )}

        <div className="mt-8 bg-blue-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">사용 방법</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li><strong>브라우저 TTS:</strong> 브라우저 내장 음성 합성 기능 사용 (무료, 즉시 재생)</li>
            <li><strong>Google TTS:</strong> Google Cloud TTS API 사용 (고품질, API 키 필요)</li>
            <li>프로덕션 환경에서는 Google Cloud TTS API 설정이 필요합니다</li>
          </ul>
        </div>
      </div>
    </div>
  )
}