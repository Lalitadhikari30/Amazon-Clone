
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
 | Database (dev) | H2 (in-memory) |
 | Database (ready) | Postgres (Supabase-ready) |
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

 ## 🧭 Architecture (high-level)

 ```mermaid
 flowchart LR
   UI[React Frontend :5173] -->|HTTP| AUTH[Auth Service :8081]
   UI -->|HTTP| CATALOG[Catalog Service :8082]
   UI -->|HTTP + Bearer JWT| ORDERS[Orders Service :8083]
   AUTH --> DB[(H2 / Postgres)]
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

 From the repository root:

 ```bash
 mvn -f backend/pom.xml -pl auth-service spring-boot:run
 mvn -f backend/pom.xml -pl catalog-service spring-boot:run
 mvn -f backend/pom.xml -pl order-service spring-boot:run
 ```

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
