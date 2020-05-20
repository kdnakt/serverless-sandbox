import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { DynamoDB } from 'aws-sdk';

const db = new DynamoDB.DocumentClient();

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  console.log('event:', event);
  console.log('context:', _context);
  console.log(event.headers ? `Cookie: ${event.headers.Cookie}` : 'no headers');
  console.log(event.queryStringParameters ? `query: id=${event.queryStringParameters.id}` : 'no query');
  let res: any = {
    statusCode: 500
  };
  await db.put({
    TableName: process.env.ROOMS_TABLENAME,
    Item: {
      RoomId: 'DUMMY',
      DateTime: new Date().toLocaleString('ja', { timeZone: 'Asia/Tokyo' })
    }
  }).promise().then(() => {
    res = {
      statusCode: 200,
      headers: {
        'Set-Cookie': 'hoge=fuga',
      },
      body: JSON.stringify({
        message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
        input: event,
      }, null, 2),
    };
  }).catch(e => {
    console.log(e);
    res = {
      statusCode: 500,
      body: JSON.stringify({
        message: e,
        input: event,
      }, null, 2),
    }; 
  });
  return res;
}
