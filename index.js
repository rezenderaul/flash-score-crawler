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

  const getDailyMatches = await page.evaluate(() =>
    [...document.querySelectorAll('[title="Clique para detalhes do jogo!"]')]
      .map((match) =>
        match.attributes[0].textContent
          .concat("\n")
          .concat(match.innerText)
          .concat(
            "\n" +
              (match.childNodes[3].childNodes == 1
                ? ""
                : match.childNodes[3].childNodes.length - 1)
          )
          .concat(
            "\n" +
              (match.childNodes[5].childNodes == 1
                ? ""
                : match.childNodes[5].childNodes.length - 1)
          )
      )
      .map((match) => match.split("\n"))
      .map((match) => {
        let id = "";
        let status = "";
        let teamHome = "";
        let teamWay = "";
        let scoreHome = "0";
        let scoreWay = "0";
        let redHome = "0";
        let redWay = "0";

        if (match.length == 12) {
          [ id, status, teamHome, teamWay, scoreHome, scoreWay, , , , , redHome, redWay, ] = match;
        }
        if (match.length == 11) {
          [ id, status, teamHome, teamWay, scoreHome, scoreWay, , , , redHome, redWay, ] = match;
        }
        if (match.length == 10) {
          [ id, status, teamHome, teamWay, scoreHome, scoreWay, , , redHome, redWay, ] = match;
        }
        if (match.length == 9) {
          [ id, status, , teamHome, teamWay, scoreHome, scoreWay, redHome, redWay, ] = match;
        }
        if (match.length == 8) {
          [ id, status, teamHome, teamWay, scoreHome, scoreWay, redHome, redWay, ] = match;
        }
        if (match.length == 6) {
          [id, status, teamHome, teamWay] = match;
        }
        return [ id, status, teamHome, teamWay, scoreHome, scoreWay, redHome, redWay, ];
      })
      .filter((match) => match[1] != "Encerrado")
      .filter((match) => match[1] != "Adiado")
      .filter((match) => match[1] != "Intervalo")
  );

  let strategy2goals = getDailyMatches()
    .filter(
      (match) =>
        match[1].trim().length == 2 &&
        Number(match[1]) > 45 &&
        Number(match[1]) < 80 &&
        (match[4] - match[5] == 2 || match[5] - match[4] == 2)
    )
    .sort((a, b) => convertToTime(a[1]) - convertToTime(b[1]));

    let strategy33Minutes = getDailyMatches()

})();
