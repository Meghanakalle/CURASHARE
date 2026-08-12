# 💊 CuraShare — AI-Powered Surplus Medicine Redistribution Network

> **Slogan:** *Share today, Heal tomorrow.*  
> **Tagline:** *Powered by AI. Driven by Care.*

CuraShare is a comprehensive full-stack healthcare platform engineered to bridge the gap between unexpired surplus medicines and patients in critical need. By leveraging AI-powered Optical Character Recognition (OCR), smart 24/7 IoT kiosks (**CuraBox**), real-time map tracking, and verified Google/Gmail authentication, CuraShare ensures that life-saving medications reach underprivileged individuals safely, transparently, and efficiently.

---

## 🔗 Link to Live Website

https://curaashare.netlify.app/

--- 
## 🌟 Key Platform Features & Architecture

### 1. 🎨 Visual Branding & Animated Experience
* **Custom CuraShare Logo**: A medical branding logo featuring two supportive hands forming a circular embrace around a teal and blue heart with a capsule pill inside, topped with a green leaf sprout.
* **App Startup Splash Screen**: An animated startup loader showcasing the CuraShare branding, real-time network initialization progress, status messages, and a skip option.
* **Interactive Cursor Sparkles**: An interactive particle canvas generating subtle 4-point star sparkles in emerald, cyan, and purple as the user moves their cursor or touches the screen.
* **Dark Mode Grid Canvas**: High-contrast, dark mesh grid canvas (`#020617`) with radial emerald, cyan, and purple ambient glow gradients.

---

### 2. 🔑 Enhanced Google OAuth & Email Authentication
All five role-specific login portals feature secure authentication mechanisms:
* **Google OAuth Button**: One-click *"Continue with Google"* integration for fast, secure sign-in.
* **Valid Email Validation**: Strict regex validation enforcing proper email formats (e.g. `name@gmail.com`).
* **Role Portals**:
  1. **Medicine Donor Portal**: For households and individuals donating unexpired surplus medicines.
  2. **Patient & Beneficiary Portal**: For patients requesting medicines or verifying prescriptions.
  3. **Pharmacy Partner Portal**: For verified pharmacies managing surplus stock and verifying medicine quality.
  4. **NGO & Fleet Partner Portal**: For logistics drivers and NGO teams managing medicine pickups and deliveries.
  5. **System Admin Command Center**: For system administrators monitoring live network telemetry, audit logs, and analytics.

---

### 3. 📦 Multi-Role Dashboard Capabilities

#### 🟢 Donor Dashboard
* **AI Medicine Strip OCR Scanner**: Upload images of medicine strips for automatic detection of Medicine Name, Expiry Date, Batch Number, and Manufacturer.
* **Proof-of-Donation Upload**: Upload images of medicine packages or purchase receipts before submission.
* **Donation History & Rewards**: Track donated items, environmental impact metrics, and earn donor badges.

#### 🔵 Patient Dashboard
* **Prescription Verification**: Upload doctor prescription images for AI validation and matching with verified pharmacy stock.
* **Medicine Search & Request**: Search available medicines by city or name and request direct delivery or kiosk pickup.
* **3D CuraBox Kiosk Dispenser**: Interactive 3D Three.js simulation of the temperature-monitored smart dispensing kiosk.

#### 🏢 Pharmacy Partner Dashboard
* **Stock Upload & Verification**: Upload bulk inventory images and verify donated medicine batches.
* **Real-time Demand Matching**: Match incoming patient requests with available pharmacy stock.

#### 🚚 NGO & Fleet Partner Dashboard
* **Interactive Pickup & Delivery Map**: Route optimization for collecting donated medicines from CuraBoxes or donors and delivering them to patients.
* **Live Route Status**: Real-time status updates from *Assigned* to *Picked Up* to *Delivered*.

#### ⚙️ Admin Command Center
* **Live Network Telemetry**: View total medicines redistributed, active kiosks, verified pharmacies, and total patients served.
* **Recharts Analytics**: Interactive charts showing monthly redistribution volume and distribution by therapeutic category.

---

## 🛠️ Technology Stack

| Layer | Technology / Library |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript, Vite |
| **Styling & Effects** | Tailwind CSS v4, HTML5 Canvas Particle Engine |
| **3D Simulation** | Three.js (`@types/three`) |
| **Data Visualization** | Recharts |
| **Iconography** | Lucide React |
| **Backend Runtime** | Node.js, Express 4, `tsx` |
| **Build & Bundle** | Vite, `esbuild` |

---

## 🚀 How to Run the Application

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm** or **bun** package manager

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
Runs the Express backend server with `tsx` which handles the Vite middleware on port 3000:
```bash
npm run dev
```
Open your browser and navigate to:
`http://localhost:3000`

### 3. Build for Production
Compiles the Vite frontend assets and bundles `server.ts` using `esbuild` into CommonJS format inside `dist/server.cjs`:
```bash
npm run build
```

### 4. Start Production Server
Executes the bundled production server:
```bash
npm run start
```

---

## 📁 Directory Structure Overview

```
CuraShare/
├── README.md                   # Root documentation file
├── src/
│   ├── assets/                 # App assets & generated CuraShare logos
│   ├── components/             # Reusable UI components
│   │   ├── CuraBox3D.tsx       # 3D Three.js Smart Kiosk
│   │   ├── CuraShareLogo.tsx   # Custom CuraShare Logo component
│   │   ├── CursorSparkles.tsx  # Particle cursor sparkle canvas
│   │   ├── GoogleAuthButton.tsx# Google OAuth sign-in component
│   │   ├── InteractiveMap.tsx  # Leaflet/SVG interactive map
│   │   ├── Navbar.tsx          # Navigation header with notification drawer
│   │   ├── Footer.tsx          # Platform footer
│   │   └── SplashScreen.tsx    # Animated app loading screen
│   ├── pages/                  # Portal pages
│   │   ├── AuthPortal.tsx      # Multi-role authentication selector
│   │   ├── LandingPage.tsx     # Main home landing view
│   │   ├── DonorDashboard.tsx   # Donor portal
│   │   ├── PatientDashboard.tsx # Patient portal
│   │   ├── PharmacyDashboard.tsx# Pharmacy portal
│   │   ├── NGODashboard.tsx    # NGO fleet portal
│   │   ├── AdminDashboard.tsx  # Admin command center
│   │   └── auth/               # Role-specific auth portals (Gmail validated)
│   ├── services/               # Mock API services & OCR parsers
│   └── types.ts                # TypeScript interfaces & types
├── package.json                # Dependencies & scripts configuration
├── server.ts                   # Express server entry point with Vite middleware
└── vite.config.ts              # Vite configuration
```

---

## 💚 Vision & Social Impact
Over **$100 Billion** worth of unexpired, life-saving medicines are discarded globally every year while millions of low-income families struggle to afford essential prescriptions. **CuraShare** turns waste into wellness by connecting generous donors with verified beneficiaries through intelligent technology, transparent tracking, and community care.
