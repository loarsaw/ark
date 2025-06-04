# Project Name

A full-stack web application built with Next.js frontend and Express.js backend.
 **Copy use sample env**
```bash
PORT=8000
PORT=8000
MONGO_CONNECTION_STRING=mongodb://mongo-main:27017
DB_NAME=task
AWS_SES_MAIL_ID=
AWS_SES_MAIL_SECRET=
AWS_REGION=us-east-1
JWT_SECRET=ajdaskjdasjdksadkja
AUTH_PUBLIC_URL=http://localhost:3000
SENDER_MAIL=
```

1. **Start backend services:**
   ```bash
   docker compose up -d
   ```

2. **Start frontend development server:**
   ```bash
   cd frontend
   npm run dev
   ```

### Stopping Services

- **Stop frontend:** Press `Ctrl+C` in the terminal running the Next.js dev server
- **Stop backend:** 
  ```bash
  docker compose down
  ```

## 📡 API Endpoints

The backend API is typically available at `http://localhost:8000` (adjust port based on your configuration).

1. **Frontend not connecting to backend:**
   - Verify backend is running: `docker compose ps`
   - Check API endpoint URLs in frontend configuration

