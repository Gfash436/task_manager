const UserModel = require("../models/user.mode");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const OtpModel = require("../models/otp.model");
const sendEmail = require("../mail/mail");
const { forgotTemp } = require("../utils/templates/forgottemp");


const createUser = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, email, password, referralCode } = req.body;

        if(!(firstName && lastName && phoneNumber && email && password)) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const phoneExist = await UserModel.findOne({ phoneNumber });
        if (phoneExist) {
            return res.status(400).json({ message: "Phone number already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            firstName,
            lastName,
            phoneNumber,
            email,
            password: hashedPassword,
            referralCode
        });

        await newUser.save();
        return res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({
            email
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const payload = {
            id: user._id,
            email: user.email
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });


        return res.status(200).json({ message: "User logged in successfully", token }); s
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // check if otp already exists
        const otp = await OtpModel.findOne({ email });
        if (otp) {
            await otp.deleteOne();
        }

        // Generate otp code
        const randomotp = Math.floor(1000 + Math.random() * 9000);
        await OtpModel.create({
            email,
            otp: randomotp
        });

        // Send otp code to user email
        await sendEmail({
            email,
            subject: "OTP for password reset",
            message: await forgotTemp(randomotp, email),
        });

        return res.status(200).json({ message: "OTP sent successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body;
        if(!(email && otp && password)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const otpData = await OtpModel.findOne({ email });
        if (!otpData) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // check if otp is valid
        if (otpData.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP Provided" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await UserModel.updateOne({
            email
        }, {
            password: hashedPassword
        });

        return res.status(200).json({ message: "Password reset successful" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}




const userProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}




module.exports = {
    createUser,
    loginUser,
    userProfile,
    forgotPassword,
    resetPassword
};
