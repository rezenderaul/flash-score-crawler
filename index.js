const puppeteer = require("puppeteer");

(async () => {
  const allMatchesDaily = [];
  const matchesInLive = []

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized", "--mute-audio"],
  });
  const page = await browser.newPage();
  await page.goto("https://www.flashscore.com.br/");

  // accept cookies
  await (await page.waitForSelector("#onetrust-accept-btn-handler")).click();

  // click on live matches
  await page.evaluate(() => {
    const menuText = [...document.querySelectorAll('[class="filters__text filters__text--short"]')]
    menuText[1].click()
  });

  // get all id's
  const ids = await page.$$eval('[title="Clique para detalhes do jogo!"]', result => result.map(div => div.attributes[0].textContent))
  
  for (let i=0; i<ids.length; i++) {
    await (await page.waitForSelector(`#${ids[i]}`)).click();
  }

})();
