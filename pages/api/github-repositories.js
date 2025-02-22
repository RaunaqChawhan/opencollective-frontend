import { URL } from 'url';

import { pick } from 'lodash';

export default async function handle(req, res) {
  const apiUrl = new URL(`${process.env.API_URL}/github-repositories?api_key=${process.env.API_KEY}`);

  const result = await fetch(apiUrl, {
    method: 'GET',
    headers: pick(req.headers, ['accept', 'content-type', 'authorization', 'user-agent', 'accept-language']),
  });

  const json = await result.json();

  res.setHeader('Content-Type', 'application/json');
  res.status(result.status).json(json);
}
