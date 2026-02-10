# Part 1 — Component Diagram (30%)

## Task
Create a Component Diagram that shows:

- system components,
- their responsibilities,
- interactions between them.

## Required components
- **Client (Web / Mobile)**: User interface where users can send and receive messages.
- **Backend API**: Manages user requests and interacts with other system components.
- **Message Service**: Handles the logic for message creation, status updates (sent, delivered, read).
- **Database**: Stores messages and their statuses.
- **Delivery mechanism (Queue / WebSocket / Push)**: Ensures messages are delivered asynchronously, even when users are offline.

## Component Diagram

```mermaid
graph LR
  Client --> API
  API --> MessageService
  MessageService --> DB[(Messages DB)]
  MessageService --> Queue
  Queue --> DeliveryService
  DeliveryService --> Client
```
---
## Part 2 — Sequence Diagram (25%)
### Scenario
User A sends a message to User B who is offline.

### Task
Describe the interaction sequence in time, i.e., how the request to send a message from User A to User B (who is currently offline) is processed.

### Sequence Diagram
```mermaid
sequenceDiagram
  participant A as User A
  participant Client
  participant API
  participant Msg as Message Service
  participant DB
  participant Queue
  participant DeliveryService
  participant B as User B

  A->>Client: Send message
  Client->>API: POST /messages
  API->>Msg: createMessage()
  Msg->>DB: save(message)
  Msg->>Queue: enqueue delivery
  API-->>Client: 202 Accepted

  %% User B is offline, message stays in Queue
  Queue-->>Queue: Message in Queue until User B is online
  
  %% When User B comes online
  DeliveryService->>Queue: fetch message
  DeliveryService->>B: Deliver message
  B->>DeliveryService: Acknowledge message
```

---
