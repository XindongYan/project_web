const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
    title: String,
    body: String,
    auther: String,
    create_time: String
});

module.exports = mongoose.model('upload', schema);