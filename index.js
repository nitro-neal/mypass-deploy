const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;

async function ls() {
  try {
    const { stdout, stderr } = await exec("ls");
    console.log("stdout:", stdout);
    console.log("stderr:", stderr);
  } catch (err) {
    console.error(err);
  }
}

express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .get("/ls", (req, res) => {
    let lsValue = await ls()
    res.json({msg:lsValue});
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
