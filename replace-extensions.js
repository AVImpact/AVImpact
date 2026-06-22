import fs from "fs";
import path from "path";

const srcDir = "./src";

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const images = [
  "boardroom_after", "boardroom_before", "boardroom_curved", "boardroom_hero",
  "broadcast_summit", "classroom_interactive", "logo", "project_boardroom",
  "project_broadcast", "project_classroom", "project_lobby", "project_presentation",
  "residential_cinema"
];

walkDir(srcDir, (filePath) => {
  if (!filePath.endsWith(".ts") && !filePath.endsWith(".tsx")) return;
  
  let content = fs.readFileSync(filePath, "utf8");
  let updated = false;
  
  for (const img of images) {
    const regex = new RegExp(`/assets/${img}\\.png`, "g");
    if (regex.test(content)) {
      content = content.replace(regex, `/assets/${img}.webp`);
      updated = true;
      console.log(`Replaced /assets/${img}.png in ${filePath}`);
    }
  }
  
  if (updated) {
    fs.writeFileSync(filePath, content, "utf8");
  }
});
