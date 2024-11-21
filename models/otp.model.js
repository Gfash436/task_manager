const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    expires: {
        type: Date,
        default: Date.now,
        expires: 300
    }
}, { timestamps: true });

const OtpModel = mongoose.model('Otp', otpSchema);

module.exports = OtpModel;

