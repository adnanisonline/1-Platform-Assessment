# User Permissions Management System

This repository contains the codebase for a User Permissions Management System, developed as part of an assessment task. Below is an overview of the contents and instructions for usage.

## Objective

The goal of this project is to create a simplified user permissions management system with the following features:

1. Admin can dynamically add or remove user permissions.
2. Changes in permissions are reflected in a simple UI, with menu items in a sidebar updating based on assigned permissions.

## Technology Stack

- **Primary Language:** TypeScript
- **Backend:**
  - Nest.js (with Microservices architecture)
  - RabbitMQ for message-based communication
  - PostgreSQL for database storage
- **Frontend:** React.js

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- Docker and Docker Compose

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/adnanisonline/1-Platform-Assessment.git
   cd 1-Platform-Assessment
   ```

2. **Start the Application:**

   Use Docker Compose to set up and run the backend, frontend, and database services:

   ```bash
   docker-compose up --build
   ```

   This will:
   - Build and start the backend service on port `3001`.
   - Start the PostgreSQL database on port `5432`.

3. **Access the Application:**

   - Navigate to `http://localhost:3000` in your browser for the frontend.
   - The backend APIs will be available at `http://localhost:3001`.

### Database Configuration

The PostgreSQL database is configured with the following default values:

- **Username:** `postgres`
- **Password:** `password`
- **Database Name:** `user_permissions`

These values can be updated in the `docker-compose.yml` file.

### Running Tests

To run tests for critical parts of the system, execute:

```bash
docker-compose exec app npm test
```

## Key Features

- **Dynamic Permission Management:** Admins can manage permissions in real-time.
- **Dynamic Sidebar Menu:** UI updates automatically based on user permissions.
- **Microservices Architecture:** Decoupled services for scalability and maintainability.
