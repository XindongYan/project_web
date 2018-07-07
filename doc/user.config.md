## 注册
POST /api/user/add

{
    nickname: '',
    phone: '',
    avatar: '',
    create_time: '',
    password: '',
}

响应
{
    msg: '注册成功',
    user: {
        _id: u._id,
        nickname: u.nickname,
        phone: u.phone,
        avatar: u.avatar,
        create_time: u.create_time
    }
}