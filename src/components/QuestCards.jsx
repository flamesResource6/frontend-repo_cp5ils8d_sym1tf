import { Sparkles, Puzzle, Music2 } from 'lucide-react'

const cards = [
  {
    icon: Sparkles,
    title: 'Moonlit Micro-Quests',
    desc: 'Tiny, whimsical tasks that awaken your aura. Whisper a wish, trace a star, catch a glimmer.',
  },
  {
    icon: Puzzle,
    title: 'Trickster Mini-Games',
    desc: 'Quick playful challenges: dodge a pixie, decode a riddle, balance a glowing orb.',
  },
  {
    icon: Music2,
    title: 'Harmonic Vibes',
    desc: 'Tap to the rhythm and watch fireflies gather — your flow reveals your fairy nature.',
  },
]

export default function QuestCards() {
  return (
    <section className="relative z-10 py-16 md:py-24 px-6 bg-gradient-to-b from-black/60 to-black/80">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="group rounded-2xl border border-emerald-400/20 bg-white/5 backdrop-blur-md p-6 shadow-xl hover:shadow-emerald-500/20 transition relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-400/5 to-emerald-300/10 opacity-0 group-hover:opacity-100 transition pointer-events-none" />
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
            <p className="mt-2 text-emerald-100/80 text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
