import '../styles.css';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';

type Props = { children: ReactNode };

export default async function RootLayout({ children }: Props) {
  return (
    <>
      <title>成語 · Chengyu Daily</title>
      <meta name="description" content="A new Chinese idiom every day" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;700&family=Noto+Serif:ital,wght@0,300;0,400;1,300;1,400&family=IM+Fell+English:ital@0;1&family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />
      {children}
      <Analytics />
    </>
  );
}

export const getConfig = async () => {
  return { render: 'static' } as const;
};