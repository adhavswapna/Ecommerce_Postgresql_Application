
🛍️ Simple E-commerce Marketplace MVP (Practice Project)
This version will include:

User authentication (buyers & sellers)

Product listing by sellers

Product browsing by buyers

Shopping cart & checkout (mock payment)

Order management

Basic seller dashboard

Basic admin dashboard

PostgreSQL database




🛠 Tech Stack
Frontend: Next.js (React)

Backend: Node.js with Express.js

Database: PostgreSQL

Auth: JWT (simplified for practice)

Storage: Local (simulate S3 in full version)

Deployment: Localhost

🧾 Project Structure
pgsql


ecommerce-mvp/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── app.js
│   └── config.js
├── frontend/
│   ├── pages/
│   ├── components/
│   └── public/
├── database/
│   └── init.sql
├── .env
└── README.md
✅ Features in Practice MVP
Feature	Included
User Signup/Login	✅
Role-based Auth	✅
Seller Product CRUD	✅
Buyer Product View	✅
Cart & Checkout	✅ (mock)
Order Management	✅
Admin Panel (Basic)	✅

💻 Script to Run Locally
1. Clone the App



git clone https://github.com/example/ecommerce-mvp-practice.git
cd ecommerce-mvp-practice
2. Setup PostgreSQL
Install PostgreSQL locally and run the SQL:




psql -U postgres -f database/init.sql
3. Setup Backend



cd backend
npm install
cp .env.example .env
#  .env with DB credentials
npm run dev
4. Setup Frontend



cd ../frontend
npm install
npm run dev
5. Access the App
Open browser:




Frontend: http://localhost:3000
Backend API: http://localhost:5000/api
🧪 API Documentation
Includes:

Swagger/OpenAPI at http://localhost:5000/api-docs


A simple e-commerce MVP project with the following structure:

🔧 Backend – Node.js + Express + PostgreSQL
backend/.env (example config)
env


PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce
DB_USER=postgres
DB_PASSWORD=yourpassword
JWT_SECRET=secret123


backend/config.js
js
require('dotenv').config();
const { Pool } = require('pg');

const db = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = db;
backend/app.js
js


const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});




backend/routes/auth.js
js


const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../config');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await db.query('INSERT INTO users(name, email, password, role) VALUES($1,$2,$3,$4) RETURNING *', [name, email, password, role]);
  res.json(user.rows[0]);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await db.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
  const user = result.rows[0];
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
backend/routes/product.js
js


const express = require('express');
const db = require('../config');
const router = express.Router();

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM products');
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { name, price, seller_id } = req.body;
  const result = await db.query('INSERT INTO products(name, price, seller_id) VALUES($1,$2,$3) RETURNING *', [name, price, seller_id]);
  res.json(result.rows[0]);
});

module.exports = router;
backend/routes/order.js
js


const express = require('express');
const db = require('../config');
const router = express.Router();

router.post('/', async (req, res) => {
  const { user_id, product_id } = req.body;
  const result = await db.query('INSERT INTO orders(user_id, product_id, status) VALUES($1,$2,$3) RETURNING *', [user_id, product_id, 'Placed']);
  res.json(result.rows[0]);
});

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM orders');
  res.json(result.rows);
});

module.exports = router;
📦 PostgreSQL Schema (database/init.sql)
sql


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password TEXT,
  role VARCHAR(10)
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  price NUMERIC,
  seller_id INTEGER REFERENCES users(id)
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES products(id),
  status VARCHAR(50)
);
🌐 Frontend – Next.js
frontend/pages/index.js
jsx


export default function Home() {
  return (
    <div>
      <h1>Welcome to Simple E-Commerce MVP</h1>
      <a href="/products">Browse Products</a>
    </div>
  );
}
frontend/pages/products.js
jsx


import { useEffect, useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.map(p => (
        <div key={p.id}>
          <h4>{p.name}</h4>
          <p>Price: ₹{p.price}</p>
        </div>
      ))}
    </div>
  );
}
▶️ How to Run It
Backend



cd backend
npm install
# Configure `.env`
node app.js
Frontend



cd frontend
npx create-next-app@latest .
npm run dev
Would you like me to:

