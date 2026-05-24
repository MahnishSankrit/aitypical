# Realtime Orders Update System

## Overview

This project implements a realtime order update system where connected clients automatically receive updates whenever changes occur in the database.

The system avoids traditional polling and instead uses an event-driven architecture using MongoDB Change Streams and Socket.io.

Whenever an order is inserted, updated, or deleted, all connected clients receive the updated data instantly without refreshing the page.


---

# Problem Statement

The goal of this project was to design a backend system that listens for database changes and pushes updates to connected clients in realtime.

The system should:

- Detect database changes automatically
- Push updates to clients instantly
- Avoid unnecessary polling
- Maintain efficient realtime communication


---

# Why This Approach?

Initially, polling was considered as a possible solution, where clients repeatedly request updates from the server every few seconds.

However, polling creates unnecessary database queries even when no data changes occur. This increases server load, network traffic, and latency.

To solve this more efficiently, I chose an event-driven architecture using:

- MongoDB Change Streams
- Socket.io

MongoDB Change Streams provide native realtime database event detection, while Socket.io enables persistent realtime communication between the backend and connected clients.

This approach ensures that updates are only sent when actual database changes occur.


---

# Architecture

```text
Client
   ↑
Socket.io
   ↑
Node.js Backend
   ↑
MongoDB Change Streams
   ↑
MongoDB Atlas
```

## Realtime Flow

1. A client performs a CRUD operation
2. MongoDB collection changes
3. MongoDB Change Streams detect the database event
4. Backend receives the event
5. Socket.io broadcasts the update
6. Connected clients receive updates instantly

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Socket.io

### Frontend

- HTML
- CSS
- Vanilla JavaScript

## Features

- Realtime database change detection
- Instant client updates
- CRUD operations for orders
- Event-driven architecture
- WebSocket communication using Socket.io
- MongoDB Change Streams integration
- Schema validation using Mongoose
- Modular backend architecture

## Folder Structure

```
server/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── orderController.js
│   │
│   ├── listeners/
│   │   └── orderWatcher.js
│   │
│   ├── models/
│   │   └── Order.js
│   │
│   ├── routes/
│   │   └── orderRoutes.js
│   │
│   ├── sockets/
│   │   └── socket.js
│   │
│   ├── app.js
│   └── server.js
│
├── client/
│   └── index.html
│
└── .env
```

## API Endpoints

### Get All Orders
```
GET /api/orders
```

### Create Order
```
POST /api/orders
```

### Update Order
```
PUT /api/orders/:id
```

### Delete Order
```
DELETE /api/orders/:id
```

### Example Request — Create Order

```json
{
  "customer_name": "John Doe",
  "product_name": "Laptop",
  "status": "pending"
}
```

## MongoDB Schema Validation

The `status` field is validated using Mongoose enums to ensure only valid order states are accepted.

Allowed values:

- `pending`
- `shipped`
- `delivered`

## Why Socket.io?

Socket.io was chosen because it simplifies realtime communication by providing:

- Persistent websocket connections
- Automatic reconnection
- Event-based communication
- WebSocket abstraction
- Easier client-server integration

## Why MongoDB Change Streams?

MongoDB Change Streams provide native realtime database event support.

Instead of manually implementing polling or database triggers, the backend can directly listen for `insert`, `update`, and `delete` events from the database.

This creates a clean and efficient event-driven architecture.

## Why Not Polling?

Polling repeatedly sends requests to the server even when no data changes occur.

This leads to:

- Unnecessary database load
- Increased network traffic
- Higher latency
- Poor scalability

The implemented solution avoids this by pushing updates only when actual database changes happen.


---

# Installation & Setup

### Clone Repository

```bash
git clone <repository-url>
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

### Start Server

```bash
npm run start
```

Expected output:

```
MongoDB connected
Watching order collection...
Server running on port 5000
```

### Running Client

Open:

```
client/index.html
```

in the browser.


---

# Testing Realtime Updates

1. Open `client/index.html` in two browser tabs
2. Use Postman or Thunder Client to create/update/delete orders
3. Observe both clients updating instantly in realtime

### Example Test Request — Create Order

```
POST http://localhost:5000/api/orders
```

```json
{
  "customer_name": "Mahnish",
  "product_name": "Mechanical Keyboard",
  "status": "pending"
}
```
