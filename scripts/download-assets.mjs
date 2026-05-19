// Downloads Atalanta NYC background images for use in chi5a-site
import { createWriteStream } from 'fs';
import { mkdir } from 'fs/promises';
import { pipeline } from 'stream/promises';
import path from 'path';

const OUT = 'public/atalanta-assets';
await mkdir(OUT, { recursive: true });

const assets = [
  { url: 'https://cdn.prod.website-files.com/60bbcf8c6eb28d5d07637a00/60bbcf8c6eb28d7313637a22_any_website_bg_1%402x.jpg', name: 'hero-bg.jpg' },
  { url: 'https://cdn.prod.website-files.com/60bbcf8c6eb28d5d07637a00/60d5b44b37ab24ecae50bc67_any_web_headline-09.png', name: 'hero-handwriting.png' },
  { url: 'https://cdn.prod.website-files.com/60bbcf8c6eb28d5d07637a00/60bbcf8c6eb28d55a6637a2d_down_arrow.png', name: 'down-arrow.png' },
  { url: 'https://cdn.prod.website-files.com/60bbcf8c6eb28d5d07637a00/60bbcf8c6eb28d7a8b637a59_atalanta_new_york_wire_frame_highf_what_we_do_page_a%20yellow%402x.jpg', name: 'mission-bg.jpg' },
  { url: 'https://cdn.prod.website-files.com/60bbcf8c6eb28d5d07637a00/60bbcf8c6eb28d7436637a2a_any_website_bg_footer_1%402x.jpg', name: 'footer-bg.jpg' },
  { url: 'https://cdn.prod.website-files.com/60bbcf8c6eb28d5d07637a00/60bbcf8c6eb28d9e2b637a1b_any_website_bg_3%20%E2%80%93%202%402x.jpg', name: 'newsletter-bg.jpg' },
];

for (const asset of assets) {
  try {
    const res = await fetch(asset.url);
    if (!res.ok) { console.error(`FAIL ${asset.name}: ${res.status}`); continue; }
    const dest = path.join(OUT, asset.name);
    await pipeline(res.body, createWriteStream(dest));
    console.log(`OK   ${asset.name}`);
  } catch (e) {
    console.error(`ERR  ${asset.name}: ${e.message}`);
  }
}
