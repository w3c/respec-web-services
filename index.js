const port = parseInt(process.env.PORT, 10) || 3000;
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
app.use(compression());
const rawBodyParser = require("./utils/raw-body-parser");
const morgan = require("morgan");

// loggin
app.use(
  morgan(":date[iso] - :method :status :remote-addr :url :res[content-length] - :response-time ms (:referrer)")
);

// for preflight request
app.options("/xref", cors({ methods: ["POST"] }));
app.post("/xref", bodyParser.json(), cors(), require("./routes/xref/").route);

app.post(
  "/xref/update",
  bodyParser.json({
    verify: rawBodyParser,
  }),
  require("./routes/xref/update").route
);

app.listen(port, () => console.log(`Listening on port ${port}!`));
