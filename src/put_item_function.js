const { randomUUID } = require('crypto');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    let statusCode = 0;
    let responseBody = "";

    let { id, name, price, amount, picture } = JSON.parse(event.body);

    const model = {
        id: id ?? randomUUID(),
        name: name,
        price: price,
        amount: amount,
        picture: picture
    }

    const params = {
        TableName: 'DioCognitoItems',
        Item: model
    }

    try {
        await dynamodb.put(params).promise();
        statusCode = 200;
        responseBody = JSON.stringify({
            statusCode: 1,
            message: 'Operação realizada com sucesso.',
            data: model
        })
    } catch (err) {
        statusCode = 200;
        responseBody = JSON.stringify({
            statusCode: -1,
            message: 'Ocorreu um erro ao realizar operação.',
            data: JSON.stringify(err)
        })
    }

    const response = {
        statusCode: statusCode,
        body: responseBody,
    };
    return response;
};
