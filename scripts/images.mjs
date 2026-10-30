#!/usr/bin/env node
/**
 * Photo pipeline.
 *
 *   npm run images:add -- <source-file> <name>   Optimise a high-resolution source into public/images/<name>.jpg
 *                                               (max 2400px on the long edge, progressive mozjpeg q82, EXIF orientation applied,
 *                                               metadata stripped), then refresh the manifest.
 *   npm run images:manifest                      Rebuild lib/content/image-manifest.json from public/images: real pixel
 *                                               dimensions plus a tiny blurred placeholder for next/image (placeholder="blur").
 *
 * next/image serves resized AVIF/WebP versions of these files at request time, so the files here are the quality ceiling,
 * not what visitors download.
 */
import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const imagesDir = path.join(root, "public", "images");
const manifestPath = path.join(root, "lib", "content", "image-manifest.json");

async function add(source, name) {
  if (!source || !/^[a-z0-9-]+$/.test(name ?? "")) {
    console.error("Usage: npm run images:add -- <source-file> <kebab-case-name>");
    process.exit(1);
  }
  await mkdir(imagesDir, { recursive: true });
  const out = path.join(imagesDir, `${name}.jpg`);
  const info = await sharp(source)
    .rotate()
    .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(out);
  console.log(`${name}.jpg  ${info.width}×${info.height}  ${Math.round(info.size / 1024)} KB`);
}

async function manifest() {
  const files = (await readdir(imagesDir)).filter((f) => f.endsWith(".jpg")).sort();
  const entries = {};
  for (const file of files) {
    const full = path.join(imagesDir, file);
    const { width, height } = await sharp(full).metadata();
    const blur = await sharp(full).resize(16, 16, { fit: "inside" }).jpeg({ quality: 50 }).toBuffer();
    entries[file.replace(/\.jpg$/, "")] = { width, height, blurDataURL: `data:image/jpeg;base64,${blur.toString("base64")}` };
  }
  await writeFile(manifestPath, `${JSON.stringify(entries, null, 2)}\n`);
  console.log(`Manifest: ${files.length} images → ${path.relative(root, manifestPath)}`);
}

const [command, ...args] = process.argv.slice(2);
if (command === "add") {
  await add(args[0], args[1]);
  await manifest();
} else if (command === "manifest") {
  await manifest();
} else {
  console.error("Commands: add <source> <name> | manifest");
  process.exit(1);
}
