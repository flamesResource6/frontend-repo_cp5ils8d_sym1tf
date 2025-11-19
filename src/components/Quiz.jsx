import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Quiz() {
  const [name, setName] = useState('')
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/quiz/questions`)
        const data = await res.json()
        setQuestions(data.questions || [])
        setAnswers(Array((data.questions || []).length).fill(null))
      } catch (e) {
        setError('Could not load the quiz — the sprites are shy. Try again!')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const choose = (qi, key) => {
    const next = [...answers]
    next[qi] = key
    setAnswers(next)
  }

  const canSubmit = name.trim().length > 0 && answers.every(a => !!a)

  const submit = async () => {
    setError('')
    try {
      const res = await fetch(`${API_BASE}/api/quiz/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, answers }),
      })
      if (!res.ok) throw new Error('Failed to submit')
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setError('The portal flickered — submission failed. Try once more!')
    }
  }

  if (loading) return (
    <section className="py-16 px-6 text-center text-emerald-100">Summoning questions...</section>
  )

  if (result) return (
    <section className="py-16 px-6">
      <div className="max-w-2xl mx-auto rounded-3xl border border-emerald-400/20 bg-white/5 backdrop-blur p-8 text-center">
        <div className="w-24 h-24 mx-auto rounded-full mb-4" style={{ background: `radial-gradient(circle at 30% 30%, ${result.aura}, transparent 60%)` }} />
        <h2 className="text-3xl font-bold text-white">{result.fairy}</h2>
        <p className="text-emerald-100/80 mt-2">{result.title}</p>
        <p className="text-emerald-100/80 mt-4">{result.blurb}</p>
        <div className="mt-6 grid grid-cols-3 gap-2 text-xs text-emerald-100/70">
          {Object.entries(result.tally).map(([k, v]) => (
            <div key={k} className="rounded-lg bg-black/30 border border-white/10 p-2">
              <p className="uppercase tracking-wide">{k}</p>
              <p className="text-lg font-semibold">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  return (
    <section className="relative z-10 py-16 md:py-24 px-6 bg-gradient-to-b from-black/80 to-black">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-3xl border border-emerald-400/20 bg-white/5 backdrop-blur p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Your Moon-Name</h2>
          <input
            className="mt-3 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-emerald-100 placeholder-emerald-100/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            placeholder="Whisper the name you travel by..."
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="mt-8 space-y-6">
          {questions.map((q, qi) => (
            <div key={q.id} className="rounded-3xl border border-emerald-400/20 bg-white/5 backdrop-blur p-6">
              <h3 className="text-xl font-semibold text-white">{q.question}</h3>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {q.options.map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => choose(qi, opt.key)}
                    className={`text-left rounded-xl px-4 py-3 border transition ${answers[qi] === opt.key ? 'border-emerald-400 bg-emerald-400/10 text-white' : 'border-white/10 bg-black/30 text-emerald-100/90 hover:border-emerald-300/50'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {error && <p className="mt-4 text-rose-300 text-sm">{error}</p>}

        <div className="mt-6 flex justify-center">
          <button
            disabled={!canSubmit}
            onClick={submit}
            className={`rounded-xl px-6 py-3 font-semibold transition ${canSubmit ? 'bg-emerald-500 hover:bg-emerald-400 text-black' : 'bg-emerald-900/40 text-emerald-200/50 cursor-not-allowed'}`}
          >
            Reveal my fairy
          </button>
        </div>
      </div>
    </section>
  )
}
