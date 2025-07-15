// TTS Configuration for High-Quality Voice
const TTSConfig = {
    // Google Cloud Text-to-Speech 설정
    google: {
        apiUrl: 'https://texttospeech.googleapis.com/v1/text:synthesize',
        voices: {
            wavenet: {
                'ko-KR-Wavenet-A': { name: 'Wavenet A', gender: 'FEMALE', description: '자연스러운 여성 음성' },
                'ko-KR-Wavenet-B': { name: 'Wavenet B', gender: 'FEMALE', description: '밝은 여성 음성' },
                'ko-KR-Wavenet-C': { name: 'Wavenet C', gender: 'MALE', description: '차분한 남성 음성' },
                'ko-KR-Wavenet-D': { name: 'Wavenet D', gender: 'MALE', description: '중후한 남성 음성' }
            }
        },
        defaultVoice: 'ko-KR-Wavenet-A',
        speakingRate: 1.0,
        pitch: 0,
        volumeGainDb: 0
    },

    common: {
        provider: 'google',
        format: 'mp3',
        sampleRate: 24000
    }
};

// TTS 서비스 클래스
class PremiumTTS {
    constructor(config = TTSConfig) {
        this.config = config;
        this.currentProvider = config.common.provider;
        this.audioQueue = [];
        this.isPlaying = false;
        this.isPaused = false;
        this.currentAudio = null;
    }

    // Google Cloud TTS 사용 (CORS 우회를 위한 프록시 사용)
    async convertWithGoogle(text, options) {
        const config = this.config.google;
        const voice = options.voice || config.defaultVoice;
        const voiceInfo = config.voices.wavenet[voice];

        try {
            // Next.js API route를 통해 Google TTS 호출
            const response = await fetch('/api/google-tts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: text,
                    voice: voice,
                    speakingRate: options.speakingRate || config.speakingRate,
                    pitch: options.pitch || config.pitch,
                    volumeGainDb: options.volumeGainDb || config.volumeGainDb
                })
            });

            if (!response.ok) {
                throw new Error('Google TTS API 오류');
            }

            const data = await response.json();
            
            if (data.audioContent) {
                // Base64를 Blob으로 변환
                const byteCharacters = atob(data.audioContent);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const audioBlob = new Blob([byteArray], { type: 'audio/mp3' });
                
                return URL.createObjectURL(audioBlob);
            }
            
            throw new Error('Google TTS 변환 실패');
        } catch (error) {
            console.error('Google TTS 변환 실패:', error);
            return null;
        }
    }

    // 텍스트를 음성으로 변환
    async convertTextToSpeech(text, options = {}) {
        return await this.convertWithGoogle(text, options);
    }

    // 기사 텍스트 전처리
    preprocessArticleText(articleElement) {
        const title = articleElement.querySelector('h1').textContent;
        const lead = articleElement.querySelector('.lead')?.textContent || '';
        const paragraphs = articleElement.querySelectorAll('#articleContent p, #articleContent h2, #articleContent h3');
        
        let fullText = title;
        if (lead) fullText += '. ' + lead;
        
        paragraphs.forEach(element => {
            const text = element.textContent.trim();
            if (text.length > 0) {
                fullText += '. ' + text;
            }
        });

        return fullText;
    }

    // 음성 재생
    async playArticle(articleElement, options = {}) {
        console.log('Google TTS로 기사 재생 시작...');
        const fullText = this.preprocessArticleText(articleElement);
        this.isPlaying = true;
        this.isPaused = false;

        const audioUrl = await this.convertTextToSpeech(fullText, options);

        if (audioUrl) {
            console.log('Google TTS 오디오 생성 완료');
            this.currentAudio = new Audio(audioUrl);
            
            this.currentAudio.onended = () => {
                this.isPlaying = false;
                console.log('재생 완료');
            };

            this.currentAudio.onerror = (e) => {
                console.error('오디오 재생 오류:', e);
                this.isPlaying = false;
            };

            await this.currentAudio.play();
        } else {
            console.error('Google TTS 오디오 생성 실패');
            throw new Error('TTS 변환에 실패했습니다.');
        }
    }

    // 재생 제어
    pause() {
        if (this.currentAudio && !this.currentAudio.paused) {
            this.currentAudio.pause();
            this.isPaused = true;
        }
    }

    resume() {
        if (this.currentAudio && this.currentAudio.paused) {
            this.currentAudio.play();
            this.isPaused = false;
        }
    }

    stop() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio = null;
        }
        this.isPlaying = false;
        this.isPaused = false;
    }
}

// 전역 변수로 export
if (typeof window !== 'undefined') {
    window.PremiumTTS = PremiumTTS;
    window.TTSConfig = TTSConfig;
}