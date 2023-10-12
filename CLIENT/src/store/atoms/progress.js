import { atom } from "recoil";

export const progressState = atom({
    key: 'progressState',
    default: {
        isLoading : true,
        progress : null
    }
})
