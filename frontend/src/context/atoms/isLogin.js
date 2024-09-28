// context/atoms/isLogin.js
import { atom } from 'recoil';

const isLogin = atom({
    key: 'isLogin',
    default: {
        isLoggedIn: false,
    },
});

export default isLogin;
