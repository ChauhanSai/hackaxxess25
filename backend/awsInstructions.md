# Step 1: Create a Lambda Function

### AWS Lambda is a serverless compute service that allows you to run code without provisioning or managing servers. To create a Lambda function, follow these steps:

---

1. Navigate to AWS Lambda
	1.	Log in to the AWS Management Console.
	2.	In the search bar at the top, type Lambda and select AWS Lambda.

---

2. Create a New Function
	1.	Click *Create function*.
	2.	Choose *Author from scratch*.
	3.	Fill in the following details:
		- Function name: Give it a unique name, e.g., myLambdaAPI.
		- Runtime: Select a programming language (e.g., Node.js 18.x, Python 3.9, or Go).
		- Architecture: Keep it as x86_64 (default) unless you need ARM-based processing.
		- Permissions:
			- Click Change default execution role.
			- Select Create a new role with basic Lambda permissions (this gives the function permission to write logs to Amazon CloudWatch).
	4.	Click Create function.
		- AWS will take a few seconds to provision your Lambda function.

---

3. Edit and Deploy the Function

Once the function is created, you'll be redirected to the function editor. Scroll down to the Code source section. Replace the default code with:

```
exports.handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello from Lambda!" }),
    };
};
```

Click Deploy to save and activate the function.

---

4. Test the Function
	1.	Click Test (at the top right).
	2.	Under Event name, enter testEvent.
	3.	Leave the default JSON input as-is and click Create.
	4.	Click Test again.
	5.	If successful, you should see a response:

```
{
    "statusCode": 200,
    "body": "{\"message\":\"Hello from Lambda!\"}"
}
```
Now your Lambda function is ready! The next step is integrating it with API Gateway to expose it as an HTTP API. 🚀

---
# Step 2: Add a Database
### To add a database to your AWS Lambda API, you need to choose a database service and connect it to your Lambda function. 
AWS offers several options depending on your needs:

| Database Type | Best for | AWS Service |
| - | - | - |
| NoSQL (Key-Value, JSON) | Serverless, scalable, flexible schema | Amazon DynamoDB |
| SQL (Relational DB) | Structured data, complex queries | Amazon RDS (PostgreSQL, MySQL) |
| Serverless SQL | Auto-scaling, minimal maintenance | Amazon Aurora Serverless |
| Object Storage | Large data files, backups | Amazon S3 |

For a simple API, Amazon DynamoDB (NoSQL) is the easiest to set up. Below, I’ll guide you through setting up DynamoDB and integrating it with your Lambda function.

---

1. Create a DynamoDB Table
	1.	Go to AWS Console → Search for DynamoDB and open it.
	2.	Click *Create table*.
	3.	Set:
		- Table name: myLambdaData
		- Partition key: id (String)
	4.	Click *Create table* and wait for it to be ready.

---

2. Add IAM Permissions for Lambda
Your Lambda function needs permission to access DynamoDB.
	1.	Go to AWS IAM → Roles.
	2.	Find the execution role for your Lambda function (it usually starts with lambda-role-...).
	3.	Click *Attach policies*.
	4.	Search for AmazonDynamoDBFullAccess and attach it.

---

3. Modify Your Lambda Function to Use DynamoDB. (Install AWS SDK for Node.js)
	1.	In the Lambda function editor, go to Runtime settings.
	2.	Click Edit, then select Node.js 18.x (or your preferred version).
	3.	Under the Code section, modify your function:

*index.mjs*
```
/**
    * This is the main entry point for the Lambda function.
    * It handles API requests and interacts with DynamoDB.
    * The function supports the following routes:
    * - POST /forkastAPI/nutrition: Add an item to forkastData
    *        Request body should be a JSON object with the following fields:
    *        { "id": "item_id", "image": "image_url", "data": "encrypted_nutrition_data" }
    * - GET /forkastAPI/nutrition: Fetch all items where id includes param
    *        Query parameter 'id' is required to filter items
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
```

---

4.	Click Deploy.

---

# Step 3: Create an API Gateway
### To expose your AWS Lambda function as an HTTP API, you need to set up Amazon API Gateway. This will allow clients (such as web or mobile apps) to send requests to your Lambda function via a URL.

---

1. Open API Gateway
	1.	In the AWS Management Console, search for and open API Gateway.
	2.	Click *Create API*.

---

2. Choose API Type
	- Select HTTP API (recommended for most applications).
	- Click Build.

---

3. Configure API Integration
	1.	Integrations → Select Lambda Function.
	2.	Lambda Function → Choose your function (myLambdaAPI).
	3.	Click Next.

---

4. Define a Route
	1.	Click Add route.
	2.	Configure:
		- Method: GET
		- Resource path: /hello
	3.	Click Create.

---

5. Deploy the API
	1.	Click Next and Review the settings.
	2.	Click Create.
	3.	Your API will be deployed, and an Invoke URL will be generated.

---

6. Test Your API
	1.	Copy the Invoke URL (e.g., https://your-api-id.execute-api.region.amazonaws.com/hello).
	2.	Open a browser or use Postman to send a GET request.
	3.	You should receive:

```
{ "message": "Hello from Lambda!" }
```

Now, your Lambda function is accessible via an HTTP endpoint! 🎉 

7. Test your database connection
	1.	Get your API Invoke URL from API Gateway.
	2.	Use Postman or cURL to send a request:

```
curl -X POST "https://your-api-id.execute-api.region.amazonaws.com/hello" \
-H "Content-Type: application/json" \
-d '{"id": "123", "name": "Alice"}'
```

Now, your API is connected to a DynamoDB database! 🎉

---

Step 5: Add Authentication (JWT with Cognito)

1. Set Up AWS Cognito
	1.	Go to Amazon Cognito → Manage User Pools → Create a user pool.
	2.	Name it MyAuthPool, select Email as a sign-in option, and create a client app.
	3.	In App Clients, note down the Client ID.
	4.	Enable Hosted UI under App integration for login.

2. Attach Authentication to API Gateway
	1.	Navigate back to API Gateway.
	2.	Go to Authorization → Click Create an authorizer.
	3.	Select Cognito, enter:
		- Name: MyCognitoAuth
		- Cognito User Pool: Select MyAuthPool
	4.	Attach the authorizer to your /hello route:
		- Click on /hello route.
		- Select Authorization → Choose MyCognitoAuth.
		- Click Deploy API.

3. Test Authentication
	1.	Log in via Cognito and get a JWT token.
	2.	Send a request to:
```
GET https://your-api-id.execute-api.region.amazonaws.com/hello
```
With the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

Now your API is protected and only authenticated users can access it! 🚀 Let me know if you need more details!