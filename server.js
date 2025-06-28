const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Konfigurasi penyimpanan file dalam memori
const storage = multer.memoryStorage();
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

    // Simulasi URL file yang diupload
    const fileUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    res.json({ status: 'success', fileUrl: fileUrl });
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
