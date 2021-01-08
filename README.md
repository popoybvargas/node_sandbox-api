# CRM Client side API

Playground API for development purposes which includes an endpoint for `/users` at the minimum.

## How to use

- run `git clone https://github.com/popoybvargas/node_sandbox-api.git`
- run `yarn install`
- run `yarn start`

## API Resources

### Users API Resources

All the users API router follows `/api/v1/users/`

| #   | Routers                        | Verbs  | Progress | Is Private | Description                                      |
| --- | ------------------------------ | ------ | -------- | ---------- | ------------------------------------------------ |
| 1   | `/api/v1/users`                | GET    | Done     | Yes        | Get user Info                                    |
| 2   | `/api/v1/users`                | POST   | Done     | No         | Create a user                                    |
| 3   | `/api/v1/users/login`          | POST   | Done     | No         | Verify user Authentication and return JWT        |
| 4   | `/api/v1/users/reset-password` | POST   | Done     | No         | Verify email and email pin to reset the password |
| 5   | `/api/v1/users/reset-password` | PATCH  | Done     | No         | Replace with new password                        |
| 6   | `/api/v1/users/logout`         | DELETE | Done     | Yes        | Delete user accessJWT                            |

### Tickets API Resources

All the tickets API router follows `/v1/tickets/`

| #   | Routers                             | Verbs  | Progress | Is Private | Description                                |
| --- | ----------------------------------- | ------ | -------- | ---------- | ------------------------------------------ |
| 1   | `/api/v1/tickets`                   | GET    | Done     | Yes        | Get all tickets for the logged-in in user  |
| 2   | `/api/v1/tickets/{id}`              | GET    | Done     | Yes        | Get details for a ticket                   |
| 3   | `/api/v1/tickets`                   | POST   | Done     | Yes        | Create a new ticket                        |
| 4   | `/api/v1/tickets/{id}`              | PUT    | Done     | Yes        | Update ticket details ie. reply message    |
| 5   | `/api/v1/tickets/close-ticket/{id}` | PATCH  | Done     | Yes        | Update ticket status to close              |
| 6   | `/api/v1/tickets/{id}`              | DELETE | Done     | Yes        | Delete a ticket                            |

### Tokens API Resources

All the tokens API router follows `/api/v1/tokens`

| #   | Routers          | Verbs | Progress | Is Private | Description            |
| --- | ---------------- | ----- | -------- | ---------- | ---------------------- |
| 1   | `/api/v1/tokens` | GET   | Done     | No         | Get a fresh access JWT |