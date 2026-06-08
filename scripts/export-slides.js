const puppeteer = require('puppeteer');
const path = require('path');

const HTML = path.resolve(__dirname, '../templates/carrossel-01-apresentacao.html');
const OUT  = path.resolve(__dirname, '../exports/carrossel-01');
const SIZE = 1080;

async function run() {
  const fs = require('fs');
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: SIZE, height: SIZE, deviceScaleFactor: 1 });
  await page.goto(`file:///${HTML.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0' });

  const wait = ms => new Promise(r => setTimeout(r, ms));

  // aguarda fontes do Google Fonts
  await wait(2500);

  for (let i = 0; i < 3; i++) {
    const file = path.join(OUT, `slide-0${i + 1}.png`);
    const viewport = await page.$('.viewport');
    await viewport.screenshot({ path: file });
    console.log(`Slide ${i + 1} salvo: ${file}`);

    if (i < 2) {
      await page.click('#next');
      await wait(700);
    }
  }

  await browser.close();
  console.log('\nExportação concluída. Arquivos em: exports/carrossel-01/');
}

run().catch(console.error);
