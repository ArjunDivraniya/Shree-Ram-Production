const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

const targetDirs = [
  path.join(__dirname, '../public/images/graphic_designing'),
  path.join(__dirname, '../public/images/development_project')
];

for (const imgDir of targetDirs) {
  if (!fs.existsSync(imgDir)) continue;
  const dirName = path.basename(imgDir);
  const backupDir = path.join(imgDir, 'original_backup');
  const webpDir = path.join(imgDir, 'webp');

  [backupDir, webpDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  const files = fs.readdirSync(imgDir).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return (ext === '.jpeg' || ext === '.jpg' || ext === '.png') && !f.startsWith('.');
  });

  console.log(`\n======================================================`);
  console.log(`🎨 Shree Ram Production — Image Optimizer: ${dirName}`);
  console.log(`Found ${files.length} images in ${imgDir}`);
  console.log(`======================================================\n`);

  let totalOriginalBytes = 0;
  let totalWebpBytes = 0;

  for (const file of files) {
    const baseName = path.parse(file).name;
    const sourcePath = path.join(imgDir, file);
    const backupPath = path.join(backupDir, file);
    const webpPath = path.join(webpDir, `${baseName}.webp`);

    const initialStat = fs.statSync(sourcePath);
    totalOriginalBytes += initialStat.size;

    // 1. Back up original
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(sourcePath, backupPath);
    }

    // 2. Generate high-quality WebP (skip if already exists)
    if (fs.existsSync(webpPath) && fs.statSync(webpPath).size > 0) {
      const existingWebpStat = fs.statSync(webpPath);
      totalWebpBytes += existingWebpStat.size;
      continue;
    }

    try {
      execSync(
        `"${ffmpeg}" -y -i "${sourcePath}" -vf "scale='min(1600,iw)':-2" -q:v 82 "${webpPath}"`,
        { stdio: 'pipe' }
      );
      const webpStat = fs.statSync(webpPath);
      totalWebpBytes += webpStat.size;

      const savedPercent = (((initialStat.size - webpStat.size) / initialStat.size) * 100).toFixed(1);
      console.log(
        `✓ ${file} -> webp/${baseName}.webp: ${(initialStat.size / 1024).toFixed(1)} KB -> ${(webpStat.size / 1024).toFixed(1)} KB (${savedPercent}% smaller)`
      );
    } catch (err) {
      console.error(`✗ Error optimizing ${file}:`, err.message);
    }
  }

  const totalSaved = totalOriginalBytes > 0 ? (((totalOriginalBytes - totalWebpBytes) / totalOriginalBytes) * 100).toFixed(1) : 0;
  console.log(`\n------------------------------------------------------`);
  console.log(
    `🚀 ${dirName} Complete! Original: ${(totalOriginalBytes / (1024 * 1024)).toFixed(2)} MB -> WebP: ${(totalWebpBytes / (1024 * 1024)).toFixed(2)} MB (${totalSaved}% overall reduction)`
  );
  console.log(`------------------------------------------------------\n`);
}

