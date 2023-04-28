const FileSaver = require("file-saver");
const puppeteer = require("puppeteer");

async function fetchFrontPage(page) {
  await page.goto("https://www.autovit.ro/");

  // await page.pdf({ path: "autovit.pdf", format: "A4" });
  // await page.screenshot({ path: "autovit.png", fullPage: true });
  // const html = await page.content();
  // const title = await page.evaluate(() => document.title)
  // const text = await page.evaluate(() => document.body.innerText)
  // const body = await page.evaluate(() => document.getElementById("__next"));
  // const links = await page.evaluate(() => Array.from(document.querySelectorAll('a'), e => e.href))
  // const cards = await page.evaluate(() => Array.from(document.querySelectorAll('.ooa-zxrsnf'), e => e.querySelector('.ooa-n6x9r6').src))

  const cards = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".ooa-78awi8"), (e) => ({
      name: e.querySelector(".ooa-af2m8r div h2").textContent,
      price: e.querySelector(".ooa-af2m8r section div").textContent,
      img: e.querySelector("img").getAttribute("src"),
    }))
  );

  return cards;
}

async function fetchCarPageImg(page, carUrl, imageNum = 0) {
  await page.goto(carUrl);

  const images = await page.evaluate(() =>
    Array.from(document.getElementsByClassName("bigImage landscape"), (e) =>
      e.getAttribute("src")
    )
  );

  return imageNum == 0 ? images : images.slice(0, imageNum);
}

async function run() {
  // const browser = await puppeteer.launch(); // use if line below don't work
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  images = await fetchCarPageImg(page, "https://www.autovit.ro/anunt/mini-cooper-se-ID7HaaIk.html", 5);

  console.log(images);

  await browser.close();
}

run();
