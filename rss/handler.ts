import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as Parser from 'rss-parser';

const parser = new Parser();

export const parse = async (feedUrlOrXml: string) => {
  if (!feedUrlOrXml.startsWith("http")) {
    // for testing purpose
    return await parser.parseString(feedUrlOrXml);
  }
  return await parser.parseURL(feedUrlOrXml);
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
