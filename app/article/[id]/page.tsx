'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface ArticlePageProps {
  params: Promise<{
    id: string
  }>
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [speechRate, setSpeechRate] = useState(1.0)

  const handleTTSPlay = () => {
    const articleContent = document.getElementById('articleContent')
    if (!articleContent) return

    const text = articleContent.innerText
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ko-KR'
    utterance.rate = speechRate
    utterance.pitch = 1.0

    utterance.onstart = () => {
      setIsPlaying(true)
      setIsPaused(false)
    }

    utterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
    }

    speechSynthesis.speak(utterance)
  }

  const handleTTSPause = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.pause()
      setIsPaused(true)
    }
  }

  const handleTTSResume = () => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume()
      setIsPaused(false)
    }
  }

  const handleTTSStop = () => {
    speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
  }

  return (
    <>
      {/* Header */}
      <header className="main-header">
        <div className="header-top">
          <div className="container">
            <div className="user-menu">
              <a href="/login">로그인</a>
              <a href="/register">회원가입</a>
              <a href="/subscribe">구독신청</a>
            </div>
          </div>
        </div>
        
        <div className="header-main">
          <div className="container">
            <div className="logo">
              <h1><Link href="/">AEM</Link></h1>
              <span className="tagline">Automotive Electronics Magazine</span>
            </div>
            
            {/* Top Banner Ad */}
            <div className="ad-banner ad-top">
              <a href="https://www.tdk-electronics.tdk.com/" target="_blank" rel="noopener noreferrer">
                <img src="https://s0.2mdn.net/simgad/14644383322725210250" alt="TDK B3291xH EMI 억제 커패시터" style={{width: '100%', maxWidth: '728px', height: 'auto'}} />
              </a>
            </div>
          </div>
        </div>
        
        <nav className="main-nav">
          <div className="container">
            <ul className="nav-menu">
              <li><Link href="/#daily-news">Daily News</Link></li>
              <li><a href="#autonomous">자율주행 & 뉴모빌리티</a></li>
              <li><a href="#connectivity">커넥티비티 & 보안</a></li>
              <li><a href="#electrification">전동화</a></li>
              <li><a href="#hmi">HMI</a></li>
              <li><a href="#design">설계 & 테스트</a></li>
              <li><a href="#materials">부품 & 소재</a></li>
              <li><a href="#column">칼럼</a></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Article Content */}
      <main className="article-page">
        <div className="container">
          <div className="content-wrapper">
            {/* Main Article */}
            <article className="article-content">
              {/* Breadcrumb */}
              <nav className="breadcrumb" aria-label="Breadcrumb">
                <ol>
                  <li><Link href="/">홈</Link></li>
                  <li><a href="#electrification">전동화</a></li>
                  <li>SDV 전환을 위한 완성차 업체들의 전략과 도전</li>
                </ol>
              </nav>

              {/* Article Header */}
              <header className="article-header">
                <div className="article-meta">
                  <span className="category">SDV 특집</span>
                  <time dateTime="2025-07-13">2025년 7월 13일</time>
                  <span className="author">AEM 편집부</span>
                </div>
                <h1>SDV 전환을 위한 완성차 업체들의 전략과 도전</h1>
                <p className="lead">소프트웨어 중심의 차량 개발로 패러다임 전환, E/E 아키텍처 혁신과 OTA 업데이트가 핵심</p>
                
                {/* TTS Controls */}
                <div className="tts-controls">
                  {!isPlaying ? (
                    <button onClick={handleTTSPlay} className="tts-btn play" aria-label="기사 읽기">
                      <span className="icon">🔊</span> 기사 듣기
                    </button>
                  ) : (
                    <>
                      {!isPaused ? (
                        <button onClick={handleTTSPause} className="tts-btn pause" aria-label="일시정지">
                          <span className="icon">⏸️</span> 일시정지
                        </button>
                      ) : (
                        <button onClick={handleTTSResume} className="tts-btn play" aria-label="계속 재생">
                          <span className="icon">▶️</span> 계속 재생
                        </button>
                      )}
                      <button onClick={handleTTSStop} className="tts-btn stop" aria-label="정지">
                        <span className="icon">⏹️</span> 정지
                      </button>
                    </>
                  )}
                  <div className="tts-settings">
                    <label htmlFor="ttsSpeed">속도:</label>
                    <select 
                      id="ttsSpeed" 
                      value={speechRate} 
                      onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                    >
                      <option value="0.8">0.8x</option>
                      <option value="1">1x</option>
                      <option value="1.2">1.2x</option>
                      <option value="1.5">1.5x</option>
                    </select>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              <figure className="article-image">
                <img src="https://picsum.photos/1200/600?random=20" alt="현대차 E-GMP 2.0 플랫폼" loading="lazy" />
                <figcaption>현대차그룹이 공개한 차세대 전기차 플랫폼 E-GMP 2.0</figcaption>
              </figure>

              {/* Article Body */}
              <div className="article-body" id="articleContent">
                <p>현대자동차그룹이 13일 차세대 전기차 전용 플랫폼 &apos;E-GMP 2.0&apos;을 공개하며 전기차 시장 공략을 가속화한다고 밝혔다. 이번에 발표된 E-GMP 2.0은 기존 플랫폼 대비 충전 속도, 주행거리, 안전성 등 모든 면에서 대폭 개선된 것이 특징이다.</p>

                <h2>800V 초고속 충전 시스템</h2>
                <p>E-GMP 2.0의 가장 큰 특징은 800V 초고속 충전 시스템이다. 350kW급 초고속 충전기 사용 시 10분 충전으로 300km 이상 주행이 가능하며, 10%에서 80%까지 충전하는 데 단 15분이면 충분하다. 이는 기존 400V 시스템 대비 충전 시간을 절반 이상 단축한 수치다.</p>

                <p>현대차그룹 관계자는 &quot;800V 시스템은 단순히 충전 속도만 빠른 것이 아니라 전체적인 에너지 효율성도 크게 향상됐다&quot;며 &quot;같은 용량의 배터리로도 주행거리를 20% 이상 늘릴 수 있게 됐다&quot;고 설명했다.</p>

                <h2>차세대 배터리 기술 적용</h2>
                <p>E-GMP 2.0에는 NCM9 배터리와 실리콘 음극재를 적용한 차세대 배터리가 탑재된다. 에너지 밀도가 기존 대비 30% 향상되어 같은 공간에 더 많은 에너지를 저장할 수 있게 됐다. 또한 배터리 관리 시스템(BMS)도 AI 기반으로 업그레이드되어 배터리 수명과 안전성이 크게 개선됐다.</p>

                <h2>향상된 주행 성능</h2>
                <p>새로운 플랫폼은 전륜과 후륜에 각각 모터를 배치한 듀얼 모터 시스템을 기본으로 한다. 최대 출력 600마력, 제로백 3초대의 강력한 성능을 발휘하면서도 1회 충전 주행거리는 700km를 넘어선다. 또한 차체 하부에 배터리를 평평하게 배치해 무게중심을 낮추고 차체 강성을 50% 향상시켰다.</p>

                <h2>자율주행 레디 설계</h2>
                <p>E-GMP 2.0은 처음부터 레벨 4 자율주행을 염두에 두고 설계됐다. 차량 곳곳에 라이다, 카메라, 레이더 센서를 장착할 수 있는 마운팅 포인트가 준비되어 있으며, 고성능 컴퓨팅 유닛을 위한 전용 공간과 냉각 시스템도 마련됐다.</p>

                <h2>V2X 기능 강화</h2>
                <p>차량을 거대한 이동식 배터리로 활용할 수 있는 V2L(Vehicle to Load) 기능이 대폭 강화됐다. 최대 11kW의 전력을 외부로 공급할 수 있어 캠핑이나 야외 작업 시 다양한 전자기기를 사용할 수 있다. 또한 V2G(Vehicle to Grid) 기능도 지원해 전력망과 양방향 충전이 가능하다.</p>

                <h2>2025년부터 순차 적용</h2>
                <p>현대차그룹은 E-GMP 2.0을 2025년 하반기 출시 예정인 제네시스 신형 전기 세단을 시작으로 순차적으로 적용할 계획이다. 이어 2026년에는 현대차와 기아의 주력 전기차 모델에도 확대 적용될 예정이다.</p>

                <p>업계 전문가들은 &quot;E-GMP 2.0은 현재 전기차 시장의 주요 과제인 충전 시간과 주행거리 문제를 동시에 해결한 혁신적인 플랫폼&quot;이라며 &quot;테슬라를 비롯한 글로벌 경쟁사들에게 큰 위협이 될 것&quot;이라고 평가했다.</p>
              </div>

              {/* Article Footer */}
              <footer className="article-footer">
                <div className="tags">
                  <span>태그:</span>
                  <a href="#" className="tag">#현대차</a>
                  <a href="#" className="tag">#전기차</a>
                  <a href="#" className="tag">#E-GMP</a>
                  <a href="#" className="tag">#800V충전</a>
                  <a href="#" className="tag">#배터리</a>
                </div>
              </footer>

              {/* Related Articles */}
              <section className="related-articles">
                <h2>관련 기사</h2>
                <div className="related-grid">
                  <article className="related-item">
                    <Link href="/article/10">
                      <img src="https://picsum.photos/400/300?random=21" alt="기아 EV9 유럽 출시" loading="lazy" />
                      <h3>기아 EV9, 유럽 시장 본격 진출...현지 생산도 검토</h3>
                      <time dateTime="2025-07-12">2025.07.12</time>
                    </Link>
                  </article>
                  <article className="related-item">
                    <Link href="/article/11">
                      <img src="https://picsum.photos/400/300?random=22" alt="전기차 배터리 기술" loading="lazy" />
                      <h3>전고체 배터리 상용화 임박...게임체인저 될까?</h3>
                      <time dateTime="2025-07-11">2025.07.11</time>
                    </Link>
                  </article>
                  <article className="related-item">
                    <Link href="/tts">
                      <img src="https://picsum.photos/400/300?random=23" alt="TTS 기능" loading="lazy" />
                      <h3>TTS 기능으로 더 편리하게 기사 듣기</h3>
                      <time dateTime="2025-07-15">2025.07.15</time>
                    </Link>
                  </article>
                </div>
              </section>
            </article>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <h4>AEM - Automotive Electronics Magazine</h4>
              <p>주소: 서울특별시 강남구 테헤란로 123</p>
              <p>전화: 02-1234-5678 | 이메일: info@autoelectronics.co.kr</p>
              <p>사업자등록번호: 123-45-67890</p>
            </div>
          </div>
          <div className="copyright">
            <p>© 2025 AEM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}