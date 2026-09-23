const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

const reelsDir = path.join(__dirname, '../public/reels');
const backupDir = path.join(reelsDir, 'original_backup');
const postersDir = path.join(reelsDir, 'posters');
const webmDir = path.join(reelsDir, 'webm');
const tempMp4Dir = path.join(reelsDir, 'temp_mp4');

// Ensure output directories exist
[backupDir, postersDir, webmDir, tempMp4Dir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    
  }
});

const files = fs.readdirSync(reelsDir).filter((f) => f.endsWith('.mp4'));
console.log(`Found ${files.length} MP4 files in ${reelsDir}`);

for (const file of files) {
  const baseName = path.basename(file, '.mp4');
  const sourcePath = path.join(reelsDir, file);
  const backupPath = path.join(backupDir, file);
  const posterPath = path.join(postersDir, `${baseName}.webp`);
  const webmPath = path.join(webmDir, `${baseName}.webm`);
  const tempMp4Path = path.join(tempMp4Dir, `${baseName}.mp4`);
  const finalMp4Path = path.join(reelsDir, file);

  const initialStat = fs.statSync(sourcePath);
  console.log(`\n--------------------------------------------------`);
  console.log(`Checking: ${file} (Size: ${(initialStat.size / (1024 * 1024)).toFixed(2)} MB)`);

  // Skip if already optimized (both poster and webm exist and backup exists)
  if (fs.existsSync(posterPath) && fs.existsSync(webmPath) && fs.existsSync(backupPath)) {
    console.log(`⏩ Skipping ${file} — already optimized!`);
    continue;
  }

  // 1. Back up original if not already backed up
  if (!fs.existsSync(backupPath)) {
    console.log(`Backing up original to ${backupPath}...`);
    fs.copyFileSync(sourcePath, backupPath);
  }

  // 2. Generate crisp first-frame WebP poster (~1s into video)
  console.log(`Generating WebP poster -> ${posterPath}...`);
  try {
    execSync(
      `"${ffmpeg}" -y -ss 00:00:01.0 -i "${backupPath}" -vframes 1 -vf "scale=540:960:force_original_aspect_ratio=decrease,pad=540:960:(ow-iw)/2:(oh-ih)/2" -q:v 75 "${posterPath}"`,
      { stdio: 'pipe' }
    );
    const posterStat = fs.statSync(posterPath);
    console.log(`Poster generated: ${(posterStat.size / 1024).toFixed(1)} KB`);
  } catch (err) {
    console.error(`Poster failed for ${file}:`, err.message);
  }

  // 3. Encode WebM (VP9, audio stripped, optimized mobile 540x960, fast multithreaded)
  console.log(`Encoding WebM (VP9, no audio) -> ${webmPath}...`);
  try {
    execSync(
      `"${ffmpeg}" -y -i "${backupPath}" -an -vf "scale=540:960:force_original_aspect_ratio=decrease,pad=540:960:(ow-iw)/2:(oh-ih)/2" -c:v libvpx-vp9 -crf 34 -b:v 600k -deadline good -cpu-used 4 -threads 4 -row-mt 1 "${webmPath}"`,
      { stdio: 'pipe' }
    );
    const webmStat = fs.statSync(webmPath);
    console.log(`WebM generated: ${(webmStat.size / (1024 * 1024)).toFixed(2)} MB`);
  } catch (err) {
    console.error(`WebM encoding failed for ${file}:`, err.message);
  }

  // 4. Encode optimized MP4 (H.264, audio stripped, faststart for instant streaming)
  console.log(`Encoding MP4 (H.264, +faststart, no audio) -> ${tempMp4Path}...`);
  try {
    execSync(
      `"${ffmpeg}" -y -i "${backupPath}" -an -vf "scale=540:960:force_original_aspect_ratio=decrease,pad=540:960:(ow-iw)/2:(oh-ih)/2" -c:v libx264 -crf 27 -preset fast -movflags +faststart "${tempMp4Path}"`,
      { stdio: 'pipe' }
    );
    const mp4Stat = fs.statSync(tempMp4Path);
    console.log(`MP4 compressed: ${(mp4Stat.size / (1024 * 1024)).toFixed(2)} MB`);

    // Replace final public reel with the optimized MP4
    fs.copyFileSync(tempMp4Path, finalMp4Path);
  } catch (err) {
    console.error(`MP4 encoding failed for ${file}:`, err.message);
  }
}

// Clean up temp dir
try {
  fs.rmSync(tempMp4Dir, { recursive: true, force: true });
} catch (e) {}

console.log(`\n==================================================`);
console.log(`All 9 videos successfully optimized!`);
