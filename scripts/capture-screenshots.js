const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const projects = [
    { name: 'jealife', url: 'https://www.jealife.com' },
    { name: 'orpheenyny', url: 'https://www.orpheenyny.com' },
    { name: 'eloquent-boutique', url: 'https://www.eloquentgrandb.com/boutique' },
    { name: 'eloquent', url: 'https://www.eloquentgrandb.com' },
    { name: 'eclat241', url: 'https://eclat241.vercel.app' },
    { name: 'talent-box', url: 'https://talent-box-clone.vercel.app/' },
];

async function capture() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    const outputDir = path.join(__dirname, '../public/projects');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const project of projects) {
        console.log(`Capturing ${project.name}...`);
        try {
            await page.goto(project.url, { waitUntil: 'networkidle2', timeout: 60000 });
            // Wait a bit more for animations
            await new Promise(r => setTimeout(r, 2000));
            await page.screenshot({
                path: path.join(outputDir, `${project.name}.jpg`),
                type: 'jpeg',
                quality: 80
            });
            console.log(`Saved ${project.name}.jpg`);
        } catch (error) {
            console.error(`Failed to capture ${project.name}:`, error.message);
        }
    }

    await browser.close();
    console.log('Capture complete!');
}

capture();
