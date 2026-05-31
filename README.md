# Naga Mounika Varikuntla - Full-stack Portfolio

A professional and modern personal portfolio website built with Node.js, Express, and MongoDB. 

## 🚀 Features
- **Frontend**: Responsive UI, Smooth animations (AOS), Dark/Light mode toggle, Smooth scrolling.
- **Backend**: RESTful API for portfolio data and contact form processing.
- **Database**: MongoDB for storing contact messages.
- **Tools**: Portfolio sections are dynamically populated from the backend.

## 🛠️ Tech Stack
- HTML5, CSS3, JavaScript (ES6+)
- Node.js & Express.js
- MongoDB & Mongoose
- FontAwesome & AOS

## 📂 Project Structure
- `frontend/`: Contains all client-side assets (HTML, CSS, JS, Resume PDF).
- `backend/`: Contains the server logic, models, and API routes.

## ⚙️ Setup Instructions

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed.
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally on port 27017 (or a remote URI).

### 2. Backend Setup
1. Open a terminal in the `backend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update `.env` file if your MongoDB URI is different:
   ```env
   MONGODB_URI=mongodb://localhost:27017/portfolio_db
   PORT=5000
   ```
4. Start the server:
   ```bash
   node server.js
   ```

### 3. Frontend Setup
1. Since it's a static frontend, you can simply open `frontend/index.html` in your browser.
2. For better experience, use a local server like "Live Server" in VS Code.

## 📊 Database Schema
Contact messages are stored in MongoDB with the following structure:
- `name`: (String)
- `email`: (String)
- `message`: (String)
- `timestamp`: (Date)

## 📄 Customization
- To update your resume, replace `frontend/assets/resume.pdf` with your actual resume file.
- To modify your profile info, edit the `portfolioData` object in `backend/server.js`.

---
*Created for Naga Mounika Varikuntla*
"# Portfolio" 
