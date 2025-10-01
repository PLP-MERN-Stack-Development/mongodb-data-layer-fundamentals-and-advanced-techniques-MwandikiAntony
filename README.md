
# MongoDB Fundamentals - Week 1 

This assignment demonstrates how to work with MongoDB by inserting sample Kenyan secondary school books and running various queries, including CRUD operations, advanced queries, aggregation pipelines, and indexing.

---

## 📦 Prerequisites

- Install **MongoDB Community Server** and ensure it is running locally.
- Install **MongoDB Compass** (optional, GUI for exploring data).
- Install **Node.js** (for running the insert script).
- Install **mongosh** (MongoDB shell) if you want to run queries in the terminal.

---

## 📂 Project Structure
.
├── insert_books.js # Script to insert sample books
├── queries.js # MongoDB queries (CRUD, aggregation, indexing)
├── README.md # Documentation

---

## 🚀 How to Run

### 1. Insert Books into the Database
This script uses Node.js to insert 10 sample Kenyan secondary school curriculum books.

```bash
node insert_books.js


The script connects to mongodb://127.0.0.1:27017.

It inserts books into the library.books collection.

Output will confirm that books were inserted.

You can verify in MongoDB Compass:

Connect to mongodb://127.0.0.1:27017.

Open the library database → books collection.

You should see the inserted documents.

2. Run Queries

There are two ways to run the queries in queries.js:

a) Using MongoDB Compass

Open Compass.

Connect to your local MongoDB instance.

Go to library → books.

Open Playground.

Copy queries from queries.js and run them.

b) Using mongosh

Open terminal and start mongosh:

mongosh


Switch to the database:

use library


Then copy-paste queries from queries.js.

🛠 Tasks Covered
Task 2: Basic CRUD

Find books by genre, author, year.

Update book price.

Delete book by title.

Task 3: Advanced Queries

Find in-stock books published after 2010.

Projection (title, author, price only).

Sorting (ascending, descending).

Pagination (5 books per page).

Task 4: Aggregation Pipelines

Average price by genre.

Author with the most books.

Group by decade.

Task 5: Indexing

Index on title.

Compound index on author and published_year.

Use explain() to demonstrate performance.

✅ Example Query

Find all novels:

db.books.find({ genre: "Novel" })


Find books after 2010:

db.books.find({ published_year: { $gt: 2010 } })
