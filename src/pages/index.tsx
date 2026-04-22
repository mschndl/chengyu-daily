import { getDailyChengyu } from '../lib/chengyu';
import { Card, CardContent, CardHeader } from '../components/ui/card';

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function formatDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function HomePage() {
  const chengyu = getDailyChengyu();
  const day = getDayOfYear();

  return (
    <main
      className="min-h-screen"
      style={{ background: 'var(--background)' }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="flex items-baseline gap-3">
          <span
            className="text-lg font-bold tracking-wider"
            style={{ fontFamily: 'var(--font-hanzi)', color: 'var(--primary)' }}
          >
            成語
          </span>
          <span
            className="text-sm italic hidden sm:block"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--muted-foreground)' }}
          >
            Chengyu Daily
          </span>
        </div>
        <div
          className="text-xs tracking-widest uppercase hidden sm:block"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted-foreground)' }}
        >
          {formatDate()} · Day {day}
        </div>
        <div
          className="text-xs tracking-widest uppercase sm:hidden"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted-foreground)' }}
        >
          Day {day}
        </div>
      </header>

      {/* Desktop: two-column / Mobile: stacked */}
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:grid md:grid-cols-2 md:min-h-[calc(100vh-57px)]">

          {/* Left — Hero */}
          <div
            className="flex flex-col justify-center items-center text-center px-8 py-16 md:py-0 md:border-r relative"
            style={{ borderColor: 'var(--border)' }}
          >
            {/* Seal stamp */}
            <div
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center border-2 rounded-sm opacity-50"
              style={{
                borderColor: 'var(--primary)',
                transform: 'rotate(-6deg)',
                fontFamily: 'var(--font-hanzi)',
              }}
            >
              <span className="text-xs font-bold leading-tight text-center" style={{ color: 'var(--primary)' }}>
                日<br />記
              </span>
            </div>

            {/* Day label */}
            <p
              className="text-xs tracking-[0.25em] uppercase mb-8"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}
            >
              Today's Idiom
            </p>

            {/* The chengyu */}
            <h1
              className="text-7xl sm:text-8xl font-bold tracking-widest mb-8 leading-none"
              style={{ fontFamily: 'var(--font-hanzi)', color: 'var(--foreground)' }}
            >
              {chengyu.word}
            </h1>

            {/* Pinyin */}
            <p
              className="text-lg italic tracking-widest mb-4"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)' }}
            >
              {chengyu.pinyin}
            </p>

            {/* Explanation */}
            <p
              className="text-sm leading-relaxed max-w-xs font-light"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {chengyu.explanation}
            </p>
          </div>

          {/* Right — Details */}
          <div className="flex flex-col gap-6 px-8 py-12 md:py-16 md:overflow-y-auto">

            {/* Origin */}
            {chengyu.derivation && (
              <Card>
                <CardHeader>
                  <p
                    className="text-xs tracking-[0.25em] uppercase"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted-foreground)' }}
                  >
                    Classical Origin
                  </p>
                </CardHeader>
                <CardContent>
                  <div
                    className="border-l-2 pl-4"
                    style={{ borderColor: 'var(--primary)' }}
                  >
                    <p
                      className="text-sm italic leading-relaxed"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--card-foreground)' }}
                    >
                      {chengyu.derivation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Example */}
            {chengyu.example && (
              <Card>
                <CardHeader>
                  <p
                    className="text-xs tracking-[0.25em] uppercase"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted-foreground)' }}
                  >
                    Example
                  </p>
                </CardHeader>
                <CardContent>
                  <p
                    className="text-sm leading-relaxed font-light"
                    style={{ color: 'var(--card-foreground)' }}
                  >
                    {chengyu.example}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};