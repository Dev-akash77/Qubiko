# 🚀 QUBIKO – Scalable, Real-Time AI Assistant

🔗 **Live Project:** [https://qubiko.vercel.app](https://qubiko.vercel.app)  
👨‍💻 **Created by:** [Akash Biswas](https://www.linkedin.com/in/akash-biswas-486435289/)  
📂 **GitHub Repo:** [github.com/akashdeveloper2006](https://github.com/akashdeveloper2006)  
📧 **Email:** akashrahul2006@gmail.com

---

## 🧠 Overview

**QUBIKO** is a real-time, production-grade AI assistant engineered with a modular backend, agentic AI workflows, and cloud scalability. It supports advanced code generation, automated reviews, intelligent responses, integrated payments, and a real-time experience built for modern developers.

It’s more than a project — it’s a system built with enterprise readiness, making it ideal for **students**, **freshers**, and **engineers** aiming for top-level full-stack or AI roles.

---

## ⚙️ Key Features

- ⚡ Real-time AI chat using **Socket.io (WebSocket)**
- 🤖 Agent-based architecture with **LangChain + LangGraph + Gemini 1.5 Flash**
- 🧠 Professional code generation & review workflows
- 🔐 **JWT-based authentication** with secure endpoints
- 🗑️ Auto-deletion of chats based on user-specific limit
- 💳 **Razorpay** payment gateway integration
- ☁️ Cloudinary image storage & serving
- 🖥️ Fully responsive UI with smooth UX
- 🚀 Deployed on Vercel (Frontend) and Render (Backend)

---

## 🔧 Upcoming Upgrades

- 🐳 **Docker**: Containerized, isolated deployments
- ⚡ **Redis**: For ultra-fast caching and session handling
- 🧩 **Microservices**: Modular and scalable backend split by domain
- 🛡️ **Rate Limiting & Queueing**: Smooth handling under high traffic
- 📊 **Admin Dashboard**: Manage users, payments, analytics

---

## 🧪 Tech Stack

### 🖥️ Frontend

- React.js
- Tailwind CSS
- Vite

### 🔗 Backend

- Node.js
- Express.js
- MongoDB

### 🤖 AI Workflow

- LangChain
- LangGraph
- Gemini 1.5 Flash (Google)

### 🔌 Real-Time

- WebSocket via Socket.io

### 🔐 Auth & Security

- JWT
- CORS
- Helmet

### 💳 Payments

- Razorpay Integration

### ☁️ Deployment & Storage

- Cloudinary (image hosting)
- Vercel (Frontend)
- Render (Backend)

### 🛠️ Planned Integrations

- Docker
- Redis
- Microservices

---

## 📁 Folder Structure

```plaintext
qubiko/
├── Backend/
│   ├── Config/
│   ├── controllers/
│   ├── Middlewares/
│   ├── Models/
│   ├── Routes/
│   ├── Services/
│   ├── Tools/
│   ├── websocket.js
│   ├── app.js
│   └── .env
├── Frontend/
│   ├── src/
│   │   ├── Api/
│   │   ├── assets/
│   │   ├── Authentication/
│   │   ├── Components/
│   │   ├── Context/
│   │   ├── Data/
│   │   ├── UI/
│   │   ├── Pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── App.css
│   │   ├── Prism.css
│   │   └── main.jsx
│   │
│   └── .env
└── package.json (workspace manager)
```

---

## 🛠️ Installation Setup

### Prerequisites

Ensure you have the following installed:

- Node.js (v16+ recommended)
- MongoDB (Local or Atlas)
- Vercel CLI (for deployment)

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/Dev-akash77/Qubiko.git
cd Qubiko
```

### 3️⃣ Configure Environment Variables

### Create a `.env` file in the backend root directory and add:

```env
PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
WEATHER_API_KEY=your_weather_api_key
GOOGLE_API_KEY=your_gemini_api_key
FRONTEND_URL=https://qubiko.vercel.app
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_SECRET=your_cloudinary_secret
SMTP_USER=your_smtp_email
SMTP_PASSWORD=your_smtp_password
SENDRE_EMAIL=your_sender_email
RAZOR_PAY_ID=your_razorpay_id
RAZOR_PAY_SECRET=your_razorpay_secret
CURRENCY=INR
```

---

### Create a `.env` file in the frontend root directory and add:

```env
VITE_BACKEND_URL=https://qubiko.vercel.app
VITE_RAZOR_PAY_ID=your_razorpay_id
```

### 4️⃣ Run the Project

#### Start Backend

```sh
cd backend
npm run dev
```

#### Start Frontend

```sh
cd frontend
npm run dv
```

---

## 🎯 Deployment

### Frontend Deployment on Vercel

```sh
cd frontend
vercel deploy
```

### Backend Deployment on Render

1. Push backend code to GitHub.
2. Go to [Render](https://render.com/), create a new web service.
3. Connect GitHub repo and deploy.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## ⭐ Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

```sh
git checkout -b feature-branch
git commit -m "New Feature Added"
git push origin feature-branch
```

---

## 💡 Future Enhancements

QUBIKO is constantly evolving, and there are several exciting features and improvements lined up to make it even more powerful and scalable:

- 🐳 **Docker**: Implementing containerized deployments for consistent development and production environments across different platforms.
- ⚡ **Redis**: Integrating Redis for ultra-fast caching, session management, and enhanced performance in real-time interactions.
- 🧩 **Microservices**: Splitting the backend into smaller, modular services to improve scalability, maintainability, and collaboration.
- 🛡️ **Rate Limiting & Queueing**: Adding mechanisms to efficiently handle high traffic loads and ensure smooth operation even under peak usage.
- 📊 **Admin Dashboard**: Developing an admin dashboard to manage user data, payment analytics, and real-time insights.
- 🔐 **Advanced Security Features**: Enhancing data protection through advanced encryption techniques, multi-factor authentication, and API security measures.
- 📈 **Analytics**: Incorporating real-time monitoring and analytics to track user behavior, system health, and performance.

These upgrades will ensure that Qubiko continues to serve as a comprehensive tool for developers, AI enthusiasts, and businesses while maintaining the flexibility to grow and adapt to future needs.

---

## 📌 Conclusion

**QUBIKO** is more than just a project; it’s a comprehensive, scalable AI assistant designed for real-world applications. By leveraging cutting-edge technologies like **LangChain**, **Google Gemini 1.5 Flash**, and **Socket.io**, Qubiko offers a robust solution for AI-driven interactions and real-time experiences.

This project showcases the essential skills needed for modern full-stack development, AI integration, secure authentication, cloud storage, and scalable deployments. Whether you're a student, fresher, or engineer, working on or contributing to Qubiko can significantly enhance your skill set and make you job-ready for top-tier roles in tech.

As Qubiko evolves with future upgrades like **Docker**, **Redis**, and **Microservices**, it will continue to push the boundaries of what a full-stack AI assistant can achieve. Stay tuned for upcoming enhancements and new features that will make Qubiko even more powerful and reliable.

---

**Feel free to explore, contribute, or take inspiration from this project for your own development journey!**

---
