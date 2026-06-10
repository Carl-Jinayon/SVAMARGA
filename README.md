# 🚀 CS Ultimate Curriculum Tracker

A high-performance, visually stunning learning management tool designed for ambitious engineers transitioning from **Full-Stack Development to Machine Learning Engineering**.

---

## 🏗️ Architecture & Connectivity
This project connects three powerful services to run securely and professionally:

1.  **GitHub (Source Control):** Stores your source code. You push your changes here to version your work.
2.  **Vercel (Deployment):** Connected to your GitHub repository. Whenever you push new code, Vercel automatically builds and redeploys your website, keeping your live URL updated.
3.  **Supabase (Database & Auth):** Provides cloud storage and authentication. Your website sends user progress data to Supabase, allowing you to access your stats from any device by logging in.

*Note: Your `.env` file contains secret keys and is ignored by GitHub to keep your database secure.*

---

## 📚 How the Career Tools Work

### 💎 Resume Optimizer
This tool helps you pass **ATS (Applicant Tracking Systems)**. 
- **The Goal:** Many automated systems filter candidates based on keywords.
- **The Function:** It compares your curriculum progress against your current resume skills. If you have mastered a topic in our tracker but haven't added it to your CV, it identifies it as a "Missing Power Keyword" so you can add it to increase your visibility to recruiters.

### 💼 Portfolio Builder
- Generates a custom Markdown snippet based on your mastery percentage and completed projects. You can copy this directly to your GitHub Profile README to showcase your verified technical growth.

### 🧠 Mock Interview
- A flashcard-based practice tool that pulls technical questions based on the curriculum phases you have already completed.

---

## 🚀 Getting Started

Follow these steps to set up and run the application locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn
- A [Supabase](https://supabase.com) account

### 1. Install Dependencies

Clone the repo and install the NPM dependencies:

```bash
git clone <your-repo-url>
cd cs-curriculum-tracker
npm install
```

### 2. Configure Environment

Create a `.env` file in the root:

```bash
VITE_SUPABASE_URL=your_actual_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_actual_supabase_key_here
```

### 3. Setup the Database

We have included a `schema.sql` file in the root directory that contains the complete database structure and relationships to run this app on Supabase.

1. Create a new Supabase project in your dashboard.
2. Navigate to the **SQL Editor** in your Supabase dashboard.
3. Open the `schema.sql` file provided in this repository, copy its contents, and paste them into the SQL Editor.
4. Click **Run** to execute the schema. This will create all the necessary tables (`profiles`, `progress`, `sessions`, etc.) and automatically configure Row Level Security (RLS) policies so that user data is protected.

### 4. Run the Application

Start the local development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

---

## 📖 Documentation

For a comprehensive breakdown of the application architecture, data flow, and technologies used, please refer to the `PROJECT_DOCUMENTATION.md` file included in this repository.

---

*Created with ❤️ for the next generation of AI Engineers.*