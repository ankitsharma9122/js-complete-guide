# API Communication Patterns: REST, RPC, WebSocket & GraphQL

## 1. REST (Representational State Transfer)

### What is REST?
A REST API is an interface that allows clients (like browsers, mobile apps, or other servers) to interact with server resources using standard HTTP methods (GET, POST, PUT, DELETE, etc.) in a stateless manner, where each request contains all the information needed, and responses usually come in formats like JSON or XML.

### Core Principles
- **Stateless**: Each request contains all information needed to process it
- **HTTP Methods**: Uses standard HTTP verbs (GET, POST, PUT, DELETE, PATCH)
- **Cacheable**: Responses can be cached for better performance

### Example
```http
GET /api/users/123           # Get user with ID 123
POST /api/users              # Create a new user
PUT /api/users/123           # Update user 123
DELETE /api/users/123        # Delete user 123
```

### When to Use REST
- **CRUD Operations**: Perfect for Create, Read, Update, Delete operations
- **Resource-centric Applications**: When your app naturally maps to resources
- **Web APIs**: Standard choice for public APIs
- **Caching Requirements**: When you need HTTP caching benefits

### When NOT to Use REST
- **Complex Queries**: Multiple related resources in single request
- **Real-time Communication**: Immediate bidirectional communication needed
- **Action-oriented Operations**: Operations that don't map well to CRUD.

![!\[Alt text\](image.png)](../../Public/REST.png)

---

## 2. RPC (Remote Procedure Call)

### What is RPC?
RPC allows calling functions/methods on remote servers as if they were local function calls. It abstracts network communication behind function calls.

### Types
- **JSON-RPC**: Uses JSON for data encoding
- **gRPC**: Google's high-performance RPC using Protocol Buffers
- **XML-RPC**: Uses XML (legacy)

### Core Characteristics
- **Function-oriented**: Calls specific procedures/methods
- **Tight Coupling**: Client and server share method definitions
- **Various Transports**: HTTP, TCP, UDP
- **Synchronous/Asynchronous**: Supports both patterns

### Example (gRPC)
```protobuf
service UserService {
  rpc GetUser(GetUserRequest) returns (User);
  rpc CreateUser(CreateUserRequest) returns (User);
  rpc ProcessPayment(PaymentRequest) returns (PaymentResponse);
}
```

### When to Use RPC
- **Performance Critical**: High-performance, low-latency requirements
- **Microservices**: Internal service-to-service communication
- **Streaming**: Real-time data streaming requirements
- **Language Agnostic**: Multiple programming languages in ecosystem

### When NOT to Use RPC
- **Simple CRUD**: Overkill for basic resource operations
- **Caching Needs**: Limited HTTP caching benefits
- **Firewall Issues**: Non-HTTP RPC may face network restrictions.

![!\[Alt text\](image.png)](../../Public/RPC.png)
---

## 3. WebSocket

### What is WebSocket?
WebSocket provides full-duplex communication over a single TCP connection. After an HTTP handshake, it maintains a persistent connection for real-time bidirectional communication.

### Core Characteristics
- **Persistent Connection**: Long-lived connection after initial handshake
- **Full-duplex**: Both client and server can send messages anytime
- **Low Latency**: Minimal overhead after connection established
- **Event-driven**: Message-based communication
- **Protocol Upgrade**: Starts as HTTP, upgrades to WebSocket

### Example
```javascript
// Client
const ws = new WebSocket('ws://localhost:8080');
ws.onmessage = (event) => console.log('Received:', event.data);
ws.send('Hello Server');

// Server (Node.js)
ws.on('message', (message) => {
  console.log('Received:', message);
  ws.send('Hello Client');
});
```

### When to Use WebSocket
- **Real-time Applications**: Chat, gaming, live updates
- **Low Latency**: Immediate response requirements
- **Frequent Updates**: Continuous data streaming
- **Bidirectional Communication**: Both client and server initiate messages
- **Live Collaboration**: Document editing, whiteboards
- **Financial Applications**: Trading platforms, live prices

### When NOT to Use WebSocket
- **Simple Request-Response**: Standard CRUD operations
- **Caching Requirements**: Need HTTP caching benefits
- **Mobile Applications**: Battery and connection concerns
- **Load Balancing Issues**: Sticky sessions required

![!\[Alt text\](image.png)](../../Public/Websocket.jpg)

---

## 4. GraphQL

### What is GraphQL?
GraphQL is a query language and runtime for APIs that allows clients to request exactly the data they need. It provides a single endpoint with flexible querying capabilities.

### Core Characteristics
- **Single Endpoint**: One URL for all operations
- **Flexible Queries**: Clients specify exactly what data they need
- **Strongly Typed**: Schema defines available operations and types
- **Introspectable**: Schema is queryable
- **Real-time Subscriptions**: Built-in support for live updates

### Example
```graphql
# Query
query {
  user(id: "123") {
    name
    email
    posts {
      title
      createdAt
    }
  }
}

# Mutation
mutation {
  createUser(input: {
    name: "John Doe"
    email: "john@example.com"
  }) {
    id
    name
  }
}

# Subscription
subscription {
  messageAdded {
    id
    content
    user
  }
}
```

### When to Use GraphQL
- **Frontend-heavy Applications**: React, Vue, Angular apps with complex UI
- **Real-time Features**: Built-in subscription support needed
- **API Gateway**: Aggregating multiple backend services

### When NOT to Use GraphQL
- **Simple Applications**: Basic CRUD with minimal complexity
- **File Uploads**: Complex binary data handling
- **Caching Requirements**: Heavy reliance on HTTP caching

![!\[Alt text\](image.png)](../../Public/GraphQL.png)
---

## Comparison Matrix

| Feature | REST | RPC | WebSocket | GraphQL |
|---------|------|-----|-----------|---------|
| **Communication** | Request-Response | Request-Response | Full-Duplex | Request-Response + Subscriptions |
| **Protocol** | HTTP | Various | WebSocket | HTTP |
| **Real-time** | No (polling) | Limited | Yes | Yes (subscriptions) |
| **Caching** | Excellent | Limited | No | Challenging |
| **Performance** | Good | Excellent | Excellent | Good |

## Decision Framework

### Choose REST when:
- Building standard web APIs
- CRUD operations dominate
- Caching is important
- Team prefers simplicity
- Public API for external developers

### Choose RPC when:
- Internal microservice communication
- Performance is critical
- Action-oriented operations
- Type safety is important
- Complex business logic

### Choose WebSocket when:
- Real-time features required
- Low latency is critical
- Bidirectional communication needed
- Frequent message exchange
- Live collaboration features

### Choose GraphQL when:
- Complex frontend applications
- Multiple client types
- Flexible data requirements
- Real-time features with flexible queries
