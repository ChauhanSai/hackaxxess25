/**
    * This is the main entry point for the Lambda function.
    * It handles API requests and interacts with DynamoDB.
    * The function supports the following routes:
    * - POST /forkastAPI/nutrition: Add an item to forkastData
    *        Request body should be a JSON object with the following fields:
    *        { "id": "item_id", "image": "image_url", "data": "encrypted_nutrition_data" }
    * - GET /forkastAPI/nutrition: Fetch all items where id includes param
    *        Query parameter 'id' is required to filter items
    * - POST /forkastAPI/user: Add a new user to forkastUsers
    *        Request body should be a JSON object with the following fields:
    *        { "username": "username", "password": "password", "email": "email",
    *          "age": "age", "sex": "sex", "height": "height", "weight": "weight" }
    * - GET /forkastAPI/user: Fetch user by username
    *        Query parameter 'username' is required to fetch user
 */

import { DynamoDBClient, PutItemCommand, ScanCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import * as PATH from 'path';

// Set up DynamoDB client
const client = new DynamoDBClient({
  region: "us-east-2" // Change to your region if needed
});

// Lambda handler
export const handler = async (event) => {
  console.log("Received event:", JSON.stringify(event));

  const { routeKey, body, queryStringParameters } = event;
  console.log("routeKey:", routeKey);
  console.log("body:", body);
  console.log("queryStringParameters:", queryStringParameters);

  try {
    if (routeKey == "POST /forkastAPI/nutrition") {
      return await handlePostNutrition(body);
    } else if (routeKey == "GET /forkastAPI/nutrition") {
      return await handleGetNutrition(queryStringParameters);
    } else if (routeKey == "POST /forkastAPI/user") {
      return await handlePostUser(body);
    } else if (routeKey == "GET /forkastAPI/user") {
      return await handleGetUser(queryStringParameters);
    } else {
      return { statusCode: 400, body: JSON.stringify({ message: "Invalid API route" }) };
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return { statusCode: 500, body: JSON.stringify({ message: "Internal server error", error: error.message }) };
  }
};

// POST /nutrition - Add an item to forkastData
const handlePostNutrition = async (body) => {
  let parsedBody;
  try {
    parsedBody = JSON.parse(body);
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify({ message: "Invalid JSON format" }) };
  }

  const { id, image, data } = parsedBody;
  if (!id || !image || !data) {
    return { statusCode: 400, body: JSON.stringify({ message: "Missing 'id', 'image', or 'data'" }) };
  }

  const params = {
    TableName: "forkastData",
    Item: {
      id: { S: id },
      image: { S: image },
      data: { S: data }
    }
  };

  try {
    await client.send(new PutItemCommand(params));
    return { statusCode: 200, body: JSON.stringify({ message: "Item added successfully!" }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: "Error adding item", error: error.message }) };
  }
};

// GET /nutrition - Fetch all items where id includes param
const handleGetNutrition = async (queryParams) => {
  if (!queryParams?.id) {
    return { statusCode: 400, body: JSON.stringify({ message: "Missing 'id' query parameter" }) };
  }

  const params = {
    TableName: "forkastData"
  };

  try {
    const result = await client.send(new ScanCommand(params));
    const filteredItems = result.Items.filter(item => item.id.S.includes(queryParams.id));

    return { statusCode: 200, body: JSON.stringify(filteredItems) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: "Error fetching items", error: error.message }) };
  }
};

// POST /user - Add a new user to forkastUsers
const handlePostUser = async (body) => {
  let parsedBody;
  try {
    parsedBody = JSON.parse(body);
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify({ message: "Invalid JSON format" }) };
  }

  const { username, password, email, age, sex, height, weight } = parsedBody;
  if (!username || !password || !email || !age || !sex || !height || !weight) {
    return { statusCode: 400, body: JSON.stringify({ message: "Missing required user fields" }) };
  }

  const params = {
    TableName: "forkastUsers",
    Item: {
      username: { S: username },
      password: { S: password },
      email: { S: email },
      age: { N: age.toString() },
      sex: { S: sex },
      height: { N: height.toString() },
      weight: { N: weight.toString() }
    }
  };

  try {
    await client.send(new PutItemCommand(params));
    return { statusCode: 200, body: JSON.stringify({ message: "User added successfully!" }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: "Error adding user", error: error.message }) };
  }
};

// GET /user - Fetch user by username
const handleGetUser = async (queryParams) => {
  if (!queryParams?.username) {
    return { statusCode: 400, body: JSON.stringify({ message: "Missing 'username' query parameter" }) };
  }

  const params = {
    TableName: "forkastUsers",
    Key: {
      username: { S: queryParams.username }
    }
  };

  try {
    const result = await client.send(new GetItemCommand(params));
    if (!result.Item) {
      return { statusCode: 404, body: JSON.stringify({ message: "User not found" }) };
    }
    return { statusCode: 200, body: JSON.stringify(result.Item) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: "Error fetching user", error: error.message }) };
  }
};