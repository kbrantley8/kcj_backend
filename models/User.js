const mongoose = require('mongoose')

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function(v) {
                return emailRegex.test(v)
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    user_type: {
        type: Number,
        required: true,
        default: 0
    }
}, {collection: 'users'})

mongoose.model('User', userSchema)