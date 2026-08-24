const authService = require("../services/authService");

// Send OTP
const sendOtp = async (req, res) => {
    try {
        const { phone, email } = req.body;

        if (!phone && !email) {
            return res.status(400).json({
                success: false,
                message: "Phone or email is required"
            });
        }

        const result = await authService.sendOtp({
            phone,
            email
        });

        res.status(200).json({
            success: true,
            message: "OTP generated successfully",
            data: result
        });

    } catch (error) {
        console.error("Send OTP error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to generate OTP",
            error: error.message
        });
    }
};


// Verify OTP
const verifyOtp = async (req, res) => {
    try {
        const { phone, email, otp } = req.body;

        if (!phone && !email) {
            return res.status(400).json({
                success: false,
                message: "Phone or email is required"
            });
        }

        if (!otp) {
            return res.status(400).json({
                success: false,
                message: "OTP is required"
            });
        }

        const result = await authService.verifyOtp({
            phone,
            email,
            otp
        });

        if (!result) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP"
            });
        }

        res.status(200).json({
            success: true,
            message: "OTP verified successfully",
            data: {
                id: result.id,
                phone: result.phone,
                email: result.email,
                verified: result.verified
            }
        });

    } catch (error) {
        console.error("Verify OTP error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to verify OTP",
            error: error.message
        });
    }
};


module.exports = {
    sendOtp,
    verifyOtp
};