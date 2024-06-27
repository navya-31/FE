# Horizon
Fullstack web application for system of booking rooms in hotels (MERN stack).

## Clone repository
   ```bash
   git clone https://github.com/proxod3-first/Horizon.git
   ```

## File .env for backend
Add `.env` to `/backend` (for local mongodb connection)
  ```bash
  MONGODB_URL = "mongodb://127.0.0.1:27017/HorizonDB?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.5"
  PORT = 5000
  JWT_TOKEN = "377df7b2ff46fdac844db4a28e8b5207acf2f7d442fa0c7baf4d21307eff4adc"
  ```

## Build and Run
1. `Docker`:
   ```bash
   docker-compose build
   docker-compose up
   ```
   
2. Locally (2 terminals for use)

   `Frontend`
   ```bash
   cd frontend
   npm install
   npm start
   ```
   
   `Backend`
   ```bash
   cd backend
   npm install
   npm start
   ```
   
   After running app, you can go to [http://localhost:3000/](http://localhost:3000/)
