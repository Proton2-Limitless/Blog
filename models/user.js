const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: [6,"your password should be six letters long"]
    },
    posts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Post',
          required: true
        }
      ]
},{timestamps: true});

UserSchema.pre(
    'save',
    async function (next) {
        const user = this
        if (!user.isModified('password')) return next()
        const hash = await bcrypt.hash(user.password, 10);

        user.password = hash;
        next();
    }
);

UserSchema.methods.ValidatePassword = async function(password){
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
}

module.exports = mongoose.model("User",UserSchema)