const { Op } = require("sequelize");
const Otp = require("../models/Otp");


// Generate 6-digit OTP
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};


// Send / Generate OTP
const sendOtp = async ({ phone, email }) => {

    if (!phone && !email) {
        throw new Error("Phone or email is required");
    }

    const otp = generateOtp();

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Remove previous OTPs for same phone/email
    await Otp.destroy({
        where: {
            [Op.or]: [
                phone ? { phone } : null,
                email ? { email } : null
            ].filter(Boolean)
        }
    });

    const otpRecord = await Otp.create({
        phone: phone || null,
        email: email || null,
        otp,
        expiresAt,
        verified: false
    });

    // Development purpose only
    console.log("Generated OTP:", otp);

    return {
        id: otpRecord.id,
        phone: otpRecord.phone,
        email: otpRecord.email,
        expiresAt: otpRecord.expiresAt
    };
};


// Verify OTP
const verifyOtp = async ({ phone, email, otp }) => {

    if (!phone && !email) {
        throw new Error("Phone or email is required");
    }

    if (!otp) {
        throw new Error("OTP is required");
    }

    const whereCondition = {
        otp,
        verified: false,
        expiresAt: {
            [Op.gt]: new Date()
        },
        [Op.or]: [
            phone ? { phone } : null,
            email ? { email } : null
        ].filter(Boolean)
    };

    const otpRecord = await Otp.findOne({
        where: whereCondition,
        order: [["createdAt", "DESC"]]
    });

    if (!otpRecord) {
        return null;
    }

    otpRecord.verified = true;
    await otpRecord.save();

    return otpRecord;
};


module.exports = {
    sendOtp,
    verifyOtp
};