# EPL App
 Disclaimer - app uses epl from the 2023 season - couldnt find apropriate api for newest version could be free
## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)

## Overview

The EPL App is a POC for making displaying information about the epl clubs and players.

## Features

- Team Profiles: information about each EPL club
- Player Bio: Individual player performance data
- Responsive Design: Seamless experience across desktop and mobile devices

## Tech Stack

- Frontend:
  - React
  - TypeScript
  - Vite
  - CSS Modules

- Backend:
  - ASP.NET Core
  - Entity Framework Core

- Database:
  - SQL lite

- Deployment:
  - Azure Static Web Apps (Frontend)
  - Azure App Service (Backend)


## Running with Docker Compose

1. Ensure you have a `.env` file in the root directory with your Football API key:
   ```
   FOOTBALL_API_KEY=your_api_key_here
   ```

2. Build and start the containers:
   ```
   docker-compose up --build
   ```

   This will start both the frontend and backend services.

3. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5201`

## Troubleshooting

- If you encounter any issues with the database, you can reset it by removing the `football.db` file in the backend directory.
- Ensure all required ports (3000, 5201) are available and not in use by other applications.
- Check the Docker logs for any error messages:
  ```
  docker-compose logs
  ```

## API Endpoints

- GET `/clubs`: Retrieve all clubs
- GET `/clubs/{id}`: Retrieve a specific club
- GET `/clubs/{id}/players`: Retrieve players for a specific club

## Environment Variables

- `FOOTBALL_API_KEY`: Your API key for the football data provider (api-football.com)
- `ConnectionStrings__DefaultConnection`: Connection string for the SQLite database (set in `appsettings.json` or as an environment variable)
