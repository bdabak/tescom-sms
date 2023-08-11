const express = require("express");
const Joi = require("joi");
const path = require("path");

const { sendSmsUsingTescom } = require("../utils/sms");
/* Router */
const router = express.Router();

/* Pages */
const invalidRoutePath = path.join(__dirname, "../public/pages/405.html");

const notImplementedHandler = async (req, res) => {
  res.status(405).sendFile(invalidRoutePath);
};

router.get("/", notImplementedHandler);
router.put("/", notImplementedHandler);
router.patch("/", notImplementedHandler);
router.delete("/", notImplementedHandler);

router.post("/", async (req, res) => {
  const { error } = validateRequest(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    let result = await sendSms(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

const sendSms = async (oReq) => {
  let responseObject = {
    SMS_ID: null,
    ERROR: null,
    MESSAGE: null
  };

  //Finally send SMS
  let oSmsServiceResult = await sendSmsUsingTescom(
    oReq.phoneNumber,
    oReq.message,
    oReq.customId
  );
  if (
    oSmsServiceResult?.data?.pkgID
  ) {
      responseObject.SMS_ID = oSmsServiceResult.data.pkgID;
      responseObject.ERROR = false;
  } else {
    responseObject.ERROR = true;
    responseObject.MESSAGE = oSmsServiceResult?.err?.message || "Bilinmeyenresmess" ;
  }

  return responseObject;
};

const validateRequest = (request) => {
  //Main schema
  let schema = Joi.object({
    phoneNumber: Joi.string().required(),
    message: Joi.string().required(),
    customId: Joi.string().required(),
  });

  return schema.validate(request);
};

module.exports = router;
