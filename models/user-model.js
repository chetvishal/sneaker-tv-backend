const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: "Username is a mandatory attribute",
        unique: true
    },
    password: {
        type: String,
        required: "Password is a required attribute",
    },
    email: {
        type: String,
        required: "Email is a mandatory attribute",
        unique: true
    }
}, {
    timestamps: true
});

UserSchema.pre('save', function (next) {
    var user = this;

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch)
    })
}



module.exports = mongoose.model("User", UserSchema);;