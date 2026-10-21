import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Activity, CheckCircle2, Server, Database, Code2, Sparkles, RefreshCw } from 'lucide-react'

interface HealthResponse {
  status?: string
  timestamp?: string
  database?: string
  framework?: string
  php_version?: string
  [key: string]: unknown
}

function App() {
  const [clickCount, setClickCount] = useState(0)
  const [healthData, setHealthData] = useState<HealthResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkHealth = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('http://127.0.0.1:8000/api/health')
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}: ${res.statusText}`)
      }
      const data = await res.json()
      setHealthData(data)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to reach backend server')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkHealth()
  }, [])


  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col items-center justify-center p-6 antialiased">
      <main className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-8 space-y-8">
        {/* Header */}
        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Fullstack Stack Configured
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            React 19 + Laravel 13
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Frontend powered by React 19.3.1, Vite, TypeScript, Tailwind CSS v4 &amp; shadcn/ui.
          </p>
        </header>

        {/* Badges */}
        <section aria-label="Tech Stack" className="flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            <Code2 className="w-3.5 h-3.5" /> React 19.3.1 + TS
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            <Sparkles className="w-3.5 h-3.5" /> Tailwind CSS v4
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            <Server className="w-3.5 h-3.5" /> Laravel 13 + Sanctum
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            <Database className="w-3.5 h-3.5" /> MySQL (MariaDB)
          </span>
        </section>

        {/* Shadcn UI Button Showcase */}
        <section aria-labelledby="shadcn-section-title" className="p-6 bg-zinc-50 dark:bg-zinc-950/50 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="shadcn-section-title" className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                shadcn/ui Button Component
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Interactive button using CVA and Tailwind CSS v4 tokens
              </p>
            </div>
            <span className="text-xs font-mono bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded">
              Clicks: {clickCount}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              id="shadcn-primary-button"
              variant="default"
              onClick={() => setClickCount((prev) => prev + 1)}
            >
              <Sparkles className="w-4 h-4" />
              Primary shadcn Button
            </Button>

            <Button
              id="shadcn-outline-button"
              variant="outline"
              onClick={() => setClickCount((prev) => prev + 1)}
            >
              Outline Button
            </Button>

            <Button
              id="shadcn-secondary-button"
              variant="secondary"
              onClick={() => setClickCount((prev) => prev + 1)}
            >
              Secondary Button
            </Button>
          </div>
        </section>

        {/* Backend API Health Section */}
        <section aria-labelledby="api-health-title" className="p-6 bg-zinc-50 dark:bg-zinc-950/50 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h2 id="api-health-title" className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Backend API Health Check
              </h2>
            </div>
            <Button
              id="check-health-button"
              size="sm"
              variant="outline"
              onClick={checkHealth}
              disabled={loading}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Test GET /api/health
            </Button>
          </div>

          {healthData && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-lg text-xs font-mono text-emerald-900 dark:text-emerald-200 overflow-x-auto">
              <pre>{JSON.stringify(healthData, null, 2)}</pre>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-lg text-xs font-mono text-red-700 dark:text-red-300">
              {error} (Ensure backend server is running on http://127.0.0.1:8000)
            </div>
          )}

          {!healthData && !error && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Click &quot;Test GET /api/health&quot; to verify the live connection to the Laravel backend.
            </p>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
