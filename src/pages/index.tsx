import { getDailyChengyu } from '../lib/chengyu';
import { getChengyuAIContent } from '../lib/ai';
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
  const ai = await getChengyuAIContent(
    chengyu.word,
    chengyu.pinyin,
    chengyu.explanation,
  );

  return (
    <main className="min-h-screen flex flex-col" style={{ background: 'var(--background)' }}>

      {/* Header */}
      <header
        className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b backdrop-blur-sm"
        style={{ borderColor: 'var(--border)', background: 'color-mix(in oklch, var(--background) 85%, transparent)' }}
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

      {/* Body */}
      <div className="flex-1 max-w-6xl w-full mx-auto">
        <div className="flex flex-col md:grid md:grid-cols-2 md:h-full">

          {/* Left — Hero */}
          <div
            className="flex flex-col justify-center items-center text-center px-8 py-16 md:py-0 md:border-r relative"
            style={{ borderColor: 'var(--border)' }}
          >

            <p
              className="text-xs tracking-[0.25em] uppercase mb-8"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}
            >
              Today's Idiom
            </p>

            <h1
              className="text-7xl sm:text-8xl font-bold tracking-widest mb-8 leading-none"
              style={{ fontFamily: 'var(--font-hanzi)', color: 'var(--foreground)' }}
            >
              {chengyu.word}
            </h1>

            <p
              className="text-lg italic tracking-widest mb-4"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)' }}
            >
              {chengyu.pinyin}
            </p>

            <p
              className="text-sm leading-relaxed max-w-xs font-light"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {chengyu.explanation}
            </p>
          </div>

          {/* Right — Details */}
          <div className="flex flex-col gap-6 px-8 py-12 md:py-16">

            {/* Classical origin */}
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
                  <div className="border-l-2 pl-4" style={{ borderColor: 'var(--primary)' }}>
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

            {/* AI History */}
            {ai?.englishHistory && (
              <Card>
                <CardHeader>
                  <p
                    className="text-xs tracking-[0.25em] uppercase"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted-foreground)' }}
                  >
                    History & Context
                  </p>
                </CardHeader>
                <CardContent>
                  <p
                    className="text-sm leading-relaxed font-light"
                    style={{ color: 'var(--card-foreground)' }}
                  >
                    {ai.englishHistory}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* AI English example */}
            {ai?.englishExample && (
              <Card>
                <CardHeader>
                  <p
                    className="text-xs tracking-[0.25em] uppercase"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted-foreground)' }}
                  >
                    Example in English
                  </p>
                </CardHeader>
                <CardContent>
                  <p
                    className="text-sm leading-relaxed italic font-light"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--card-foreground)' }}
                  >
                    "{ai.englishExample}"
                  </p>
                </CardContent>
              </Card>
            )}

            {/* AI Chinese example */}
            {ai?.chineseExample && (
              <Card>
                <CardHeader>
                  <p
                    className="text-xs tracking-[0.25em] uppercase"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted-foreground)' }}
                  >
                    Example in Chinese
                  </p>
                </CardHeader>
                <CardContent>
                  <p
                    className="text-sm leading-relaxed font-light"
                    style={{ fontFamily: 'var(--font-hanzi)', color: 'var(--card-foreground)' }}
                  >
                    {ai.chineseExample}
                  </p>
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="border-t px-6 py-4 flex items-center justify-center"
        style={{ borderColor: 'var(--border)' }}
      >
        <p
          className="text-xs text-center leading-relaxed"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted-foreground)' }}
        >
          History and examples might be AI-generated · May contain inaccuracies
        </p>
      </footer>

    </main>
  );
}

export const getConfig = async () => {
  return { render: 'static' } as const;
};