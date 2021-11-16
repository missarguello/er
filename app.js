const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');


const path = require('path');

// intializations
const app = express();
require('./connection');

// settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 2500);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuidv4() + path.extname(file.originalname));
    }
})
app.use(multer({ storage }).single('image'));



// routes
app.use(require('./routes/index'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// start
app.listen(2500, () => {
    console.log(`Server on port ${app.get('port')}`);
});