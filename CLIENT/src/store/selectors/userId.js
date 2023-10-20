import { userState } from "../atoms/user";
import { selector } from "recoil";

export const userIdSingleSelector = selector({
    key:'userIdSingleSelector',
    get :({get}) => {
        const state = get(userState)
        return state.userId
    }
})