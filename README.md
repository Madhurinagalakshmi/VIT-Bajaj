VIT Full Stack Question Paper Solution
This is a Node.js REST API .

The API takes an array of mixed data types (numbers, alphabets, special characters) via a POST request and returns a structured JSON response with the processed data.

Tech Stack
Backend: Node.js
Framework: Express.js

API Endpoint
Method: POST
Route: /bfhl
Base URL --  https://vit-bajaj.onrender.com/bfhl
The server will run on http://localhost:3000.

Example Usage
Example A
Request Body:

{
  "data": ["a", "1", "334", "4", "R", "$"]
}

Expected Response (Status: 200 OK):

{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
