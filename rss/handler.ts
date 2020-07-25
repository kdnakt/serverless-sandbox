import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as Parser from 'rss-parser';

const p = new Parser();

export const parse = async (url: string) => {
  const output = await p.parseURL(url);
  return output;
}

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  const targetUrl = process.env.TARGET_URL || 'https://kdnakt.hatenablog.com/feed';
  console.log('target:', targetUrl);
  const res = await parse(targetUrl);
  console.log('res:', res);
  const isoDate = res.items[0].isoDate;
  console.log('isoDate:', isoDate);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }, null, 2),
  };
}
