# 💊 CuraShare — AI-Powered Surplus Medicine Redistribution Network

> **Slogan:** *Share today, Heal tomorrow.*
> **Tagline:** *Powered by AI. Driven by Care.*

CuraShare is a full-stack healthcare platform designed to connect **unexpired surplus medicines with verified patients who need them**. The platform combines AI-assisted medicine and prescription processing, smart **CuraBox** kiosk concepts, location-based matching, delivery coordination, and role-based authentication to make medicine redistribution safer, more transparent, and more accessible.

---

## 🔗 Live Website

**https://curaashare.netlify.app/**

---

## 🌟 Key Platform Features

### 1. 🎨 Visual Branding & Interactive Experience

* **Custom CuraShare Logo** — Healthcare-focused branding featuring supportive hands, a heart, medicine capsule, and leaf motif.
* **Animated Splash Screen** — Branded startup experience with loading status and skip functionality.
* **Interactive Cursor Sparkles** — Canvas-based particle effects responding to cursor/touch movement.
* **Dark Healthcare UI** — Modern dark interface with grid patterns, gradients, and responsive layouts.
* **Responsive Design** — Interface designed for desktop and mobile screen sizes.

---

### 2. 🔑 Role-Based Authentication

CuraShare provides dedicated authentication portals for different platform participants.

* **Google Authentication UI** — Google sign-in integration/interface.
* **Email Validation** — Client-side email format validation.
* **Role-Based Portals:**

  1. **Medicine Donor** — Individuals and households donating eligible surplus medicines.
  2. **Patient / Beneficiary** — Patients searching for and requesting medicines.
  3. **Pharmacy Partner** — Pharmacies managing medicine inventory and verification.
  4. **NGO / Delivery Partner** — Partners coordinating pickups and deliveries.
  5. **System Administrator** — Administrators monitoring platform activity and analytics.

> **Note:** Authentication and external service integrations should be configured with the required environment variables before production deployment.

---

## 📦 Multi-Role Dashboards

### 🟢 Donor Dashboard

* **Medicine Image Scanner Interface** — Upload medicine images for medicine information extraction.
* **Medicine Details** — Capture medicine name, expiry date, batch number, and manufacturer information.
* **Proof-of-Donation Upload** — Upload supporting medicine/package images.
* **Donation History** — Track submitted donations and their status.
* **Impact & Rewards** — Display contribution and community-impact metrics.

### 🔵 Patient Dashboard

* **Prescription Upload** — Upload prescription images for verification workflows.
* **Medicine Search** — Search available medicines by name and location.
* **Medicine Request** — Submit requests for available medicines.
* **Delivery / Pickup Options** — Support delivery or CuraBox pickup workflows.
* **3D CuraBox Simulation** — Interactive Three.js representation of the smart medicine kiosk.

### 🏢 Pharmacy Partner Dashboard

* **Inventory Management** — Manage available medicine stock.
* **Medicine Verification** — Review medicine information and submitted batches.
* **Demand Matching** — Match medicine availability with patient requests.

### 🚚 NGO & Delivery Partner Dashboard

* **Pickup & Delivery Management** — Manage medicine collection and delivery workflows.
* **Interactive Map Interface** — Visualize pickup and delivery locations.
* **Delivery Status** — Track stages such as:

  * Assigned
  * Picked Up
  * In Transit
  * Delivered

### ⚙️ Admin Command Center

* **Network Metrics** — Monitor medicines, patients, pharmacies, partners, and platform activity.
* **Analytics Dashboard** — Visualize redistribution and platform statistics.
* **Operational Monitoring** — Provide administrators with centralized platform information.

---

# 🛠️ Technology Stack

| Layer                  | Technology / Library |
| :--------------------- | :------------------- |
| **Primary Language**   | TypeScript           |
| **Frontend Framework** | React 19             |
| **Frontend Tooling**   | Vite                 |
| **Styling**            | Tailwind CSS v4, CSS |
| **Web Markup**         | HTML5                |
| **Backend Runtime**    | Node.js              |
| **Backend Framework**  | Express 4            |
| **TypeScript Runtime** | `tsx`                |
| **3D Visualization**   | Three.js             |
| **Data Visualization** | Recharts             |
| **Icons**              | Lucide React         |
| **Canvas Effects**     | HTML5 Canvas         |
| **Production Build**   | Vite, esbuild        |
| **Package Management** | npm / Bun            |

### Programming Language

**TypeScript is the primary programming language used throughout CuraShare.**

The GitHub language detector reports approximately **99.7% TypeScript** because the majority of the application's source code is written in `.ts` and `.tsx` files. React, Node.js, Express, Three.js, and Recharts are libraries/frameworks rather than separate programming languages.

