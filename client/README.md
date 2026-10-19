# ShopNest – Full-Stack E-commerce App

A full-stack online store built with the **MERN stack** (MongoDB, Express, React, Node.js). Users must **sign up or log in first**, and only then can they browse products, add them to the cart, place orders and view their order history.

**Live demo:** _add your Render link here after deployment_

## Features
- Login-first access: the shop, cart and orders are hidden until the user logs in
- Sign up, log in and log out with JWT authentication
- Product catalogue with search, category filter and price sorting
- Shopping cart with quantity control (saved in the browser between visits)
- Checkout that saves the order in MongoDB
- Order history for each user
- Responsive design that works on mobile and desktop

## Tech stack
| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, plain CSS |
| Backend | Node.js, Express |
| Database | MongoDB with Mongoose |
| Auth | bcrypt (password hashing), JSON Web Tokens |

## Security and design decisions
- Passwords are hashed with bcrypt and never stored in plain text
- Protected API routes verify the JWT on every request
- The server recalculates the order total from database prices, so users cannot change prices from the browser
- Input is validated on the server (email format, password length, quantity limits)
- Secrets live in a `.env` file that is not uploaded to GitHub

## Project structure
```
shopnest/
├── package.json
├── server/
│   ├── server.js          # app entry point
│   ├── seed.js            # adds 12 sample products
│   ├── config/db.js       # MongoDB connection
│   ├── models/            # User, Product, Order
│   ├── middleware/        # auth (JWT guard), wrap (error helper)
│   └── routes/            # auth, products, orders
└── client/
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── api.js
        ├── styles/main.css
        ├── context/AppContext.jsx   # auth, cart and toast state
        ├── components/              # Navbar, ProductCard, CartDrawer
        └── pages/                   # Login, Home, Orders
```

## API
| Method | Route | Login needed | Purpose |
|---|---|---|---|
| POST | /api/auth/signup | No | Create an account |
| POST | /api/auth/login | No | Log in and get a token |
| GET | /api/products | Yes | List products |
| POST | /api/orders | Yes | Place an order |
| GET | /api/orders | Yes | List my orders |

## Run locally
1. Install Node.js and MongoDB (or create a free MongoDB Atlas database).
2. Clone the repository and open the folder:
```bash
   git clone https://github.com/abhishekyadav70614/SHOP-NEST.git
   cd SHOP-NEST
```
3. Create a `.env` file in the main folder:
```
   MONGO_URI=mongodb://127.0.0.1:27017/shopnest
   JWT_SECRET=put-a-long-random-text-here
   PORT=5000
```
4. Install, build and start:
```bash
   npm install
   npm run build
   npm start
```
5. Open http://localhost:5000

## Deploy (Render + MongoDB Atlas)
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Environment variables: `MONGO_URI` (Atlas link) and `JWT_SECRET`

## Future improvements
Product detail page, ratings and reviews, delivery address, order status tracking, payment integration (Razorpay) and an admin panel.

## Author
Abhishek Yadav – [GitHub](https://github.com/abhishekyadav70614)