# Property Listing Backend API

A TypeScript/Node.js backend system for managing property listings with MongoDB, featuring user authentication and advanced property search capabilities.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   ```
4. Import the sample data:
   ```bash
   npm run import-csv
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

The server will start at `http://localhost:3000`

## API Documentation

### Authentication

All property-related endpoints require authentication. You must first register and get a JWT token.

#### Register User
- **Method**: POST
- **URL**: `/api/users/register`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: Returns user object and JWT token

#### Login
- **Method**: POST
- **URL**: `/api/users/login`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: Returns user object and JWT token

### Property Endpoints

All property endpoints require the JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Get All Properties
- **Method**: GET
- **URL**: `/api/properties`
- **Query Parameters**:
  - `title`: Search by property title
  - `minPrice`: Minimum price
  - `maxPrice`: Maximum price
  - `minBedrooms`: Minimum number of bedrooms
  - `maxBedrooms`: Maximum number of bedrooms
  - `minBathrooms`: Minimum number of bathrooms
  - `maxBathrooms`: Maximum number of bathrooms
  - `propertyType`: Type of property (Apartment, House, Villa, etc.)
  - `status`: Property status (Available, For Sale, Sold, Rented)
  - `location`: Search by location
  - `search`: General search in title, description, and location
  - `sortBy`: Field to sort by (default: createdAt)
  - `sortOrder`: Sort order (asc/desc, default: desc)
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)

Example:
```
GET /api/properties?title=luxury&minPrice=100000&maxPrice=1000000&propertyType=Villa&page=1&limit=10
```

#### Get Single Property
- **Method**: GET
- **URL**: `/api/properties/:id`
- **Response**: Returns single property object

#### Create Property
- **Method**: POST
- **URL**: `/api/properties`
- **Headers**: 
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_JWT_TOKEN
  ```
- **Body**:
  ```json
  {
    "title": "Luxury Villa",
    "description": "Beautiful villa with ocean view",
    "price": 500000,
    "location": "Mumbai, Maharashtra",
    "bedrooms": 4,
    "bathrooms": 3,
    "area": 2500,
    "propertyType": "Villa",
    "status": "For Sale",
    "features": ["Pool", "Garden", "Security"]
  }
  ```

#### Update Property
- **Method**: PATCH
- **URL**: `/api/properties/:id`
- **Headers**: 
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_JWT_TOKEN
  ```
- **Body** (only include fields to update):
  ```json
  {
    "price": 550000,
    "status": "Sold"
  }
  ```

#### Delete Property
- **Method**: DELETE
- **URL**: `/api/properties/:id`
- **Headers**: 
  ```
  Authorization: Bearer YOUR_JWT_TOKEN
  ```

## Error Responses

- **401 Unauthorized**: Missing or invalid JWT token
  ```json
  {
    "error": "Please authenticate."
  }
  ```
- **400 Bad Request**: Invalid input data
- **404 Not Found**: Resource not found
- **500 Server Error**: Internal server error

## Example Usage with Postman

1. **Register a User**:
   - Create POST request to `http://localhost:3000/api/users/register`
   - Add JSON body with email and password
   - Send request and copy the JWT token from response

2. **Search Properties**:
   - Create GET request to `http://localhost:3000/api/properties`
   - Add Authorization header with JWT token
   - Add query parameters for filtering
   - Send request

3. **Create Property**:
   - Create POST request to `http://localhost:3000/api/properties`
   - Add Authorization header with JWT token
   - Add property data in JSON body
   - Send request

4. **Update Property**:
   - Create PATCH request to `http://localhost:3000/api/properties/:id`
   - Add Authorization header with JWT token
   - Add update data in JSON body
   - Send request

5. **Delete Property**:
   - Create DELETE request to `http://localhost:3000/api/properties/:id`
   - Add Authorization header with JWT token
   - Send request

## Available Property Types
- Apartment
- House
- Villa
- Condo
- Townhouse
- Bungalow
- Studio
- Penthouse

## Available Property Status
- Available
- For Sale
- Sold
- Rented 