import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import Parser from 'rss-parser';

const p = new Parser();

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  const targetUrl = process.env.TARGET_URL || 'https://kdnakt.hatenablog.com/feed';
  console.log('target:', targetUrl);
  const res = await p.parseURL(targetUrl);
  console.log('res:', res);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }, null, 2),
  };
}
