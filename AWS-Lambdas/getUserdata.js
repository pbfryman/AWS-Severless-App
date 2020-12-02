'use strict';
const AWS = require('aws-sdk');

AWS.config.update({ region: "us-east-2" });

exports.handler = async (event, context) => {
  // const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-2" });

  let resBody = "";
  let statusCode = 0;

  const { id } = event.pathParameters;

  const params = {
    TableName: "Users",
    Key: {
        id: id
    }
  };

  try {
    const data = await documentClient.get(params).promise();
    resBody = JSON.stringify(data.Item);
    statusCode = 200;
  } catch (err) {
    resBody = `Unable to get user data`;
    statusCode = 403;
  }

  const res = {
    statusCode: statusCode,
    headers: {
      "myHeader": "test"
    },
    body: resBody
  };

  return res;
};