import LandingHeader from "../components/landingHeader";
import GitHub from "../assets/github.svg";
import landingBg from "../assets/landing-bg.png";

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2" style={{
      backgroundImage: `url(${landingBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <LandingHeader />
        <h1 className="text-6xl font-bold">
          Welcome to <span className='text-orange-600'>Scrapify!</span>
        </h1>

        <p className="mt-3 text-2xl">
          Scraping the web one page at a time
        </p>

        <div className="mt-6">
          <a href="/dashboard">
            <p className="rounded-md bg-orange-600 py-2 px-4 text-white hover:bg-orange-700 transition duration-300">
              Start Scraping
            </p>
          </a>
        </div>
      </main>

      <footer className="flex h-16 w-full items-center justify-center">
        <a
          href="https://github.com/aadium/scrapify-vite"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <img src={GitHub} alt="GitHub" className="h-6 hover:text-orange-500" />
        </a>
      </footer>
    </div>
  );
}
