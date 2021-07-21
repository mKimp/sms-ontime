require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const sendSms = (sender, phone, message) => {
  try {
    const client = require("twilio")(accountSid, authToken);
    client.messages
      .create({
        body: ` ${message}. `,
        from: sender,
        to: phone,
      })
      .then((message) => console.log(message.sid));
  } catch (error) {
    return res.status(501).json("Can't send Message. Server error");
  }
};

module.exports = sendSms;
