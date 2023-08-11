const axios = require("axios");

const sendSmsUsingTescom = async (sTo, sSmsText, sCustomId) => {
  let sUrl = process.env.TESCOM_SERVICE_URL + "/sms/create";
  let res;
  let payload = JSON.stringify({
    type: 1,
    sendingType: 0,
    title: process.env.TESCOM_ORIGIN + "-" + sCustomId,
    content: sSmsText,
    number: sTo,
    encoding: 1,
    sender: process.env.TESCOM_ORIGIN,
    periodicSettings: null,
    sendingDate: null,
    validity: 60,
    pushSettings: null,
    customID: sCustomId
  });

  var config = {
    method: "post",
    url: sUrl,
    headers: {
      "Authorization": "Basic " + getAuthorization(),
      "Content-Type": "application/json",
    },
    data: payload,
  };
  try {
    res = await axios(config);
  } catch (e) {
    return {
        err:{
            code: "Request error",
            status: 500,
            message: e
        }
    };
  }
  return res.data;
};

const getCreditTescom = async () => {
    let sUrl = process.env.TESCOM_SERVICE_URL + "/user/credit";
    let res;

    var config = {
      method: "get",
      url: sUrl,
      headers: {
        "Authorization": "Basic " + getAuthorization(),
        "Content-Type": "application/json",
      },
    };
    try {
      res = await axios(config);
    } catch (e) {
      return {
          err:{
              code: "Request error",
              status: 500,
              message: e
          }
      };
    }
  
    return res.data;
  };

const getAuthorization = () => {
  return new Buffer.from(
    process.env.TESCOM_USERNAME + ":" + process.env.TESCOM_PASSWORD
  ).toString("base64");
};

module.exports = {
  sendSmsUsingTescom,
  getCreditTescom
};
