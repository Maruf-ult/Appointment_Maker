# 🩺 Appointment Maker

## 🔗 Live Link  
https://appointment-maker-1.onrender.com

## 📌 Description  
**Appointment Maker** is a full-featured MERN stack web application designed to streamline the process of **booking and managing doctor appointments**. Patients can register, explore available doctors, book appointments, and receive email notifications. Doctors have access to a personal dashboard to update availability, manage patient bookings, and communicate effectively. An integrated **Admin Panel** handles authentication for doctors and provides tools to manage users and appointments — all wrapped in a **secure, responsive, and role-based** system.

## ✨ Features  
- 🧑‍⚕️ Patients can register, log in, browse doctors, and schedule appointments  
- 📅 Doctors can set availability, view appointments, and manage patients  
- 🛡️ Role-based access for patients, doctors, and admins  
- 📧 Notifications sent to users for appointment booking and status updates  
- 🛠️ Admin dashboard to verify doctors and manage users  
- 🔐 JWT-based authentication and Redux Toolkit for state management  
- 📱 Responsive and user-friendly UI

## 🛠️ Technologies Used  
- **React.js** – Frontend library  
- **Node.js** – Backend runtime  
- **Express.js** – RESTful API framework  
- **MongoDB** – NoSQL database  
- **Redux Toolkit** – State management  
- **JWT & bcrypt.js** – Authentication and encryption  
- **Mongoose** – Database ORM  
- **React Router** – Frontend navigation

## ⚙️ Installation

1. **Clone the repository**  
   ```
   git clone https://github.com/Maruf-ult/Appointment_Maker
   ```
   
2. Open the terminal in the repository folder:
 
   ```
   cd Appointment_Maker
    ```

3. Install backend dependencies:

   ```
   cd server_site
   npm install
    ```

4. Install frontend dependencies:
   
   ```
   cd client_site
   npm install
     ```
5. Configure environment variables
     Create a .env file in the server directory with the following:
   
     ```
         MONGO_URI=your_mongo_connection
         JWT_SECRET=your_jwt_secret
     ```

6. Run the backend application:
   
   ```
   cd server_site
   npm start
   ```
   
7. Run the frontend application:
   
   ```
   cd client_site
   npm run dev
   ```   

   
Feel free to adapt this template to your project's specific requirements. Happy coding! 🚀

: GitHub - Maruf-ult/Appointment_Maker


   
