const express = require("express");
const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const PORT = process.env.PORT || 5000;

async function ls(dir) {
  try {
    const { stdout, stderr } = await exec("ls " + dir);
    console.log("stdout:", stdout);
    console.log("stderr:", stderr);
    return stdout;
  } catch (err) {
    console.error(err);
  }
}

express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .get("/ls/:dir", async (req, res) => {
    let lsValue = await ls(req.params.dir);
    res.json({ msg: lsValue });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
