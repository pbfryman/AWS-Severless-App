'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const { id, productname } = JSON.parse(event.body);

  const params = {
    TableName: "Products",
    Key: {
      id: id
    },
    UpdateExpression: "set productname = :pn",
    ExpressionAttributeValues: {
      ":pn": productname
    },
    ReturnValues: "UPDATED_NEW"
  };

  try {
    const data = await documentClient.update(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 204;
  } catch (err) {
    statusCode = 403;
    responseBody = `${statusCode}. Unable to update product: ${err}`;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
      "access-control-allow-origin": "*"
    },
    body: responseBody
  };

  return response;
};