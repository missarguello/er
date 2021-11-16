const { Schema, model } = require("mongoose");
const Newsschema = new Schema({
    titulo: {
        type: String,
        required: true,
    },
    subtitulo: {
        type: String,
        required: true,
    },
    c_noti: {
        type: String,
        required: true,
    },
    autor: {
        type: String,
        required: true,
    },
    f_creacion: {
        type: Date,
        default: Date.now(),
    },
    d_noti: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
    },
    path: {
        type: String,
    },
    originalname: {
        type: String,
    },
    mimetype: {
        type: String,
    },
    size: {
        type: Number,
    },


});

module.exports = model("News", Newsschema);