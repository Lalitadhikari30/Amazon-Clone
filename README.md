
 # Amazon Clone (Amazon.in UI) — React + Spring Boot Microservices

 Pixel-inspired Amazon.in clone focused on a polished, resume-ready frontend UI and a backend that is structured for microservices. The frontend is built with React (Vite) and includes a custom Amazon-style header, search category dropdown, “All” drawer menu, product listing cards, cart, checkout flow UI, and account/auth screens.

 The backend is a Spring Boot (Java 17) multi-module project that includes an Auth service with JWT + role-based access control, plus placeholder Catalog and Orders services.

 ## Demo

 - **Frontend (dev)**: `http://localhost:5173`
 - **Auth service**: `http://localhost:8081`
 - **Catalog service**: `http://localhost:8082`
 - **Orders service**: `http://localhost:8083`

 ## Highlights

 - **Amazon.in-style UI**
 - **Custom search category dropdown** (popover, active state)
 - **Amazon-style “All” hamburger drawer** (overlay, ESC close)
 - **INR currency formatting** via shared utility
 - **Cart state management** with persistence (`localStorage`)
 - **Authentication context** with JWT-ready wiring + demo fallback
 - **Backend microservices foundation** (Spring Boot multi-module)
 - **JWT authentication + RBAC** (roles: `USER`, `ADMIN`)

 ## Tech Stack

 ### Frontend

 - **React** (Vite)
 - **React Router**
 - **Context API** for Auth + Cart
 - **CSS** (custom Amazon-like theme)

 ### Backend

 - **Java 17**
 - **Spring Boot 3**
 - **Spring Security**
 - **JWT** (`jjwt`)
 - **Spring Data JPA** (Auth service)
 - **H2 (dev)** by default, Postgres-ready for Supabase

 ### Data / Infrastructure (planned / integration-ready)

 - **Supabase**
   - Frontend client scaffolded for storage/database integration
 - **Microservices**
   - Services split by domain (Auth, Catalog, Orders)

 ## Repository Structure

 ```
 Amazon clone/
   frontend/                # React (Vite) app
   backend/                 # Spring Boot multi-module microservices
     auth-service/          # JWT auth + RBAC + JPA
     catalog-service/       # placeholder catalog API
     order-service/         # placeholder orders API (JWT-protected)
 ```

 ## Frontend Features

 - **Header / Navigation**
   - Logo, delivery location, search bar with categories, language, account, returns, cart
   - Secondary nav links like Amazon.in
 - **Search**
   - Category dropdown is a custom component (not native `<select>`)
 - **Homepage**
   - Amazon-like hero banner area + deal cards + product grid
 - **Product pages**
   - Product cards + product detail pages
 - **Cart and Checkout (UI)**
   - Quantity controls, subtotal, checkout page structure
 - **Auth pages (UI + wiring)**
   - Sign-in and register screens ready to connect to backend

 ## Backend Services

 ### Auth Service (port `8081`)

 Provides JWT-based authentication and a minimal user model.

 Endpoints:
 - `POST /auth/register`
 - `POST /auth/login`
 - `GET /auth/me` (requires `Authorization: Bearer <token>`)

 Notes:
 - Passwords are stored using **BCrypt hashing**.
 - JWT includes `email`, `name`, and `role` claims.

 ### Catalog Service (port `8082`)

 Placeholder APIs to match the frontend integration points.

 Endpoints:
 - `GET /catalog/products`
 - `GET /catalog/products/{id}`

 ### Orders Service (port `8083`)

 Placeholder orders APIs protected by JWT (requires `Authorization: Bearer <token>`).

 Endpoints:
 - `GET /orders/my`
 - `POST /orders`

 ## Local Setup

 ### Prerequisites

 - Node.js 18+
 - Java 17
 - Maven 3.9+

 ### 1) Frontend

 ```bash
 cd frontend
 npm install
 npm run dev
 ```

 To connect the frontend to backend services, create `frontend/.env`:

 ```
 VITE_API_BASE_URL=http://localhost:8081
 ```

 If you prefer a gateway later, this base URL will point to the gateway instead.

 ### 2) Backend

 From the repository root:

 ```bash
 mvn -f backend/pom.xml -pl auth-service spring-boot:run
 mvn -f backend/pom.xml -pl catalog-service spring-boot:run
 mvn -f backend/pom.xml -pl order-service spring-boot:run
 ```

 ## Engineering Notes

 - **Separation of concerns**
   - UI components vs pages vs shared libs (`src/components`, `src/pages`, `src/lib`)
 - **Reusable utilities**
   - Shared INR currency formatter used across UI
 - **State management**
   - Cart reducer + `localStorage` hydration
   - Auth context with token persistence
 - **Microservices readiness**
   - Backend split by domain, ready to add gateway/service discovery later

 ## Roadmap

 - Replace placeholder Catalog/Orders with real persistence
 - Add API Gateway (single backend URL for frontend)
 - Add Supabase Postgres + migrations (Flyway)
 - Add admin screens and role-protected endpoints
 - Add payment integration and full checkout workflow

 ## License

 This project is for educational/demo purposes.
