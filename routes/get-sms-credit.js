const express = require("express");
const path = require("path");

const { getCreditTescom } = require("../utils/sms");
/* Router */
const router = express.Router();

/* Pages */
const invalidRoutePath = path.join(__dirname, "../public/pages/405.html");

const notImplementedHandler = async (req, res) => {
  res.status(405).sendFile(invalidRoutePath);
};

router.get("/", async (req, res) => {

  try {
    let result = await getCreditTescom();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.put("/", notImplementedHandler);
router.patch("/", notImplementedHandler);
router.delete("/", notImplementedHandler);
router.post("/", notImplementedHandler);

module.exports = router;
