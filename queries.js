// -------------------------
// Task 2: Basic CRUD Queries
// -------------------------

// 1. Find all books in a specific genre
db.books.find({ genre: "Novel" })

// 2. Find books published after a certain year.
db.books.find({ published_year: { $gt: 2010 } })

// 3. Find books by a specific author.
db.books.find({ author: "Paul B. Vitta" })

// 4. Update the price of a specific book.
db.books.updateOne(
  { title: "Fathers of Nations" },
  { $set: { price: 800 } }
)

// 5. Delete a book by its title.
db.books.deleteOne({ title: "Cheche za Moto" })

// -------------------------
// Task 3: Advanced Queries
// -------------------------

// 1. Find books that are both in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// 2. Use projection to return only the title, author, and price fields
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
)

// 3. Sorting by price ascending
db.books.find().sort({ price: 1 })

// 4. Sorting by price descending
db.books.find().sort({ price: -1 })

// 5. Pagination: 5 books per page
// Page 1 (first 5)
db.books.find().limit(5)
// Page 2 (skip first 5, then show next 5)
db.books.find().skip(5).limit(5)

// -------------------------
// Task 4: Aggregation Pipelines
// -------------------------

// 1. Average price of books by genre.
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

// 2. Author with the most books.
db.books.aggregate([
  { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
])

// 3. Group books by publication decade and count them.
db.books.aggregate([
  {
    $group: {
      _id: { $subtract: [ { $divide: ["$published_year", 10] }, { $mod: [{ $divide: ["$published_year", 10] }, 1] } ] },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $multiply: ["$_id", 10] },
      count: 1,
      _id: 0
    }
  },
  { $sort: { decade: 1 } }
])

// -------------------------
// Task 5: Indexing
// -------------------------

// 1. Create an index on the title field.
db.books.createIndex({ title: 1 })

// 2. Create a compound index on author and published_year.
db.books.createIndex({ author: 1, published_year: -1 })

// 3. Use explain() to show performance improvement.
db.books.find({ title: "Fathers of Nations" }).explain("executionStats")
