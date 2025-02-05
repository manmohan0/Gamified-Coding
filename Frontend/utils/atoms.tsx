import { atom } from 'recoil';

export const urls = atom({
    key: "imageUrls",
    default: [] // Changed from [""] to []
});

export const dialogue = atom({
    key: "dialogues",
    default: []
})
