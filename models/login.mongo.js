const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
    nickname: { type: String, default: '' }, //昵称
    phone: { type: String, default: '' },   //手机号码
    avatar: { type: String, default: '' },   //用户头像
    create_time: { type: Date, default: '' },   //  创建时间
    password: { type: String, default: '' }, 
    salt: { type: String, default: '' }
});

module.exports = mongoose.model('user', schema);