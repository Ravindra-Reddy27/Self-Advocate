const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const AWS = require('aws-sdk');
const multer = require('multer');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// AWS S3 Configuration
const s3 = new AWS.S3(); // IAM role will provide credentials

// Multer setup for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB
    }
});

// MySQL Connection
const db = mysql.createConnection({
    host: 'login-database.cs1q4aq2kxau.us-east-1.rds.amazonaws.com', // Replace with your RDS endpoint
    user: 'admin_ravi',   // Replace with your RDS username
    password: 'Ravi2005Ravi', // Replace with your RDS password
    database: 'webapp_db'      // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to RDS:', err);
        return;
    }
    console.log('Connected to RDS successfully!');
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Home.html'));
});

// Signup Route
app.post('/signup', (req, res) => {
    const { fullName, mobileNumber, email, password } = req.body;
    const query = 'INSERT INTO users (fullName, mobileNumber, email, password) VALUES (?, ?, ?, ?)';

    db.query(query, [fullName, mobileNumber, email, password], (err, result) => {
        if (err) {
            console.error('Error signing up:', err);
            return res.status(500).send('Error signing up');
        }
        res.status(200).send('Signup successful!');
    });
});

// Login Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error logging in:', err);
            return res.status(500).send('Error logging in');
        }
        if (results.length > 0) {
            res.status(200).json({ message: 'Login successful!' });
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

// File Upload Route
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const params = {
        Bucket: 'backend-uploads-selfadvocate', // Replace with your S3 bucket name
        Key: `${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read' // Make the file publicly accessible
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.error('Error uploading to S3:', err);
            return res.status(500).send('Error uploading file');
        }
        res.status(200).json({ message: 'File uploaded successfully!', location: data.Location });
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
});
