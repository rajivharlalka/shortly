const express = require("express");
const router = express.Router();
const Url = require("../Model/Url.js");

// @route /:urlCode
//@desc link to the required route

router.get("/:code", async (req, res) => {
  let urlC = req.params.code;
  let code = await Url.findOne({ urlCode: urlC });
  if (code) {
    res.redirect(code.longUrl);
  } else {
    res.status(404).json("Not Found");
  }
});

module.exports = router;
