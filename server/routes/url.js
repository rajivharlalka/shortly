const express = require("express");
const router = express.Router();
const validURL = require("valid-url");
const config = require("config");
const shortID = require("shortid");

const Url = require("../Model/Url.js");

//@route POST /api/url/shorten
//@desc create short url
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get("baseUrl");

  if (!validURL.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }
  //create URL code
  const urlCode = shortID.generate();

  //check long URL
  if (validURL.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("server error");
    }
  }else
  {
      res.status(401).json('Invalid long url');s
  }
});

module.exports = router;
