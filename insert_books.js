// insert_books.js - Script to populate MongoDB with sample book data

// Import MongoDB client
const { MongoClient } = require('mongodb');

// Connection URI (replace with your MongoDB connection string if using Atlas)
const uri = 'mongodb://localhost:27017';

// Database and collection names
const dbName = 'plp_bookstore';
const collectionName = 'books';

// insert_books.js
const books =[
  {
    title: "Fathers of Nations",
    author: "Paul B. Vitta",
    genre: "Literature in English",
    published_year: 2013,
    price: 900,
    in_stock: true,
    pages: 290,
    publisher: "Oxford University Press"
  },
  {
    title: "The Samaritan",
    author: "John Lara",
    genre: "Drama",
    published_year: 2005,
    price: 850,
    in_stock: true,
    pages: 180,
    publisher: "East African Publishers"
  },
  {
    title: "A Silent Song and Other Stories",
    author: "Edited by Godwin Siundu",
    genre: "Anthology",
    published_year: 2010,
    price: 750,
    in_stock: true,
    pages: 220,
    publisher: "Longhorn Publishers"
  },
  {
    title: "Artist of the Floating World",
    author: "Kazuo Ishiguro",
    genre: "Novel",
    published_year: 1986,
    price: 1000,
    in_stock: false,
    pages: 206,
    publisher: "Faber and Faber"
  },
  {
    title: "Parliament of Owls",
    author: "Adipo Sidang",
    genre: "Drama",
    published_year: 2016,
    price: 700,
    in_stock: true,
    pages: 150,
    publisher: "East African Educational Publishers"
  },
  {
    title: "Cheche za Moto",
    author: "John Habwe",
    genre: "Kiswahili Novel",
    published_year: 2018,
    price: 650,
    in_stock: true,
    pages: 260,
    publisher: "JKF"
  },
  {
    title: "Bembea",
    author: "Timothy Moriasi",
    genre: "Kiswahili Play",
    published_year: 2019,
    price: 700,
    in_stock: true,
    pages: 170,
    publisher: "East African Publishers"
  },
  {
    title: "Mapambazuko ya Machweo na Hadithi Nyingine",
    author: "Anthology (KICD approved)",
    genre: "Kiswahili Short Stories",
    published_year: 2020,
    price: 600,
    in_stock: true,
    pages: 210,
    publisher: "Longhorn Publishers"
  },
  {
    title: "Strange Happenings",
    author: "Jennie Marima",
    genre: "Junior Secondary English",
    published_year: 2021,
    price: 500,
    in_stock: true,
    pages: 140,
    publisher: "Storymoja"
  },
  {
    title: "Mji wa Matarajio",
    author: "Assumpta K. Matei",
    genre: "Junior Secondary Kiswahili",
    published_year: 2021,
    price: 550,
    in_stock: false,
    pages: 160,
    publisher: "JKF"
  }
];

// Function to insert books into MongoDB
async function insertBooks() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB server');

    // Get database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Check if collection already has documents
    const count = await collection.countDocuments();
    if (count > 0) {
      console.log(`Collection already contains ${count} documents. Dropping collection...`);
      await collection.drop();
      console.log('Collection dropped successfully');
    }

    // Insert the books
    const result = await collection.insertMany(books);
    console.log(`${result.insertedCount} books were successfully inserted into the database`);

    // Display the inserted books
    console.log('\nInserted books:');
    const insertedBooks = await collection.find({}).toArray();
    insertedBooks.forEach((book, index) => {
      console.log(`${index + 1}. "${book.title}" by ${book.author} (${book.published_year})`);
    });

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

// Run the function
insertBooks().catch(console.error);

/*
 * Example MongoDB queries you can try after running this script:
 *
 * 1. Find all books:
 *    db.books.find()
 *
 * 2. Find books by a specific author:
 *    db.books.find({ author: "George Orwell" })
 *
 * 3. Find books published after 1950:
 *    db.books.find({ published_year: { $gt: 1950 } })
 *
 * 4. Find books in a specific genre:
 *    db.books.find({ genre: "Fiction" })
 *
 * 5. Find in-stock books:
 *    db.books.find({ in_stock: true })
 */ 
