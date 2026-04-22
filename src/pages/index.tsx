export default async function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
      <h1 className="text-4xl font-bold" style={{ color: 'var(--foreground)' }}>
        Chengyu Daily
      </h1>
    </main>
  );
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};