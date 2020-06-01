const createServer = require("http").createServer;
const url = require("url");
const axios = require("axios");
const chalk = require("chalk");
const config = require("./config");
const keys = require("./keys");

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
};

const server = createServer((req, res) => {
  const requestURL = url.parse(req.url);
  const decodedParams = decodeParams(new URLSearchParams(requestURL.search));
  const { search, location, country = "in" } = decodedParams;

  const targetURL = `${config.BASE_URL}/${country.toLowerCase()}/${
    config.PARAM
  }app_id=${keys.APP_ID}&app_key=${keys.API_KEY}&results_per_page=${
    config.RESULT
  }&what=${search}&where=${location}`;
  if (req.method === "GET") {
    console.log(chalk.green(`Proxy GET request to : ${targetURL}`));
    axios
      .get(targetURL)
      .then((response) => {
        res.writeHead(200, headers);
        res.end(JSON.stringify(response.data));
      })
      .catch((response) => {
        console.log(chalk.red(response));
        res.writeHead(500, headers);
        res.end(JSON.stringify(response));
      });
  }
});

server.listen(3000, () => {
  console.log(chalk.green("Server listening"));
});

const decodeParams = (searchParams) =>
  Array.from(searchParams.keys()).reduce(
    (acc, key) => ({ ...acc, [key]: searchParams.get(key) }),
    {}
  );
