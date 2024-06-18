require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/application');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));
app.use('/auth', authRoutes);
app.use('/applications', applicationRoutes);
const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

mongoose.connect('mongodb://localhost:27017/student-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Could not connect to MongoDB', err);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
