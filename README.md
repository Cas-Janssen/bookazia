# Bookazia Webshop

Bookazia is a full-stack webshop for books, built with an Angular frontend and a Spring Boot backend.

## Tech Stack

- Frontend: Angular 21, TypeScript, SCSS, Angular Material, ngx-translate
- Backend: Spring Boot 3.4, Java 23, Spring Data JPA, Spring Security, JWT
- Database: PostgreSQL

## Project Structure

- Frontend: Frontend
- Backend: Backend

## Main Features

- Browse books and product details
- Search books and browse by category
- User authentication (register and login)
- Shopping cart and saved items
- Checkout flow with order success/failure pages
- User profile, profile editing, and order history
- Admin pages for product management
- Multilingual support (English and Dutch)

## Prerequisites

Install the following tools before running locally:

- Node.js (LTS, recommended 20+)
- npm
- Java 23
- Maven (or use the included Maven wrapper)
- PostgreSQL (local database)

## Environment and Configuration

### Backend configuration

Backend config is in Backend/src/main/resources/application.properties.

Default local values in this repository:

- Server URL: http://localhost:1234/api
- Database URL: jdbc:postgresql://localhost:5432/bookazia_db
- Database user: postgres
- Database password: postgres
- CORS origin: http://localhost:4200

You can copy and adapt Backend/src/main/resources/application.properties.example if needed.

Important note:

- spring.jpa.hibernate.ddl-auto is set to create-drop, which recreates the schema on each run.
- Change this for persistent data in development/production.

### Frontend environment

Development API base URL is set in Frontend/src/environments/environment.development.ts:

- http://localhost:1234/api

Production API base URL is set in Frontend/src/environments/environment.ts.

## Local Development Setup

### 1. Start PostgreSQL

Create a database named bookazia_db and ensure credentials match your backend configuration.

Example SQL:

```sql
CREATE DATABASE bookazia_db;
```

### 2. Run the backend

From the project root:

```bash
cd Backend
./mvnw spring-boot:run
```

On Windows PowerShell (if needed):

```powershell
cd Backend
.\mvnw.cmd spring-boot:run
```

Backend will run on:

- http://localhost:1234/api

### 3. Run the frontend

Open a new terminal from the project root:

```bash
cd Frontend
npm install
npm start
```

Frontend will run on:

- http://localhost:4200

## Useful Commands

### Frontend

From Frontend:

- npm start: run dev server
- npm run build: production build
- npm run watch: build in watch mode
- npm test: run tests

### Backend

From Backend:

- ./mvnw spring-boot:run: run application
- ./mvnw test: run tests
- ./mvnw clean package: create build artifact

## API and Routing Notes

- Backend context path: /api
- Frontend routes include home, product pages, cart, checkout, profile, saved items, admin, and legal pages

## Troubleshooting

- If the frontend cannot reach the API, verify backend is running on port 1234 and CORS origin includes http://localhost:4200.
- If database connection fails, confirm PostgreSQL is running and credentials in Backend/src/main/resources/application.properties are correct.
- If login issues occur, verify jwt.secret and token configuration are set correctly.

## Deployment Notes

- Dockerfiles are available in Backend/dockerfile and Frontend/dockerfile.
- docker-compose.yml runs the published frontend and backend images on your server and connects them to your existing Traefik network.
- CI/CD workflow is available in .github/workflows/cicd.yml. It builds and pushes images on GitHub, then deploys them from your self-hosted Linux runner on push to main.
- Use the root .env.example as the single shared env file for frontend, backend, and Traefik settings.
- Copy it to .env for local runs or let the workflow generate .env on the runner.
- The shared env file also carries backend runtime settings like port, servlet context path, and JPA mode.

### Required GitHub Secrets for CI/CD

- DOMAIN
- SPRING_DATASOURCE_URL
- SPRING_DATASOURCE_USERNAME
- SPRING_DATASOURCE_PASSWORD
- JWT_SECRET

The workflow writes a root .env file from these secrets and uses it for the deploy steps. Traefik, frontend API URL, CORS origin, and backend runtime defaults are derived from the domain and default to your proxy setup.
