
 <div align="center">

 # 🛒 Amazon Clone (Amazon.in UI)

 **Pixel-inspired Amazon.in UI clone** built for a resume-ready portfolio — with a React frontend and a Spring Boot microservices backend foundation.

 <!-- Badges -->
 ![React](https://img.shields.io/badge/React-19+-61DAFB?logo=react&logoColor=000)
 ![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?logo=vite&logoColor=fff)
 ![Java](https://img.shields.io/badge/Java-17-007396?logo=java&logoColor=fff)
 ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3-6DB33F?logo=springboot&logoColor=fff)
 ![Security](https://img.shields.io/badge/Spring%20Security-JWT%20%2B%20RBAC-4CAF50)
 ![Microservices](https://img.shields.io/badge/Architecture-Microservices-1f2937)

 </div>

 ---

 ## ✨ What you get

 A clean Amazon-like UI (Amazon.in inspired) + an engineering-forward backend structure.

 | 🎨 Frontend (React) | 🧠 Engineering | 🔐 Auth | 🧩 Backend (Microservices) |
 |---|---|---|---|
 | Amazon-like header (2 rows) | Cart reducer + persistence | JWT-ready auth flow | Spring Boot multi-module setup |
 | Custom category dropdown | Shared INR formatter | Roles: `USER`, `ADMIN` | Auth / Catalog / Orders services |
 | “All” drawer menu (overlay + ESC) | Route-based pages | BCrypt password hashing | CORS enabled for local dev |
 | Product cards + product pages | Clean folder structure | `/auth/login`, `/auth/register`, `/auth/me` | Placeholder APIs to plug into UI |

 ---

 ## 🚀 Local URLs

 | Service | URL | Notes |
 |---|---|---|
 | Frontend (Vite) | `http://localhost:5173` | UI + mock catalog data |
 | Auth Service | `http://localhost:8081` | JWT + RBAC + H2 (dev) |
 | Catalog Service | `http://localhost:8082` | Placeholder catalog endpoints |
 | Orders Service | `http://localhost:8083` | JWT-protected placeholder orders |

 ---

 ## 🧱 Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React (Vite), React Router, Context API, Custom CSS theme |
| Backend | Java 17, Spring Boot 3, Spring Security, JWT (jjwt), Spring Data JPA |
| Auth | Spring Boot JWT + BCrypt (H2) |
| Database (catalog/orders) | Local Postgres (`amazon_clone`) |
| File Storage | Supabase Storage (`product-images` bucket) |
| Architecture | Microservices by domain (Auth, Catalog, Orders) |

 ---

 ## 🗂️ Repository Structure

 ```
 Amazon clone/
   frontend/                # React (Vite) app
   backend/                 # Spring Boot multi-module microservices
     auth-service/          # JWT auth + RBAC + JPA
     catalog-service/       # placeholder catalog API
     order-service/         # JWT-protected placeholder orders API
 ```

 ---

 ## 🧭 Architecture (current)

```
┌─────────────────────────────────────────────────────────────┐
│                     React Frontend :5173                   │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  │
│  │   UI + Pages  │  │ Auth Context  │  │ Cart Context  │  │
│  └───────┬───────┘  └───────┬───────┘  └───────┬───────┘  │
└──────────┼──────────────────┼──────────────────┼───────────┘
           │                  │                  │
           ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                     Backend Services                        │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  │
│  │ Auth Service  │  │Catalog Service│  │Orders Service │  │
│  │     :8081     │  │     :8082     │  │     :8083     │  │
│  └───────┬───────┘  └───────┬───────┘  └───────┬───────┘  │
└──────────┼──────────────────┼──────────────────┼───────────┘
           │                  │                  │
           ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                 Storage & Databases                           │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  │
│  │ Supabase      │  │ Local Postgres │  │      H2       │  │
│  │ Storage       │  │ amazon_clone  │  │   (users)     │  │
│  └───────────────┘  └───────────────┘  └───────────────┘  │
└─────────────────────────────────────────────────────────────┘

Flows:
• UI → Auth Service → H2 → JWT back to UI
• UI → Catalog Service → Local Postgres + Supabase Storage
• UI → Orders Service (JWT) → Local Postgres
```

 ---

 ## 🔌 API Endpoints

 | Service | Endpoint | Method | Auth |
 |---|---|---|---|
 | Auth | `/auth/register` | `POST` | Public |
 | Auth | `/auth/login` | `POST` | Public |
 | Auth | `/auth/me` | `GET` | ✅ Bearer JWT |
 | Catalog | `/catalog/products` | `GET` | Public |
 | Catalog | `/catalog/products/{id}` | `GET` | Public |
 | Orders | `/orders/my` | `GET` | ✅ Bearer JWT |
 | Orders | `/orders` | `POST` | ✅ Bearer JWT |

 ---

 ## 🛠️ Setup (Run Locally)

 ### ✅ Prerequisites

 | Tool | Version |
 |---|---|
 | Node.js | 18+ |
 | Java | 17 |
 | Maven | 3.9+ |

 ### 1) 🎨 Frontend

 ```bash
 cd frontend
 npm install
 npm run dev
 ```

 #### Environment (optional)

 The frontend can run **without any backend** (it uses mock catalog data + demo auth fallback).

 If/when you introduce a **Gateway** (recommended next step), set:

 ```env
 VITE_API_BASE_URL=http://localhost:8080
 ```

 _(Today, the backend runs as separate services on different ports. A gateway will unify them behind one base URL.)_

 ### 2) 🧩 Backend (Microservices)

#### Prerequisites
- **Local Postgres** running on `localhost:5432`
  - Create database: `CREATE DATABASE amazon_clone;`
  - Default user/pass: `postgres`/`postgres` (change in `catalog-service/src/main/resources/application.yml` if needed)

#### Start services
From the repository root:

```bash
mvn -f backend/pom.xml -pl auth-service spring-boot:run
mvn -f backend/pom.xml -pl catalog-service spring-boot:run
mvn -f backend/pom.xml -pl order-service spring-boot:run
```

#### What each service uses
- **Auth Service**: H2 in-memory (users table)
- **Catalog Service**: Local Postgres (`amazon_clone`) + Supabase Storage for images
- **Orders Service**: JWT validation (uses same JWT secret as auth)

 ---

 ## 🧠 Engineering Notes

 - **State management**
   - Cart uses a reducer + `localStorage` hydration to persist the basket.
   - Auth context persists token and user data.
 - **Security**
   - BCrypt password hashing.
   - JWT includes `email`, `name`, and `role` claims.
 - **Microservices-first structure**
   - Services split by domain so you can scale independently.
   - Ready to add API Gateway + service-to-service auth later.
 - **India-ready UX**
   - INR formatting across the UI using a shared utility.

 ---

 ## 🧩 Roadmap

 - [ ] Add API Gateway (single backend URL for frontend)
 - [ ] Connect Catalog + Orders to real persistence (Supabase Postgres)
 - [ ] Add Flyway migrations + versioned schema
 - [ ] Add admin features + role-protected endpoints
 - [ ] Complete checkout workflow + payments

 ---

 ## 📄 License

 Educational/demo project.
