import express from 'express';

const router = express.Router();

router.get('/static', async (_req, res, _next) =>
  res.json({
    title: 'Welcome to <a href="https://nextjs.org">Next.js!</a>',
    description: 'Get started by editing <code>pages/index.js</code>',
    grid: [
      {
        href: 'https://nextjs.org/docs',
        title: 'Documentation &rarr;',
        text: 'Documentation &rarr;',
      },
      {
        href: 'https://nextjs.org/learn',
        title: 'Learn &rarr;',
        text: 'Learn about Next.js in an interactive course with quizzes!',
      },
      {
        href: 'https://github.com/vercel/next.js/tree/master/examples',
        title: 'Examples &rarr;',
        text: 'Discover and deploy boilerplate example Next.js projects.',
      },
      {
        href: 'https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app',
        title: 'Deploy &rarr;',
        text: 'Instantly deploy your Next.js site to a public URL with Vercel.',
      },
    ],
    footer: {
      href: 'https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app',
      text: 'Powered by',
    },
  })
);

export default router;
