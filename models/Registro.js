const { Schema, model } = require("mongoose");
const registroschema = new Schema({
    user: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = model("Registro", registroschema);