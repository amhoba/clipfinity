# Clipfinity

Clipfinity is a TikTok-inspired video-sharing platform that allows users to upload, view, and like short videos. Built with a modern tech stack.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
  - [Production Deployment](#production-deployment)
- [Services](#services)
- [Authentication](#authentication)
- [Object Storage](#object-storage)
- [Database Administration](#database-administration)
- [Healthchecks](#healthchecks)
- [Development Process](#development-process)
- [TODO](#todo)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Video Uploads**: Users can upload short videos to share with the community.
- **Like System**: Users can like videos to engage with content creators.
- **View System**: Views are counted using a simple algorithm.
- **Responsive UI**: A modern, mobile and desktop friendly interface, good for both horizontal and vertical videos and for seamless user experience.
- **Scalable Backend**: Handles video uploads, likes, and user management efficiently.
- **Secure Authentication**: Powered by Clerk for robust user authentication.
- **Object Storage**: Uses MinIO for scalable and reliable video storage.
- **Database Management**: PostgreSQL with pgAdmin for easy database administration.

## Tech Stack
- **Frontend**: 
  - Next.js 15
  - Tailwind CSS
  - Shadcn UI
  - Radix UI
- **Backend**: 
  - Nest.js
  - TypeORM (Object-Oriented Programming with Dependency Injection)
- **Database**: PostgreSQL
- **Object Storage**: MinIO
- **API Gateway**: Traefik
- **Database Admin**: pgAdmin
- **Authentication**: Clerk
- **DevOps**: 
  - Docker with multi-stage builds for dev and prod
  - Docker Compose for service orchestration both for `dev` and `prod`
  - Typer CLI for administrative scripts with autocomplete

## Project Structure
```
.
├── backend/                # Nest.js backend with TypeORM
│   ├── src/              # Core backend logic
│   │   ├── auth/         # Clerk authentication
│   │   ├── database/     # TypeORM entities and database module
│   │   ├── likes/        # Like functionality
│   │   ├── upload/       # Video upload handling
│   │   ├── users/        # User management
│   │   ├── videos/       # Video management
│   │   └── views/        # View tracking
├── frontend/               # Next.js 15 frontend with Tailwind, Shadcn, Radix
│   ├── app/              # Next.js app router
│   ├── components/       # Reusable UI components
│   ├── public/           # Static assets
├── gateway/                # Traefik API gateway
├── minio/                  # MinIO object storage
├── database/               # PostgreSQL database
├── pgadmin/                # pgAdmin for database administration
├── integration/            # Docker Compose and Typer CLI scripts
└── README.md               # Project documentation
```

## Setup Instructions

### Prerequisites
- [typer-cli](https://typer.tiangolo.com/tutorial/typer-command/)
- Docker and Docker Compose
- Node.js (for local development)
- pnpm (package manager)
- A Clerk account for authentication
- A MinIO instance or local setup for object storage

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/amhoba/clipfinity.git
   cd clipfinity
   cp integration/.env.example integration/.env
   cp database/.env.example database/.env
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   cp pgadmin/.env.example pgadmin/.env
   cp minio/.env.example minio/.env
   ```
2. Adjust `.env` for all services. Then start and view stats:
   ```bash
   cd integration
   typer do.py run dev start
   typer do.py run dev stats
   ```
3. Access the app:
   - Full App: `http://localhost`
   - Backend API: `http://localhost/backend`
   - pgAdmin: `http://localhost:8001`
   - MinIO Admin UI: `http://localhost:8002`
   - MinIO: `http://localhost/minio`

### Production Deployment
1. Configure your domain URL in `frontend/.env`.
2. Build and deploy using Docker Compose:
   ```bash
   cd integration
   typer do.py run prod start
   ```
   This uses `docker-compose.prod.yml` for optimized production images.
3. Access the app via the Traefik gateway (default: `http://localhost`).

## Services
- **Backend**: Nest.js application handling API requests, video uploads, and likes.
- **Frontend**: Next.js 15 app for the user interface.
- **Database**: PostgreSQL for persistent data storage.
- **MinIO**: Object storage for video files, accessible via Traefik.
- **Traefik**: API gateway for routing and load balancing.
- **pgAdmin**: Web-based tool for database administration.

## Authentication
Clipfinity uses Clerk for secure user authentication. Configure Clerk in the `backend` and `frontend` and `integration`'s `.env` files with your API keys.

## Object Storage
MinIO is used for storing video files. It is accessible through the Traefik gateway. The administrative UI is accessible at `http://localhost:8002`. Configure MinIO credentials in the `minio/.env` file.

## Database Administration
pgAdmin is available for managing the PostgreSQL database. Access it at `http://127.0.0.1:8001` in development and production mode and log in with `postgres@gmail.com` as email and password, then open the database using the credentials specified in `pgadmin/servers.json`.

## Healthchecks
All services include healthchecks to ensure reliability:
- Backend: `/health` endpoint
- Frontend: `/api/health` endpoint
- Database, MinIO, and Traefik have built-in healthchecks configured in Docker Compose.

## Development Process
Clipfinity was created in 2 weeks with heavy use of AI tools, including AI chatbots and Cursor AI, to accelerate development.  
The project follows a modular structure with clear separation of concerns, leveraging best practices for scalability and maintainability.

## TODO
- Replace environment variables with a secrets manager (e.g., AWS Secrets Manager, HashiニCorp Vault).
- Refactor frontend code for better maintainability and performance.
- Write unit and integration tests for backend and frontend.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.