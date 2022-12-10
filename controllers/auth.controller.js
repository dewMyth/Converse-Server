const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } =
  process.env;

const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
  lazyLoading: true,
});

const sendOTP = async (req, res) => {
  const { countryCode, mobileNo } = req.body;
  try {
    const otpResponse = await client.verify
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: `+${countryCode}${mobileNo}`,
        channel: "sms",
      });
    res.status(200).json({ message: "OTP sent successfully", otpResponse });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error });
  }
};

const verifyOTP = async (req, res) => {
  const { countryCode, mobileNo, otp } = req.body;
  try {
    const verificationResponse = await client.verify
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `+${countryCode}${mobileNo}`,
        code: otp,
      });
    res
      .status(200)
      .json({ message: "OTP verified successfully", verificationResponse });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error });
  }
};

module.exports = { sendOTP, verifyOTP };
