const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'PATCH', 'POST', 'DELETE'],
    credentials: true
})); // Enable CORS for frontend requests

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//file upload
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setup multer for handling file uploads
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Include file extension
    }
});

const upload = multer({ storage: storage });

// File upload route
app.post('/image', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
    }
    // Get the file path
    const filePath = path.join(uploadDir, req.file.filename);

    // Return the file path
    res.status(200).json({
        message: 'File uploaded successfully!',
        filePath: filePath
    });
});

//file upload