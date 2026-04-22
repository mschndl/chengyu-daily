export default async function HomePage() {
  return (
    <main>
      <h1>Chengyu Daily</h1>
    </main>
  );
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};