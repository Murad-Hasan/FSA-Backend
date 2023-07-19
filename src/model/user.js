const {model, Schema} = require('mongoose')


const userSchema = new Schema({
    name: {
        first: {
            type: String,
            min: [3, 'Must be at least 3, got {VALUE}'],
            maxlength: 20,
            required: [true, 'First name is required']
        },
        last: {
            type: String,
            min: [3, 'Must be at least 3, got {VALUE}'],
            maxlength: 20,
            required: [true, 'Last name is required']
        }
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        validate: {
            validator: function(v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    phone: {
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    }
},{timestamps: true})

userSchema.virtual('fullName').get(function () {
    return `${this.name.first} ${this.name.last}`;
});

const User = model('User', userSchema);

module.exports = User;
