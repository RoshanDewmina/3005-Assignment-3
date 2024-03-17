// Import the pg library
const { Pool } = require("pg");

// Configuration for connecting to the database
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "School",
  password: "Dewneth_2017",
  port: 5432,
});

//Function to create the table and insert data
async function createTable() {
  const client = await pool.connect();
  try {
    // Create the table if it doesn't already exist
    await client.query(
      "CREATE TABLE IF NOT EXISTS students (student_id SERIAL PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, enrollment_date DATE);"
    );

    // Insert data into the table
    await client.query(`
    INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES
    ('John', 'Doe', 'john.doe@example.com', '2023-09-01'),
    ('Jane', 'Smith', 'jane.smith@example.com', '2023-09-01'),
    ('Jim', 'Beam', 'jim.beam@example.com', '2023-09-02');
`);
  } finally {
    client.release();
  }
}
//Function to delete table
async function deleteTable() {
  const client = await pool.connect();
  try {
    await client.query("DROP TABLE students;");
  } finally {
    client.release();
  }
}

// Function to retrieve and print all students from the database
async function getAllStudents() {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT * FROM students;");
    console.log(res.rows);
  } finally {
    client.release();
  }
}

// Function to add a new student to the database
async function addStudent(first_name, last_name, email, enrollment_date) {
  const client = await pool.connect();
  try {
    await client.query(
      "INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES ($1, $2, $3, $4);",
      [first_name, last_name, email, enrollment_date]
    );
  } finally {
    client.release();
  }
}

// Function to update the email of a specific student
async function updateStudentEmail(student_id, new_email) {
  const client = await pool.connect();
  try {
    await client.query(
      "UPDATE students SET email = $1 WHERE student_id = $2;",
      [new_email, student_id]
    );
  } finally {
    client.release();
  }
}

// Function to delete a student from the database using their student_id
async function deleteStudent(student_id) {
  const client = await pool.connect();
  try {
    await client.query("DELETE FROM students WHERE student_id = $1;", [
      student_id,
    ]);
  } finally {
    client.release();
  }
}

//Function to clear all the data in the table
async function clearAllData() {
  const client = await pool.connect();
  try {
    await client.query("DELETE FROM students;");
  } finally {
    client.release();
  }
}

// Test the functions by calling them here ->
(async () => {
  // await createTable();
  // await getAllStudents();
  await addStudent('Alice', 'Wonderland', 'alice@example.com', '2023-10-01');
   await getAllStudents();
  // await updateStudentEmail(1, 'john.updated@example.com');
  // await deleteStudent(2);
  //  await clearAllData();
  // await deleteTable();
})();
