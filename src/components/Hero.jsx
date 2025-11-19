import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/iO74mq3KeYTXVmpB/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[70vh] px-6">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" />
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_0_25px_rgba(34,197,94,0.4)]">
          Discover Your WINX Fairy
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-emerald-100/90">
          A playful, mysterious journey through moonlit tasks, tiny games, and a shimmering quiz.
        </p>
      </div>
    </section>
  )
}
