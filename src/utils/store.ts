import {defineStore} from "pinia";
import {ref} from "vue";
import {userInfo} from "./interface.ts";

export const store = defineStore("all", () => {
    const currentUserId = ref("")
    const contentVisible = ref(0)

    const userInfo = ref<userInfo>(
        {address: "", birthday: "", gender: "", phone: "", type: "", name: "", password: "", uid: "", username: ""})

    const setUserInfo = (info: userInfo) => {
        userInfo.value = info
    }

    const getUserInfo = () => {
        return userInfo.value
    }

    const getCurrentUserId = () => {
        return currentUserId.value
    }

    const setPassword = (password: string) => {
        userInfo.value.password = password
    }

    const setCurrentUserId = (id: string) => {
        currentUserId.value = id
    }

    return {
        currentUserId, getCurrentUserId, setCurrentUserId, setUserInfo, getUserInfo,setPassword,contentVisible
    }
})