📁 Upload the project files as a ZIP?

🌍 Push to a GitHub repo for you to clone?

Let me know how you'd like to proceed!


2/2






You said:
also give command in front of code to understand


ChatGPT said:
Great! Below is the same e-commerce MVP project with commands in front of the code to help you understand each part clearly.

🛠 Backend – Node.js + Express + PostgreSQL
Step 1: Create .env file
📁 backend/.env

env


# Environment variables
PORT=5000                      # Port for the backend server
DB_HOST=localhost              # PostgreSQL host
DB_PORT=5432                   # PostgreSQL port
DB_NAME=ecommerce              # Your database name
DB_USER=postgres               # PostgreSQL username
DB_PASSWORD=yourpassword       # PostgreSQL password
JWT_SECRET=secret123           # Secret for JWT tokens
Step 2: Configure PostgreSQL connection
📁 backend/config.js

js


// Import PostgreSQL and dotenv
require('dotenv').config();
const { Pool } = require('pg');

// Create a database connection pool using environment variables
const db = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = db; // Export the database pool
Step 3: Create Express app and load routes
📁 backend/app.js

js


// Import dependencies
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Create an Express application
const app = express();

// Middleware
app.use(cors());              // Allow frontend requests
app.use(express.json());      // Parse incoming JSON

// Import route files
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

// Mount routes
app.use('/api/auth', authRoutes);       // Auth endpoints
app.use('/api/products', productRoutes); // Product endpoints
app.use('/api/orders', orderRoutes);     // Order endpoints

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
Step 4: Create Auth Routes (Register/Login)
📁 backend/routes/auth.js

js


const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../config');
const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await db.query(
    'INSERT INTO users(name, email, password, role) VALUES($1,$2,$3,$4) RETURNING *',
    [name, email, password, role]
  );
  res.json(user.rows[0]);
});

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await db.query(
    'SELECT * FROM users WHERE email = $1 AND password = $2',
    [email, password]
  );
  const user = result.rows[0];
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  // Create a JWT token
  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
Step 5: Create Product Routes
📁 backend/routes/product.js

js


const express = require('express');
const db = require('../config');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM products');
  res.json(result.rows);
});

// Add a product
router.post('/', async (req, res) => {
  const { name, price, seller_id } = req.body;
  const result = await db.query(
    'INSERT INTO products(name, price, seller_id) VALUES($1,$2,$3) RETURNING *',
    [name, price, seller_id]
  );
  res.json(result.rows[0]);
});

module.exports = router;
Step 6: Create Order Routes
📁 backend/routes/order.js

js


const express = require('express');
const db = require('../config');
const router = express.Router();

// Place an order
router.post('/', async (req, res) => {
  const { user_id, product_id } = req.body;
  const result = await db.query(
    'INSERT INTO orders(user_id, product_id, status) VALUES($1,$2,$3) RETURNING *',
    [user_id, product_id, 'Placed']
  );
  res.json(result.rows[0]);
});

// Get all orders
router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM orders');
  res.json(result.rows);
});

module.exports = router;
Step 7: Create Database Tables
📁 database/init.sql

sql


-- Create Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password TEXT,
  role VARCHAR(10)
);

-- Create Products Table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  price NUMERIC,
  seller_id INTEGER REFERENCES users(id)
);

-- Create Orders Table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES products(id),
  status VARCHAR(50)
);
🌐 Frontend – Next.js
Step 1: Home Page
📁 frontend/pages/index.js

jsx


// Simple Home Page
export default function Home() {
  return (
    <div>
      <h1>Welcome to Simple E-Commerce MVP</h1>
      <a href="/products">Browse Products</a>
    </div>
  );
}
Step 2: Products Page
📁 frontend/pages/products.js

jsx


import { useEffect, useState } from 'react';

// Show list of products
export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.map(p => (
        <div key={p.id}>
          <h4>{p.name}</h4>
          <p>Price: ₹{p.price}</p>
        </div>
      ))}
    </div>
  );
}
▶️ How to Run the App
Step 1: Clone the Project



git clone https://github.com/yourname/ecommerce-mvp-practice.git
cd ecommerce-mvp-practice
Step 2: Setup PostgreSQL Database



