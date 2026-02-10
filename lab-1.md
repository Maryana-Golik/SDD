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

