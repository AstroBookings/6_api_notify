# Admin API Documentation

Base path: `/api/admin`

## Ping

`GET /api/admin/ping`

Health check endpoint to verify admin service availability.

**Response:**

- 200 OK: Returns "pong"

## Regenerate Database

`POST /api/admin/regenerate-db`

Regenerates the entire database schema and seeds it with initial data. Used primarily for testing purposes.

**Headers Required:**

- x-api-key: API key for admin authentication

**Response:**

- 200 OK: Returns "Database regenerated successfully"
- 401 Unauthorized: Invalid or missing API key
- 500 Internal Server Error: Database regeneration failed

## Security

All endpoints require authentication via:

- API Key (x-api-key header)

This is an administrative API and should only be accessible by system administrators.
