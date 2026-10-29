# InsurAI — Intelligent Corporate Insurance Management System

InsurAI is a full-stack, enterprise-grade insurance portfolio management platform designed with **Spring Boot 3 (Java 17)**, **MySQL & JPA**, and **React 18 (Vite)** with integrated **Web Speech API** voice navigation.

---

## Architecture Overview

```
                      +---------------------------------------+
                      |       React 18 + Vite Frontend        |
                      |       (Port 5173 / Axios Client)      |
                      +-------------------+-------------------+
                                          | REST + JWT Bearer
                                          v
                      +---------------------------------------+
                      |       Spring Boot 3.1 Backend         |
                      |       (Port 8081 / /api Prefix)       |
                      +---------+-------------------+---------+
                                |                   |
                      +---------v---------+   +-----v---------+
                      | MySQL 8.0 Engine  |   | In-Memory H2  |
                      |  (Production DB)  |   | (Auto-Fallback|
                      +-------------------+   +---------------+
```

---

## 1. Prerequisites
- **Java**: JDK 17 or higher (`java -version`)
- **Maven**: Bundled `./apache-maven-3.9.6/bin/mvn.cmd` or local Maven installation
- **Node.js**: v18+ and npm (`node -v`)
- **MySQL**: (Optional) MySQL Server 8.0 (configured via environment variables; defaults to self-contained in-memory fallback for instant zero-dependency execution)

---

## 2. Environment Configuration

Copy [.env.example](file:///c:/Users/ponshivavel/Projects/InsurAI/InsurAI/.env.example) to `.env`:

```env
# Backend Ports & DB
SERVER_PORT=8081
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/insurai_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your_mysql_password
SPRING_DATASOURCE_DRIVER=com.mysql.cj.jdbc.Driver

# JWT
JWT_SECRET=InsurAIEnterpriseSecureJwtSecretKeyMustBe32BytesOrLonger
JWT_EXPIRATION=86400000

# Frontend Base URL
VITE_API_BASE_URL=http://localhost:8081/api
```

---

## 3. How to Run the Backend (Spring Boot)

Run from the project root or the `springboot/` directory:

```powershell
# Using the bundled Maven wrapper
./apache-maven-3.9.6/bin/mvn.cmd spring-boot:run -f springboot/pom.xml
```

The backend starts on **port 8081**:
- Server Base: `http://localhost:8081/api`
- Default Seeded User: `admin@admin.com` / `admin`

---

## 4. How to Run the Frontend (React + Vite)

In a separate terminal:

```powershell
cd insurai
npm install
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 5. Endpoints Specification

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/login` | Authenticate user & return JWT token | No |
| `POST` | `/api/auth/register` | Register new user account (BCrypt hashed) | No |
| `GET` | `/api/dashboard/user/{email}` | Live SQL summary of policies, payments, claims | Yes (JWT) |
| `GET` | `/api/policies/user/{email}` | Retrieve user policies | Yes (JWT) |
| `POST` | `/api/policies` | Create or enroll in policy | Yes (JWT) |
| `PUT` | `/api/policies/{id}` | Update policy or renewal date | Yes (JWT) |
| `GET` | `/api/appointments/user/{email}` | Retrieve scheduled appointments | Yes (JWT) |
| `POST` | `/api/appointments` | Book new consultation | Yes (JWT) |
| `DELETE` | `/api/appointments/{id}` | Cancel appointment | Yes (JWT) |
| `GET` | `/api/transactions/user/{email}` | Verified payment records | Yes (JWT) |
| `POST` | `/api/transactions` | Process payment gateway simulation | Yes (JWT) |
| `GET` | `/api/notifications/user/{email}`| Activity & alert notifications | Yes (JWT) |
| `PUT` | `/api/notifications/{id}/read` | Mark alert as read | Yes (JWT) |
| `GET` | `/api/plans` | Catalog of enterprise plans | No |
| `GET` | `/api/guidelines` | Regulatory and compliance guidelines | No |

---

## 6. Voice Recognition Commands (Web Speech API)
Click the floating **Voice AI** button at the bottom-right and speak:
- *"Open dashboard"* &rarr; Navigates to Dashboard
- *"Show my policies"* / *"Renew policies"* &rarr; Navigates to Policy Renewal Center
- *"Open appointments"* &rarr; Navigates to Consultation Booking
- *"Show transaction history"* &rarr; Shows Dashboard Payment Ledger
- *"Open notifications"* &rarr; Navigates to Activity Feed
- *"Show insurance guidelines"* &rarr; Navigates to Plans & Guidelines
- *"Advisor directory"* &rarr; Navigates to Agent Support