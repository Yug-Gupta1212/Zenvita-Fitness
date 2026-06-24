# Zenvita-Fitness

A modern Health & Fitness Tracking application built with React, TypeScript, and Vite. The platform helps users monitor their workouts, nutrition, and sleep habits through an intuitive dashboard.

## Features

* Workout Tracking
* Nutrition Monitoring
* Sleep Tracking & Analysis
* Responsive Dashboard UI
* Local Storage Persistence
* Mock Authentication
* Optional Supabase Integration

---

## Tech Stack

* React
* TypeScript
* Vite
* TanStack Router
* Tailwind CSS
* Supabase (Optional)

---

# Getting Started

Follow these steps to run the project locally.

## 1. Clone the Repository

```bash
git clone https://github.com/Yug-Gupta1212/Zenvita-Fitness.git
```

## 2. Navigate to the Project Folder

```bash
cd Zenvita-Fitness
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Start the Development Server

```bash
npm run dev
```

## 5. Open the Application

Open your browser and visit:

```text
http://localhost:5173
```

---

# Demo Login Credentials

Use the following credentials to access the application:

```text
Email: alex@zenvita.ai
Password: password123
```

---

# Environment Variables (Optional)

To connect a real Supabase backend, create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

If these variables are not configured, the application automatically uses a local mock database powered by browser localStorage.

---

# Application Modules

## Workout Tracking

Track workouts and monitor fitness progress.

## Nutrition Monitoring

Record and manage nutrition-related information.

## Sleep Tracking

Users can:

1. Navigate to the Sleep page.
2. Click the "+" button.
3. Enter:

   * Date
   * Bedtime
   * Wake Time
   * Sleep Quality
   * Resting Heart Rate
4. Click **Log Session**.

The data is stored locally or in Supabase if configured.

---

# Project Structure

```text
src/
├── components/
├── routes/
├── lib/
├── hooks/
├── assets/
└── styles/
```

### Important Files

```text
src/routes/sleep.tsx
```

Sleep tracking functionality.

```text
src/components/AppShell.tsx
```

Application layout and navigation.

```text
src/lib/supabase.ts
```

Mock database and Supabase integration layer.

---

# Local Storage

When Supabase is not configured, data is stored locally in the browser.

To inspect stored data:

1. Open Developer Tools.
2. Navigate to:

```text
Application → Local Storage
```

3. View stored entries such as:

```text
zenvita_sleeps
```

---

# Troubleshooting

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Hard Refresh Browser

```text
Ctrl + F5
```

### Check Security Issues

```bash
npm audit
```

### Automatically Fix Vulnerabilities

```bash
npm audit fix
```

---

# Author

Yug Gupta

GitHub: https://github.com/Yug-Gupta1212

---

⭐ If you like this project, consider giving it a star.

