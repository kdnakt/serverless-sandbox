import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { DynamoDB } from 'aws-sdk';

const db = new DynamoDB.DocumentClient();

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  console.log(`${process.env.ROOMS_TABLENAME}`);
  await db.put({
    TableName: process.env.ROOMS_TABLENAME,
    Item: {
      RoomId: 'DUMMY',
      DateTime: new Date().toUTCString()
    }
  }).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }, null, 2),
  };
}
