import { Jimp } from "jimp";
import fs from "fs";
import path from "path";

const inDir = "screenshots";
const outDir = "wireframes";

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
}

const files = fs.readdirSync(inDir).filter(f => f.endsWith('.png'));

async function processImage(file) {
    try {
        const image = await Jimp.read(path.join(inDir, file));
        // Convert to grayscale like a wireframe
        image.greyscale();
        // Slightly increase contrast to emphasize lines
        image.contrast(0.2);
        
        await image.write(path.join(outDir, file));
        console.log(`Converted ${file} to wireframe format`);
    } catch (err) {
        console.error(`Error processing ${file}:`, err);
    }
}

async function run() {
    for (const file of files) {
        await processImage(file);
    }
    console.log('All screenshots converted to wireframes.');
}

run();
