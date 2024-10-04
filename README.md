# EPL App
 Disclaimer - app uses epl from the 2023 season - couldnt find apropriate api for newest version could be free
## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)

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

## Project Structure

EPL-App/
├── app/                # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── backend/            # ASP.NET Core backend
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   ├── Program.cs
│   └── Startup.cs
├── .github/
│   └── workflows/      # GitHub Actions workflows
└── README.md
