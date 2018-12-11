const xrefResponseBody = require("respec-xref-route");
const { readFileSync, watch } = require("fs");
const path = require("path");

const dataFile = path.join(process.cwd(), "xref-data.json");
let xrefData = JSON.parse(readFileSync(dataFile, "utf8"));

module.exports.route = function route(req, res) {
  const body = xrefResponseBody(req.body, xrefData);
  res.json(body);
};

// reload xref data if xref-data.json is modified
watch(dataFile, eventType => {
  if (eventType === "change") {
    console.log("xref-data.json modified");
    xrefData = JSON.parse(readFileSync(dataFile, "utf8"));
  }
});