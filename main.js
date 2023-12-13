const tesseract = require("node-tesseract-ocr")
const sharp = require('sharp');
async function ocr(imageBuffer) {
  const text = await tesseract.recognize(imageBuffer);
  return text;
}


async function processImage(path) {
  const processedBuffer = await sharp(path)
    .greyscale() // make it greyscale
    .linear(1.5, 0) // increase the contrast
    .png({colors:2}) // reduce image to two colors
    .png()
    .toBuffer();
  return processedBuffer;
}

async function findQuote(path) {
  return await ocr(await processImage(path));
}

findQuote('images/images3.png')
