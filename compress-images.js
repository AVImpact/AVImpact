import sharp from "sharp";
import fs from "fs";
import path from "path";

const assetsDir = "./public/assets";

async function compress() {
  const files = fs.readdirSync(assetsDir);
  for (const file of files) {
    if (!file.endsWith(".png")) continue;
    
    const inputPath = path.join(assetsDir, file);
    const outputName = file.replace(".png", ".webp");
    const outputPath = path.join(assetsDir, outputName);
    
    console.log(`Processing ${file}...`);
    
    let pipeline = sharp(inputPath);
    
    if (file === "logo.png") {
      // Logo asset: resize if too large, and compress heavily
      pipeline = pipeline.resize(400).webp({ quality: 80, effort: 6 });
    } else if (file.includes("hero") || file.includes("interactive")) {
      // Hero image: target < 300KB
      pipeline = pipeline.resize(1920, null, { withoutEnlargement: true }).webp({ quality: 75, effort: 6 });
    } else {
      // General asset: target < 200KB
      pipeline = pipeline.resize(1200, null, { withoutEnlargement: true }).webp({ quality: 75, effort: 6 });
    }
    
    await pipeline.toFile(outputPath);
    const stats = fs.statSync(outputPath);
    console.log(`Saved ${outputName} (${(stats.size / 1024).toFixed(1)} KB)`);
  }
}

compress().catch(console.error);
