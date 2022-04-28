const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  await page.goto("https://www.flashscore.com.br/");

  await page.waitForTimeout(5000);

  function convertToTime(time = 0) {
    let preTime = '';
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    if (typeof time != 'string') {
      preTime = time.toString().trim();
    } else {
      preTime = time.trim();
    }

    if (preTime.indexOf('+') != -1) {
      preTime = preTime.substring(0, preTime.indexOf('+'));
    }
    
    let arr = '';

    if (preTime.indexOf(":") == -1) {
      minutes = Number(time);
    } else {
      arr = time.split(":").map(Number);
    }
    if (arr.length == 2) {
      minutes = arr[0];
      seconds = arr[1];
    } else if (arr.length == 3) {
      hours = arr[0];
      minutes = arr[1];
      seconds = arr[2];
    } else {
      return false;
    };
    return (hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000);
  }

  const timeActually = () => {
    const date = new Date();
    return date.toLocaleTimeString();
  };

  await (await page.waitForSelector('[title="Próximo dia"]')).click();
  
  const matchesOfTomorrow = await page.$$eval('[title="Clique para detalhes do jogo!"]', match => 
    match.attributes[0].textContent);
  console.log(matchesOfTomorrow)

})();
