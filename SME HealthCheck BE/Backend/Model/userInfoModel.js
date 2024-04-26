const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    companyUEN: String,
    companyName: String,
    fullName: String,
    positionWithCompany: String,
    emailAddress: String,
    reenterEmailAddress: String,
    mobileNumber: String,
    documents: [String]
});

const UserModel = mongoose.model('applicantInformations', userSchema);

module.exports = UserModel