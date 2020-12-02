'use strict';
const AWS = require('aws-sdk');

AWS.config.update({ region: "us-east-2" });

exports.handler = async (event, context) => {
  // const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-2" });

  let resBody = "";
  let statusCode = 0;

  const { id, firstname, lastname } = JSON.parse(event.body);

  const params = {
    TableName: "Users",
    Item: {
        id: id,
        firstname: firstname,
        lastname: lastname
    }
  };

  try {
    const data = await documentClient.put(params).promise();
    resBody = JSON.stringify(data);
    statusCode = 201;
  } catch (err) {
    resBody = `Unable to put user data`;
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