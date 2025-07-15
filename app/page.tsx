export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-sans">
        <h1 className="text-4xl font-bold mb-8 text-center">
          AME 프로젝트에 오신 것을 환영합니다!
        </h1>
        <p className="text-xl text-center mb-8 text-gray-600">
          이 프로젝트는 Vercel에 배포된 Next.js 애플리케이션입니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="border rounded-lg p-6 hover:border-blue-500 transition-colors hover:shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">빠른 시작</h2>
            <p className="text-gray-600">Next.js와 React로 빠르게 개발을 시작하세요.</p>
          </div>
          <div className="border rounded-lg p-6 hover:border-blue-500 transition-colors hover:shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">자동 배포</h2>
            <p className="text-gray-600">GitHub에 push하면 Vercel이 자동으로 배포합니다.</p>
          </div>
          <div className="border rounded-lg p-6 hover:border-blue-500 transition-colors hover:shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">무료 호스팅</h2>
            <p className="text-gray-600">Vercel의 무료 플랜으로 충분히 시작할 수 있습니다.</p>
          </div>
        </div>
        
        <div className="text-center mt-12 space-x-4">
          <a 
            href="/tts"
            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            TTS 기능 체험하기
          </a>
          <a 
            href="https://vercel.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Vercel로 배포하기
          </a>
        </div>
      </div>
    </main>
  );
}
