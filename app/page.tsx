import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
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
              <li><a href="#daily-news">Daily News</a></li>
              <li className="has-dropdown">
                <a href="#autonomous">자율주행 & 뉴모빌리티</a>
              </li>
              <li className="has-dropdown">
                <a href="#connectivity">커넥티비티 & 보안</a>
              </li>
              <li className="has-dropdown">
                <a href="#electrification">전동화</a>
              </li>
              <li><a href="#hmi">HMI</a></li>
              <li><a href="#design">설계 & 테스트</a></li>
              <li><a href="#materials">부품 & 소재</a></li>
              <li><a href="#column">칼럼</a></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <div className="content-wrapper">
            {/* Main Articles Section */}
            <section className="main-section">
              {/* Featured Slider */}
              <div className="featured-slider">
                <div className="slider-container">
                  <article className="featured-article active">
                    <Link href="/article/1">
                      <img src="https://picsum.photos/1200/600?random=1" alt="현대차그룹, 차세대 전기차 플랫폼 공개" loading="lazy" />
                      <div className="article-content">
                        <span className="category">전동화</span>
                        <h2>현대차그룹, 차세대 전기차 플랫폼 &apos;E-GMP 2.0&apos; 공개</h2>
                        <p>800V 초고속 충전과 향상된 주행거리를 지원하는 차세대 플랫폼 발표</p>
                        <time dateTime="2025-07-13">2025.07.13</time>
                      </div>
                    </Link>
                  </article>
                </div>
              </div>

              {/* Latest News Grid */}
              <section className="news-grid">
                <h2 className="section-title">최신 뉴스</h2>
                <div className="grid-container">
                  <article className="news-item">
                    <Link href="/article/2">
                      <div className="news-image">
                        <img src="https://picsum.photos/400/300?random=5" alt="테슬라 FSD v12 국내 출시" loading="lazy" />
                      </div>
                      <div className="news-content">
                        <span className="category">자율주행</span>
                        <h3>테슬라 FSD v12, 국내 규제 승인 획득</h3>
                        <p>완전자율주행 베타 버전이 국내에서도 사용 가능해져...</p>
                        <time dateTime="2025-07-13">2025.07.13</time>
                      </div>
                    </Link>
                  </article>
                  
                  <article className="news-item">
                    <Link href="/article/3">
                      <div className="news-image">
                        <img src="https://picsum.photos/400/300?random=6" alt="LG에너지솔루션 신규 배터리" loading="lazy" />
                      </div>
                      <div className="news-content">
                        <span className="category">배터리</span>
                        <h3>LG에너지솔루션, NCM 배터리 에너지밀도 20% 향상</h3>
                        <p>차세대 NCM 배터리로 1회 충전 주행거리 1000km 돌파...</p>
                        <time dateTime="2025-07-12">2025.07.12</time>
                      </div>
                    </Link>
                  </article>
                  
                  <article className="news-item">
                    <Link href="/article/4">
                      <div className="news-image">
                        <img src="https://picsum.photos/400/300?random=7" alt="현대모비스 신기술" loading="lazy" />
                      </div>
                      <div className="news-content">
                        <span className="category">HMI</span>
                        <h3>현대모비스, 홀로그램 HUD 기술 세계 최초 양산</h3>
                        <p>증강현실 기반 3D 홀로그램 헤드업 디스플레이 개발...</p>
                        <time dateTime="2025-07-12">2025.07.12</time>
                      </div>
                    </Link>
                  </article>

                  {/* TTS Demo Link */}
                  <article className="news-item">
                    <Link href="/tts">
                      <div className="news-image">
                        <img src="https://picsum.photos/400/300?random=20" alt="TTS 기능 체험" loading="lazy" />
                      </div>
                      <div className="news-content">
                        <span className="category">기술 체험</span>
                        <h3>기사 듣기 기능 체험해보기</h3>
                        <p>텍스트를 음성으로 변환하는 TTS 기능을 직접 체험해보세요...</p>
                        <time dateTime="2025-07-15">2025.07.15</time>
                      </div>
                    </Link>
                  </article>
                </div>
              </section>

              {/* Middle Banner Ad */}
              <div className="ad-banner ad-middle">
                <a href="https://www.ansys.com/ko-kr" target="_blank" rel="noopener noreferrer">
                  <img src="https://ssl.logger.co.kr/tracker_ad.tsp?u=37061&mode=I&adCode=82803" alt="Ansys 자율주행브리티HUD 설계 웨비나" style={{width: '100%', maxWidth: '300px', height: 'auto'}} />
                </a>
              </div>

              {/* SDV Special Section */}
              <section className="sdv-section">
                <h2 className="section-title">SDV(Software Defined Vehicle) 특집</h2>
                <div className="sdv-grid">
                  <article className="sdv-main">
                    <Link href="/article/600">
                      <img src="https://picsum.photos/800/400?random=40" alt="SDV 심층 분석" loading="lazy" />
                      <div className="sdv-content">
                        <span className="category">SDV 심층분석</span>
                        <h3>SDV 전환을 위한 완성차 업체들의 전략과 도전</h3>
                        <p>현대차, 폴크스바겐, 토요타, GM 등 글로벌 자동차 제조사들의 SDV 전환 전략을 심층 분석합니다.</p>
                        <time dateTime="2025-07-13">2025.07.13</time>
                      </div>
                    </Link>
                  </article>
                </div>
              </section>
            </section>

            {/* Sidebar */}
            <aside className="sidebar">
              {/* Popular Articles */}
              <div className="popular-articles">
                <h3>인기 기사</h3>
                <ol className="popular-list">
                  <li><a href="/article/1">현대차그룹, 차세대 전기차 플랫폼 'E-GMP 2.0' 공개</a></li>
                  <li><a href="/article/2">테슬라 FSD v12, 국내 규제 승인 획득</a></li>
                  <li><a href="/article/3">LG에너지솔루션, NCM 배터리 에너지밀도 20% 향상</a></li>
                  <li><a href="/article/4">현대모비스, 홀로그램 HUD 기술 세계 최초 양산</a></li>
                </ol>
              </div>

              {/* Sidebar Banner Ad */}
              <div className="ad-banner ad-sidebar">
                <a href="https://www.digikey.kr/" target="_blank" rel="noopener noreferrer">
                  <img src="https://s0.2mdn.net/simgad/8235331197683898298" alt="DigiKey Amphenol IP68/69K 등급 커넥터" style={{width: '100%', maxWidth: '300px', height: 'auto'}} />
                </a>
              </div>

              {/* Newsletter */}
              <div className="newsletter">
                <h3>뉴스레터 구독</h3>
                <p>매주 최신 자동차 전자 기술 동향을 받아보세요.</p>
                <form className="newsletter-form">
                  <input type="email" placeholder="이메일 주소" />
                  <button type="submit">구독하기</button>
                </form>
              </div>

              {/* Tall Sidebar Banner Ad */}
              <div className="ad-banner ad-sidebar-tall">
                <a href="https://www.inosimulation.com" target="_blank" rel="noopener noreferrer" style={{display: 'block', background: '#1a1a2e', color: 'white', padding: '30px 20px', textAlign: 'center', borderRadius: '8px', textDecoration: 'none'}}>
                  <div style={{marginBottom: '20px'}}>
                    <div style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '10px'}}>INOSIMULATION</div>
                    <div style={{fontSize: '14px', opacity: '0.8'}}>ADAS/AD 검증 솔루션</div>
                  </div>
                  <div style={{background: '#00f5ff', color: '#1a1a2e', padding: '15px', borderRadius: '4px', margin: '20px 0'}}>
                    <div style={{fontSize: '16px', fontWeight: 'bold'}}>차량 시뮬레이션</div>
                    <div style={{fontSize: '12px', marginTop: '5px'}}>실제 환경 재현</div>
                  </div>
                  <div style={{fontSize: '12px', opacity: '0.8'}}>
                    자율주행 시나리오 검증부터<br />
                    센서 융합 테스트까지
                  </div>
                  <div style={{marginTop: '20px', fontSize: '14px', fontWeight: 'bold', color: '#00f5ff'}}>
                    → 자세히 보기
                  </div>
                </a>
              </div>
            </aside>
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
  );
}
