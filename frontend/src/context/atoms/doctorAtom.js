import { atom } from 'recoil';

export const doctorAtom = atom({
    key: 'doctorAtom',
    default: {
        appointments: [],
        id: null,
        name: null,
        email: null,
        phone: null,
        edu: null,
        password: null,
    },
});