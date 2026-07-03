# Task Manager

This is a full-stack Task Manager application built with a Node.js/Express backend and a React/Vite frontend.

## Structure

- `/backend`: The REST API built with Express, Prisma, and MySQL.
- `/frontend`: The web client built with React 19, Vite, Tailwind v4, and shadcn/ui.

## Getting Started

To get started, please view the individual README files in each folder:

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)

## Requirements

- Node.js 18+
- Docker and docker-compose (for running the database and backend services locally)

## Deployment (AWS + Cloudflare)

This repository is configured for an easy dockerized deployment to AWS EC2.

### 1. EC2 Setup
1. Spin up an Ubuntu EC2 instance and install Docker.
2. Clone this repository to the server.
3. Allocate an AWS Elastic IP and attach it to your instance.

### 2. Cloudflare Custom Domain
1. In Cloudflare DNS, create an `A` record (e.g., `tasks`) pointing to your Elastic IP.
2. Enable the **Proxy (Orange Cloud)**.
3. In SSL/TLS settings, set encryption mode to **Flexible**.

### 3. Start the Server
1. Copy `.env.example` to `.env` on your server.
2. Update the variables with your secure passwords and your new domain (e.g., `FRONTEND_URL=https://tasks.chinmaykudalkar.com`).
3. Run the following to start the app and seed the database:
```bash
docker compose up -d --build
sleep 15
docker compose exec api npx prisma db push
docker compose exec api npx prisma db seed
```
