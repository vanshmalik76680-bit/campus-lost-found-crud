# 🔍 FindIt Campus — Lost & Found Board

A beginner-friendly full-stack **CRUD web application** built with:

- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas + Mongoose ODM
- **Frontend**: Pure HTML & CSS (served as static files by Express)

---

## 📁 Project Structure

```
campus-lost-found-crud/
├── models/
│   └── item.model.js         # Mongoose Schema & Model
├── controllers/
│   └── item.controller.js    # CRUD business logic
├── routes/
│   └── item.route.js         # Express Router (URL → Controller mapping)
├── public/
│   ├── index.html            # Single-page HTML dashboard
│   └── style.css             # Dark-mode glassmorphism CSS
├── .env                      # Environment variables (MONGO_URI, PORT)
├── .gitignore                # Ignores node_modules & .env
├── index.js                  # Main Express entry point
├── package.json              # Project metadata & dependencies
└── README.md                 # This file
```

---

## 🚀 Step 1 — Set Up MongoDB Atlas

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and **sign up** for a free account.
2. Click **"Build a Database"** → choose **Free (M0 Shared)** tier → pick any region.
3. Under **"Security"**, create a **Database User** (username + password). Save these!
4. Under **"Network Access"**, click **"Add IP Address"** → choose **"Allow Access from Anywhere"** (`0.0.0.0/0`) for development.
5. Once your cluster is ready, click **"Connect"** → **"Connect your application"** → copy the connection string. It will look like:
   ```
   mongodb+srv://<username>:<password>@cluster0.abc12.mongodb.net/?retryWrites=true&w=majority
   ```
6. Open the `.env` file in this project and replace the placeholder:
   ```env
   MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.abc12.mongodb.net/campusLostFound?retryWrites=true&w=majority
   PORT=3000
   ```
   > ⚠️ Replace `YOUR_USERNAME`, `YOUR_PASSWORD`, and the cluster hostname with your real values.
   > Also add the **database name** (`campusLostFound`) before the `?` in the URI.

---

## 💻 Step 2 — Install Dependencies & Run Locally

```bash
# 1. Navigate into the project folder
cd campus-lost-found-crud

# 2. Install all npm dependencies listed in package.json
npm install

# 3. Start the development server (with auto-restart via nodemon)
npm run dev

# 4. Open your browser and visit:
#    http://localhost:3000
```

You should see:
```
✅  Connected to MongoDB Atlas successfully.
🚀  Server is running at http://localhost:3000
📋  API Base URL: http://localhost:3000/api/items
```

---

## 🌐 API Endpoints — Reference

| # | Method   | Endpoint             | Description                     | Status Code |
|---|----------|----------------------|---------------------------------|-------------|
| 1 | `POST`   | `/api/items`         | Create a new lost/found item    | `201 Created` |
| 2 | `GET`    | `/api/items`         | Fetch all items (newest first)  | `200 OK` |
| 3 | `GET`    | `/api/items/:id`     | Fetch one item by MongoDB `_id` | `200 OK` / `404` |
| 4 | `PUT`    | `/api/items/:id`     | Update an item (e.g., status)   | `200 OK` |
| 5 | `DELETE` | `/api/items/:id`     | Delete an item permanently      | `200 OK` |

---

## 🧪 Step 3 — Testing with Postman

> [Postman](https://www.postman.com/downloads/) is a free API testing tool.

### 1. Create a New Item (`POST`)
- Method: `POST`
- URL: `http://localhost:3000/api/items`
- Go to **Body** tab → select **raw** → choose **JSON**
- Paste:
  ```json
  {
    "itemName": "Black Casio Watch",
    "category": "Electronics",
    "locationFound": "Central Library, 2nd Floor",
    "contactInfo": "Room A-102 / 9876543210"
  }
  ```
- Click **Send** → should return `201 Created` with the new document (including `_id`).

### 2. Get All Items (`GET`)
- Method: `GET`
- URL: `http://localhost:3000/api/items`
- Click **Send** → returns a JSON array of all items.

### 3. Get One Item (`GET`)
- Method: `GET`
- URL: `http://localhost:3000/api/items/<paste_id_here>`
- Replace `<paste_id_here>` with a real `_id` from the previous response.

### 4. Update an Item (`PUT`)
- Method: `PUT`
- URL: `http://localhost:3000/api/items/<paste_id_here>`
- Body (raw JSON):
  ```json
  { "status": "Claimed" }
  ```
- Returns the updated document.

### 5. Delete an Item (`DELETE`)
- Method: `DELETE`
- URL: `http://localhost:3000/api/items/<paste_id_here>`
- Returns `{ "message": "Item deleted successfully." }`.

---

## 📤 Step 4 — Push to GitHub

```bash
# Inside the project folder:

# 1. Initialise a git repository
git init

# 2. Stage all files (.gitignore will automatically exclude node_modules & .env)
git add .

# 3. Make your first commit
git commit -m "Initial commit: FindIt Campus Lost & Found CRUD App"

# 4. Create a new repository on GitHub (https://github.com/new)
#    Copy the remote URL provided, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 5. Push to GitHub
git branch -M main
git push -u origin main
```

> **Important**: Never commit your `.env` file. The `.gitignore` already excludes it.
> When deploying or sharing, set environment variables directly on the hosting platform.

---

## 📖 Key Concepts Explained (Viva Reference)

| Concept | Explanation |
|---------|-------------|
| **Mongoose Schema** | Blueprint that defines the shape and validation rules for MongoDB documents |
| **Mongoose Model** | JS class generated from the Schema; used to query and manipulate the collection |
| **`async/await`** | Modern JS syntax to write asynchronous (non-blocking) code that looks synchronous |
| **`try/catch`** | Error handling: code in `try` runs normally; if it throws, `catch` handles the error |
| **`req.body`** | Data sent by the client in the HTTP request body (parsed by `express.json()`) |
| **`req.params.id`** | URL parameter (e.g., `:id` in `/api/items/:id`) extracted from the URL path |
| **`res.status(201).json(...)`** | Sets HTTP status code and sends a JSON response to the client |
| **`findByIdAndUpdate`** | Mongoose method to find a document by `_id` and update fields atomically |
| **`{ new: true }`** | Option for `findByIdAndUpdate` that returns the updated document (not the original) |
| **`express.static`** | Middleware that serves static files (HTML, CSS, images) from a folder |
| **`dotenv`** | Library that loads variables from `.env` file into `process.env` |
| **fetch API** | Browser built-in method to make HTTP requests from JavaScript |

---

## 🎓 Technologies Used

- **Node.js** — JavaScript runtime (server-side)
- **Express.js** — Web framework for Node.js
- **MongoDB Atlas** — Cloud-hosted NoSQL database
- **Mongoose** — ODM (Object Document Mapper) for MongoDB
- **dotenv** — Loads environment variables from `.env`
- **nodemon** — Auto-restarts server on file changes (development only)
- **HTML5 + CSS3** — Frontend markup and styling (no frameworks)
- **Fetch API** — Browser built-in HTTP client for CRUD operations
