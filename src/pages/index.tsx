import { getDailyChengyu } from '../lib/chengyu';

export default async function HomePage() {
  const chengyu = getDailyChengyu();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8" style={{ background: 'var(--background)' }}>
      <p className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
        Today's Chengyu
      </p>
      <h1 className="text-8xl font-bold tracking-widest" style={{ color: 'var(--foreground)' }}>
        {chengyu.word}
      </h1>
      <p className="text-xl italic" style={{ color: 'var(--primary)' }}>
        {chengyu.pinyin}
      </p>
      <p className="text-sm max-w-md text-center leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
        {chengyu.explanation}
      </p>
    </main>
  );
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};