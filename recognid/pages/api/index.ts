import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('Process a POST request');
  } else {
    console.log('Handle any other HTTP method');
  }

  res.status(200).json({
    title: 'Recognid:Home',
    pageTitle: 'Click for start FaceTec Application',
  });
}
