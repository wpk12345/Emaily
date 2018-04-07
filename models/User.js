const mongoose = require('mongoose');

//es15 on line 4.  line 5 is the same but es6
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

mongoose.model('users', userSchema);