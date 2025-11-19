import Hero from './components/Hero'
import QuestCards from './components/QuestCards'
import Quiz from './components/Quiz'

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <QuestCards />
      <Quiz />
      <footer className="py-10 text-center text-emerald-100/60">
        Crafted under a moonlit hush — follow the firefly and find your glow.
      </footer>
    </div>
  )
}

export default App
