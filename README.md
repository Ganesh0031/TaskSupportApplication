# Mini Support Desk 🛠️

A full-stack web application to manage internal support tickets with role-based access for Users and Admins.

---

## 📌 Objective

Build a small support desk system where:
- Users can raise and track their own tickets
- Admins can manage, assign, and resolve tickets
- Communication happens via ticket comments
- Basic analytics are shown on a dashboard

---

## 👥 User Roles

### 🔹 User
- Register and login
- Create support tickets
- View only their own tickets
- Edit tickets only when status is **OPEN**
- Comment on their own tickets

### 🔹 Admin
- Login as admin
- View all tickets
- Update ticket status & priority
- Assign / unassign tickets
- Comment on any ticket
- View dashboard metrics

---

## 🎫 Ticket Lifecycle

Each ticket contains:
- **Title**
- **Description**
- **Status**: `OPEN`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`
- **Priority**: `LOW`, `MEDIUM`, `HIGH`
- **Assigned Admin**
- **Comments (conversation thread)**

---

## 🔍 Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access enforced in backend (Spring Security)

### Ticket Management
- Create, update, assign, and track tickets
- Role-based access rules
- Status & priority management

### Comments
- Threaded comments per ticket
- User → own tickets only
- Admin → all tickets

### Listing & Search
- Pagination
- Sorting
- Filters (Status, Priority)

### Dashboard Metrics
- Total tickets
- Open vs Resolved tickets
- Tickets created today / this week

---

## 🧱 Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Security + JWT
- JPA / Hibernate
- MySQL (can be switched to H2)
- Maven

### Frontend
- React.js
- Axios
- React Router
- Basic responsive UI

---

## 📁 Project Structure

