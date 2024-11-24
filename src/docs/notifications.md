# Notifications API Documentation

Base path: `/api/notifications`

## Ping

`GET /api/notifications/ping`

Health check endpoint to verify notifications service availability.

**Response:**

- 200 OK: Returns "pong"

## Get Pending Notifications

`GET /api/notifications`

Retrieves all notifications that haven't been sent yet.

**Response:**

- 200 OK: Returns array of NotificationDto
  ```typescript
  {
    id: string; // Notification unique identifier
    templateId: string; // Template used for the notification
    userId: string; // User who created the notification
    data: string; // JSON string with notification data
    recipient: string; // Email of the recipient
    subject: string; // Notification subject
    message: string; // Notification message
    status: 'pending' | 'read' | 'sent' | 'failed';
    createdAt: Date; // Creation timestamp
    updatedAt: Date; // Last update timestamp
  }
  [];
  ```

## Create Notifications

`POST /api/notifications`

Creates new notifications based on a template event.

**Request Body:**

```typescript
{
  templateId: string; // Template identifier
  userId: string; // User creating the notification
  data: string; // JSON string with event data
}
```

**Responses:**

- 201 Created: Returns array of created NotificationDto
- 400 Bad Request: Invalid input data
- 404 Not Found: Template not found

## Security

Most endpoints require authentication via:

1. API Key (x-api-key header)
2. User Token (Authorization: Bearer token header)

The only public endpoint is:

- GET /ping
