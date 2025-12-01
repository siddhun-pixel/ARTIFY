# Artify – AI Image Generator 🎨

Artify is a full-stack AI Image Generation web application built using **Node.js**, **Express**, **MongoDB**, **React**, and **Cloudinary**.  
It allows users to generate images from text prompts using AI models and download/share them easily.

---

## 🚀 Features

- Text-to-Image Generation  
- Save Generated Images  
- Download Images  
- Beautiful UI with responsive design  
- Cloud image storage using **Cloudinary**  
- Backend API using **Express.js**

---

## 🛠️ Tech Stack

### **Frontend**
- React.js  
- HTML / CSS  
- JavaScript  

### **Backend**
- Node.js  
- Express.js  

### **Database**
- MongoDB  

### **Cloud Storage**
- Cloudinary  

---

## 📂 Folder Structure

```
project/
 ├── backend/
 │    ├── app.js
 │    ├── models/
 │    ├── routes/
 │    ├── .env
 │    └── package.json
 ├── frontend/
 │    ├── index.html
 │    ├── src/
 │    ├── style.css
 │    └── script.js
 └── README.md
```

---

## 🔧 Installation & Setup

### **1. Clone the repository**
```bash
git clone https://github.com/your-username/artify.git
```

### **2. Install backend dependencies**
```bash
cd backend
npm install
```

### **3. Install frontend dependencies (if any)**
```bash
cd frontend
npm install
```

### **4. Environment Variables (.env)**  
Create a `.env` file inside the *backend* folder:

```
MONGODB_URL=your_mongodb_url
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
PORT=5000
```

---

## ▶️ Running the App

### **Start Backend**
```bash
cd backend
npm start
```

### **Start Frontend**
If using a simple HTML/JS/CSS frontend, open the `index.html` in browser.

---

## 🌐 Deployment

For deploying backend to **Render/Heroku**, create a **Procfile**:

```
web: node app.js
```

For frontend, upload files to **Netlify** or **Vercel**.

---

## 📜 License
This project is licensed under the MIT License.

---

## 👨‍💻 Developer
**Sidhan Goud**

If you want a professional README with screenshots, badges, and setup GIF, tell me — I’ll make it!