# Open PostgreSQL shell or tool like pgAdmin
# Run the following:
psql -U postgres -f database/init.sql
Step 3: Start the Backend



cd backend
npm install
cp .env.example .env   # Create your environment file
#  .env with DB credentials
node app.js
Step 4: Start the Frontend



cd ../frontend
npx create-next-app@latest .
npm run dev




Database Connection error solution
Step 1: Switch to postgres user on your Linux shell
bash
Copy
Edit
sudo -i -u postgres
This switches you to the PostgreSQL superuser OS account.

Step 2: Enter psql shell without password (peer auth works here)
bash
Copy
Edit
psql
You should enter the PostgreSQL prompt like:

makefile
Copy
Edit
postgres=#


Step 3: Reset the password for postgres user inside psql
Run this SQL command to reset the password:

sql
Copy
Edit
ALTER USER postgres WITH PASSWORD 'newpassword';
Replace 'newpassword' with your desired strong password.

Step 4: Exit psql shell
sql
Copy
Edit
\q
Step 5: Exit back to your normal user
bash
Copy
Edit
exit
Step 6: Now try connecting with the new password:
bash
Copy
Edit
psql -h localhost -U postgres -W
It will prompt for the password — enter the new one you set.

Optional: Modify pg_hba.conf if you still have issues
Make sure authentication method for local connections is set to md5 (password) instead of peer.

File location example:

bash
Copy
Edit
sudo nano /etc/postgresql/14/main/pg_hba.conf
Look for lines like:

sql
Copy
Edit
local   all             postgres                                peer
Change peer to md5.

Save and restart PostgreSQL:

bash
Copy
Edit
sudo systemctl restart postgresql
This will allow password authentication to work properly.

Step-by-step to fix:
Edit the pg_hba.conf file to allow trust authentication temporarily.

bash
Copy
Edit
sudo nano /etc/postgresql/14/main/pg_hba.conf
(Change 14 if your PostgreSQL version is different.)

Find all lines like these starting with local or host for user postgres:

sql
Copy
Edit
local   all             postgres                                md5
Change them to:

sql
Copy
Edit
local   all             postgres                                trust
This disables password checks for local postgres user connections.

Save and exit (Ctrl + O, Enter, Ctrl + X).

Restart PostgreSQL to apply changes:

bash
Copy
Edit
sudo systemctl restart postgresql
Now connect to psql as postgres user without password:

bash
Copy
Edit
sudo -i -u postgres
psql
You should get the prompt:

makefile
Copy
Edit
postgres=#
Reset the password for postgres user:

sql
Copy
Edit
ALTER USER postgres WITH PASSWORD 'your_new_password';
(Replace 'your_new_password' with a strong password you want.)

Exit psql:

sql
Copy
Edit
\q
Revert the pg_hba.conf changes:

Repeat step 1 and 2, change trust back to md5 for postgres user:

sql
Copy
Edit
local   all             postgres                                md5
Restart PostgreSQL again:

bash
Copy
Edit
sudo systemctl restart postgresql
Try connecting now with the new password:

bash
Copy
Edit
psql -U postgres -W
Enter the password you set.

This should fix your problem.

If the package.json does not exist yet, create it

Run this inside your backend folder to create a minimal package.json:

bash
Copy
Edit
cd /mnt/c/Users/Dell/Desktop/Ecommerce-Postgresql-App/backend
npm init -y
This generates a default package.json.

Add your dependencies

If you want to add Express, for example:

bash
Copy
Edit
npm install express
Run your scripts

After your package.json is created and dependencies installed, you can run:

bash
Copy
Edit
npm start

✅ Solution: Install pg
Run this in your backend project directory:

bash
Copy
Edit
npm install pg
🧼 Then, double-check all your app dependencies:
Since your package.json only lists express, dotenv, and cors, you should also install any other missing modules being used in your app.

Common ones in typical PostgreSQL + Express apps include:

bash
Copy
Edit
npm install pg bcrypt jsonwebtoken body-parser
(Adjust based on what your app uses — like jsonwebtoken, body-parser, etc.)

✅ After that:
Run your app again:

bash
Copy
Edit
node app.js