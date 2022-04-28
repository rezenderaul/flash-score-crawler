const puppeteer = require("puppeteer");

(async () => {
  const allMatchesDaily = [];

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  await page.goto("https://www.flashscore.com.br/");

  await (await page.waitForSelector("#onetrust-accept-btn-handler")).click();

  function convertToTime(time = 0) {
    let preTime = "";
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    if (typeof time != "string") {
      preTime = time.toString().trim();
    } else {
      preTime = time.trim();
    }

    if (preTime.indexOf("+") != -1) {
      preTime = preTime.substring(0, preTime.indexOf("+"));
    }

    let arr = "";

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
    }
    return hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
  }

  const timeActually = () => {
    const date = new Date();
    return date.toLocaleTimeString();
  };

  const getDailyMatches = await page.evaluate(() => 
    newMatchesDaily = [
      ...document.querySelectorAll('[title="Clique para detalhes do jogo!"]'),
    ]
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
        let data = {
          id: '',
          status: '',
          teams: {
            home: '',
            way: ''
          },
          score: {
            home: '',
            way: ''
          },
          redCards: {
            home: '',
            way: ''
          }
        }
        
        if (match.length == 12) {
          [
            data.id,
            data.status,
            data.teams.home,
            data.teams.way,
            data.score.home,
            data.score.way,
            ,
            ,
            ,
            ,
            data.redCards.home,
            data.redCards.way
          ] = match;
        }
        if (match.length == 11) {
          [
            data.id,
            data.status,
            data.teams.home,
            data.teams.way,
            data.score.home,
            data.score.way,
            ,
            ,
            ,
            data.redCards.home,
            data.redCards.way
          ] = match;
        }
        if (match.length == 10) {
          [
            data.id,
            data.status,
            data.teams.home,
            data.teams.way,
            data.score.home,
            data.score.way,
            ,
            ,
            data.redCards.home,
            data.redCards.way
          ] = match;
        }
        if (match.length == 9) {
          [
            data.id,
            data.status,
            ,
            data.teams.home,
            data.teams.way,
            data.score.home,
            data.score.way,
            data.redCards.home,
            data.redCards.way
          ] = match;
        }
        if (match.length == 8) {
          [
            data.id,
            data.status,
            data.teams.home,
            data.teams.way,
            data.score.home,
            data.score.way,
            data.redCards.home,
            data.redCards.way
          ] = match;
        }
        if (match.length == 6) {
          [ 
            data.id,
            data.status,
            data.teams.home,
            data.teams.way
          ] = match;
        }
        return [
            data.id,
            data.status,
            data.teams.home,
            data.teams.way,
            data.score.home,
            data.score.way,
            data.redCards.home,
            data.redCards.way
        ];
      })
      .map((match) => match.map((text) => text.trim()))
  );

  getDailyMatches.filter(match => allMatchesDaily.indexOf(match) == -1).forEach(match => allMatchesDaily.push(match));
  console.log(allMatchesDaily);

})();
