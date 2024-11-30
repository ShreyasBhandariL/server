const donatorsNotificationModal = require("../Models/donatorConfirmation");
const Otp = require("../Models/otp");

const DonationDetails = async (req, res) => {
    try {
        const { userId, otp } = req.body;

        const otpRecord = await Otp.findOne({ userId, otpCode: otp });
        if (!otpRecord) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        const donatorsDetails = await donatorsNotificationModal.findById(userId);
        if (!donatorsDetails) {
            return res.status(404).json({ message: "Donator details not found" });
        }

        donatorsDetails.otpVerification = true;

        await donatorsDetails.save();

        res.status(200).json({ message: "Donation data saved, EducationData updated, and notification deleted successfully!" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", error });
    }

};

module.exports = DonationDetails;
