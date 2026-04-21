# ITIL Helpdesk System (Prototype)

## Overview

This project is a web-based helpdesk system inspired by ITIL (Information Technology Infrastructure Library) principles.
It allows users to create, track, and manage support tickets through a simple graphical user interface.

The purpose of the project is to demonstrate:

* Application of ITIL concepts such as incident management
* Full-stack web development using modern technologies
* Basic system design and database modeling

The system is designed as a minimal prototype, focusing on core functionality rather than full enterprise features.
It is conceptually similar to tools like Zendesk or Jira Service Management, but simplified for educational purposes.

---

## Tech Stack

* Frontend & Backend: Next.js (App Router)
* Runtime: Node.js
* Language: TypeScript
* Database: PostgreSQL (hosted via Neon)
* ORM: Prisma
* Styling: Tailwind CSS

---

## Prerequisites

Ensure the following tools are installed before running the project:

### Required Software

* Node.js (v18.x or newer recommended)
* npm (v9.x or newer)
* PostgreSQL database (via Neon or local instance)

### Recommended Environment

* OS: Windows, macOS, or Linux
* Editor: Visual Studio Code

---

## Environment Variables

Create a `.env` file in the root directory and add:

DATABASE_URL="your_database_connection_string"

---

## Installation & Setup

1. Clone the repository

2. Install dependencies:

   npm install

3. Set up the database:

   npx prisma migrate dev

4. Run the development server:

   npm run dev

5. Open in browser:

   http://localhost:3000

---

## Notes

This project is a prototype developed for academic purposes.
It does not include advanced features such as authentication, multi-tenancy, or billing systems.
