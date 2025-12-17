# FundSure - AI-Powered Loan Application Platform

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/nnithyanandam024/FundSure-EYTechathon2025/releases/tag/v1.0.0)
[![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/mongodb-%3E%3D4.4-green.svg)](https://www.mongodb.com/)

> An intelligent, conversational loan application platform that streamlines the personal loan process through AI-powered automation and intuitive user experience.

---

##  Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

##  Overview

FundSure is a comprehensive loan management system designed to revolutionize the personal loan application process. Built for the **EY Techathon 2025**, this platform combines modern web technologies with intelligent automation to provide a seamless experience for both customers and loan officers.

The system features a chat-based interface that guides users through the loan application process, automatically validates information, checks credit scores, verifies KYC documents, and presents personalized loan offers—all in real-time.

---

##  Features

### Customer-Facing Features

- **🤖 Conversational AI Interface**: Natural language loan application through an intuitive chat interface
- **📊 Real-Time Dashboard**: Track application status with interactive charts and analytics
- **💰 Personalized Loan Offers**: Dynamic loan matching based on eligibility and requirements
- **⚡ Instant Eligibility Check**: Immediate credit score evaluation and eligibility assessment
- **📱 Responsive Design**: Optimized experience across desktop, tablet, and mobile devices
- **🔍 Transparent Comparison**: Side-by-side comparison of multiple loan offers

### Backend Capabilities

- **🔐 Secure Data Management**: MongoDB-based persistent storage with encryption
- **💳 Automated Credit Assessment**: Real-time credit score evaluation and risk analysis
- **📄 KYC Verification**: Streamlined document verification workflow
- **🔄 RESTful API**: Comprehensive API endpoints for all operations
- **📈 Application Tracking**: Complete audit trail of application progress
- **👥 Customer Management**: Centralized customer profile and history management

### Administrative Features

- **📊 Analytics Dashboard**: Business intelligence and performance metrics
- **🎯 Lead Management**: Track and manage loan applications efficiently
- **💼 Product Management**: Configure and manage loan products dynamically
- **📋 Reporting**: Generate comprehensive reports for analysis

---

##  Architecture

FundSure follows a modern full-stack architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                         │
│  (React.js Frontend - fundsure-web)                    │
│  • Dashboard  • Chat Interface  • Analytics            │
└─────────────────────────────────────────────────────────┘
                           │
                           │ HTTPS/REST API
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   Application Layer                     │
│  (Node.js/Express Backend - fundsureMobile)            │
│  • Authentication  • Business Logic  • API Routes      │
└─────────────────────────────────────────────────────────┘
                           │
                           │ MongoDB Driver
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    Data Layer                           │
│  (MongoDB Database)                                     │
│  • Customers  • Loans  • Products  • Sessions          │
└─────────────────────────────────────────────────────────┘
```

---

##  Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/nnithyanandam024/FundSure-EYTechathon2025.git
cd FundSure-EYTechathon2025

# Install and start backend
cd fundsureMobile
npm install
cp .env.example .env
npm run populate
npm start

# Install and start frontend (in a new terminal)
cd ../fundsure-web
npm install
npm start
```

Access the application at `http://localhost:3000`

---

##  Installation

### Backend Setup (fundsureMobile)

1. **Navigate to backend directory:**
   ```bash
   cd fundsureMobile
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/fundsure
   ```

4. **Populate database with sample data:**
   ```bash
   npm run populate
   ```

5. **Start the backend server:**
   ```bash
   npm start
   ```

   Server will run at `http://localhost:5000`

### Frontend Setup (fundsure-web)

1. **Navigate to frontend directory:**
   ```bash
   cd fundsure-web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

   Application will open at `http://localhost:3000`

---

##  Configuration

### Backend Configuration

**Environment Variables** (`.env`):

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/fundsure

# Optional: AI Integration (Future Enhancement)
# OPENAI_API_KEY=your_key_here
# ANTHROPIC_API_KEY=your_key_here
```

### Frontend Configuration

**Environment Variables** (`.env`):

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Optional: Analytics
# REACT_APP_GA_ID=your_google_analytics_id
```

---

##  Usage

### For Customers

1. **Access the Application**: Navigate to `http://localhost:3000`
2. **Start Chat**: Click on the chat interface to begin your loan application
3. **Provide Information**: Answer questions about your personal and financial details
4. **Review Offers**: Compare personalized loan offers based on your eligibility
5. **Select Loan**: Choose the best offer and confirm your application
6. **Track Status**: Monitor your application progress through the dashboard

### For Developers

#### Running Tests

```bash
# Backend tests
cd fundsureMobile
npm test

# Frontend tests
cd fundsure-web
npm test
```

#### Database Management

```bash
# Populate database with sample data
npm run populate

# Test database connection
npm run test-connection
```

#### Development Mode

```bash
# Backend with auto-reload
cd fundsureMobile
npm run dev

# Frontend with hot reload
cd fundsure-web
npm start
```

---

##  API Documentation

### Base URL
```
http://localhost:5000/api
```

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/chat` | Main conversational interface |
| POST | `/customers/create` | Create new customer |
| GET | `/customers/:phone` | Get customer details |
| POST | `/loans/offers` | Get loan offers |
| POST | `/loans/apply` | Submit loan application |
| GET | `/loans/applications` | List all applications |
| POST | `/credit/check` | Check credit score |
| POST | `/kyc/verify` | Verify KYC documents |
| GET | `/health` | Health check endpoint |

**Complete API documentation available in:** [`API-DOCUMENTATION.md`](./API-DOCUMENTATION.md)

---

##  Project Structure

```
FundSure-EYTechathon2025/
│
├── fundsure-web/                    # Frontend Application
│   ├── public/                      # Static files
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── dashboard/           # Dashboard components
│   │   │   ├── chat/                # Chat interface
│   │   │   └── common/              # Reusable components
│   │   ├── pages/                   # Page components
│   │   ├── services/                # API services
│   │   ├── utils/                   # Utility functions
│   │   ├── App.js                   # Main App component
│   │   └── index.js                 # Entry point
│   ├── package.json
│   └── README.md
│
├── fundsureMobile/                  # Backend Application
│   ├── server.js                    # Main server file
│   ├── populateDB.js                # Database population script
│   ├── testConnection.js            # Connection test utility
│   ├── .env.example                 # Environment template
│   ├── package.json
│   ├── API-DOCUMENTATION.md         # API reference
│   ├── SETUP-GUIDE.md               # Setup instructions
│   ├── mongodb-setup.md             # Database schema
│   └── mongodb-queries.md           # Query examples
│
├── .gitignore
├── README.md                        # This file
└── LICENSE
```

---

##  Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **React.js** | UI framework for building interactive interfaces |
| **Chart.js** | Data visualization and analytics |
| **Axios** | HTTP client for API communication |
| **React Router** | Client-side routing |
| **CSS3** | Styling and responsive design |

### Backend

| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web application framework |
| **MongoDB** | NoSQL database for data persistence |
| **Mongoose/Driver** | MongoDB object modeling |
| **CORS** | Cross-origin resource sharing |
| **dotenv** | Environment variable management |

### Database Schema

- **customers** - Customer profiles and information
- **loan_applications** - Loan application records
- **loan_products** - Available loan products
- **credit_scores** - Credit score records
- **kyc_verifications** - KYC verification status
- **chat_sessions** - Conversation history
- **disbursements** - Loan disbursement records

---

##  Roadmap

### Version 1.1 (Planned)
- [ ] Mobile application (React Native)
- [ ] Enhanced AI capabilities
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

### Version 1.2 (Planned)
- [ ] Payment gateway integration
- [ ] Document OCR processing
- [ ] Real-time notifications
- [ ] Admin dashboard enhancements

### Future Enhancements
- [ ] Machine learning credit risk models
- [ ] Blockchain integration for transparency
- [ ] Biometric authentication
- [ ] Integration with banking APIs

---


## ⚡ Performance

- Average API Response Time: < 200ms
- Frontend Load Time: < 2 seconds
- Supports 100+ concurrent users
- Database query optimization with indexes
- Efficient caching strategies

---

## 🔒 Security

- Environment-based configuration
- Input validation and sanitization
- Secure MongoDB connections
- CORS protection
- Error handling without sensitive data exposure
- Regular dependency updates

---

<div align="center">

**Built with ❤️ for EY Techathon 2025**



[Report Bug](https://github.com/nnithyanandam024/FundSure-EYTechathon2025/issues) · [Request Feature](https://github.com/nnithyanandam024/FundSure-EYTechathon2025/issues) · [Documentation](https://github.com/nnithyanandam024/FundSure-EYTechathon2025/wiki)

</div>
