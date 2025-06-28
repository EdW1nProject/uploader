const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Membuat folder uploads jika belum ada
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Folder untuk menyimpan file yang diupload
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Menambahkan timestamp ke nama file
    }
});

const upload = multer({ storage: storage });

// Menyajikan file HTML dari folder public
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint untuk mengupload file
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: 'error', message: 'Tidak ada file yang diupload.' });
    }
    const fileUrl = `https://edwin-uploader.vercel.app/uploads/${req.file.filename}`;
    res.json({ status: 'success', fileUrl: fileUrl });
});

// Menyajikan file statis dari folder uploads
app.use('/upload/uploads', express.static(uploadDir));

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