---

# 🏗️ Application Architecture

```text
                    ┌──────────────────────────┐
                    │       CuraShare UI       │
                    │   React + TypeScript     │
                    └────────────┬─────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
       Authentication       Dashboards         Visualizations
       Google / Email       Role-based UI      Three.js / Charts
              │                  │                  │
              └──────────────────┼──────────────────┘
                                 ▼
                    ┌──────────────────────────┐
                    │      Service Layer       │
                    │    API / Application     │
                    │       Services           │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │     Node.js + Express     │
                    │       server.ts           │
                    └──────────────────────────┘
```

---

# 🚀 How to Run the Application

## Prerequisites

* **Node.js:** v18.0.0 or higher
* **npm** or **Bun**

## 1. Clone the Repository

```bash
git clone https://github.com/Meghanakalle/CuraShare.git
cd CuraShare
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create a local `.env` file based on `.env.example`.

```bash
cp .env.example .env
```

On Windows PowerShell, you can also use:

```powershell
Copy-Item .env.example .env
```

Add the required API keys and configuration values to `.env`.

**Never commit `.env` to GitHub.**

## 4. Start Development Server

```bash
npm run dev
```

The application runs at:

```text
http://localhost:3000
```

## 5. Build for Production

```bash
npm run build
```

This builds the frontend and bundles the server using the project's configured build process.

## 6. Start Production Server

```bash
npm run start
```

---

# 📁 Project Structure

```text
CuraShare/
├── README.md
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── package-lock.json
├── bun.lock
├── server.ts
├── tsconfig.json
├── vite.config.ts
│
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── curashare_logo_1786035662096.jpg
│   │
│   ├── components/
│   │   ├── CuraBox3D.tsx
│   │   ├── CuraShareLogo.tsx
│   │   ├── CursorSparkles.tsx
│   │   ├── Footer.tsx
│   │   ├── GoogleAuthButton.tsx
│   │   ├── InteractiveMap.tsx
│   │   ├── Navbar.tsx
│   │   └── SplashScreen.tsx
│   │
│   ├── pages/
│   │   ├── AboutPage.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── AuthPortal.tsx
│   │   ├── DeliveryDashboard.tsx
│   │   ├── DonorDashboard.tsx
│   │   ├── LandingPage.tsx
│   │   ├── MedicineSearchPage.tsx
│   │   ├── PatientDashboard.tsx
│   │   ├── PharmacyDashboard.tsx
│   │   │
│   │   └── auth/
│   │       ├── AdminAuth.tsx
│   │       ├── DonorAuth.tsx
│   │       ├── NGOAuth.tsx
│   │       ├── PatientAuth.tsx
│   │       └── PharmacyAuth.tsx
│   │
│   ├── services/
│   │   └── api.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
│
└── ...
```

---

# 🔄 Core CuraShare Workflow

```text
Donor
  │
  ▼
Medicine Information / Image
  │
  ▼
Eligibility & Verification
  │
  ▼
Available Medicine Network
  │
  ├───────────────┐
  ▼               ▼
Patient         Pharmacy
Request         Partner
  │               │
  └───────┬───────┘
          ▼
   Matching & Approval
          │
          ▼
   NGO / Delivery Partner
          │
          ▼
   Patient / CuraBox
```

---

# 💚 Vision & Social Impact

CuraShare aims to reduce the gap between **surplus medicines and patients who cannot easily access essential medication**.

The platform focuses on:

* ♻️ Reducing avoidable medicine wastage
* 💊 Improving access to eligible surplus medicines
* 🏥 Connecting donors, pharmacies, NGOs, and beneficiaries
* 📍 Supporting location-based medicine matching
* 🔐 Improving verification and transparency
* 🤖 Applying AI-assisted processing to medicine and prescription information
* 📦 Exploring smart CuraBox kiosks for community-level distribution

CuraShare's long-term vision is to build a **technology-enabled medicine redistribution network** that makes eligible surplus medicines more accessible to communities in need.

---

## ⚠️ Project Status

CuraShare is a **prototype / development project** demonstrating the proposed medicine redistribution workflow and user experience.

Some capabilities, including AI processing, external authentication, backend services, real-time tracking, and IoT functionality, may require additional API, database, hardware, or cloud configuration for full production deployment.

The platform is **not intended to replace medical professionals, pharmacists, or regulatory authorities**. Medicine eligibility, prescription validation, and final distribution should remain subject to appropriate professional and regulatory verification.

---

## 📜 License

This project is intended for educational, research, hackathon, and prototype development purposes.
