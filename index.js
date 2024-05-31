import express from 'express';
import jimp from 'jimp';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const __dirname = path.resolve();
const app = express();
const PORT = 3002;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(path.join(__dirname, 'public'), 'index.html'));
});

app.get('/loadImage', async (req, res) => {
    const { imagen } = req.query;
    console.log(req.query)
    const nombreImagen = `${uuidv4().slice(30)}.jpeg`;
    const imagePath = path.join(path.join(__dirname, 'public'), nombreImagen);

    try {
        const image = await jimp.read(imagen);
        await image.resize(350, jimp.AUTO).grayscale().writeAsync(imagePath);
        res.sendFile(imagePath);
    } catch (error) {
        console.log('Error processing image:');
        res.status(500).json({ error: 'Error processing image' });
    }
});