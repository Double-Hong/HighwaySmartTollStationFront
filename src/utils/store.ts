import {defineStore} from "pinia";
import {ref} from "vue";
import {userInfo} from "./interface.ts";

export const store = defineStore("all", () => {
    const currentUserId = ref("")
    const contentDeviceVisible = ref(0)//设备管理界面的可见性
    const contentLogVisible = ref(0)//日志管理界面的可见性

    const userInfo = ref<userInfo>(
        {
            state: "",
            address: "", birthday: "", gender: "", phone: "", type: "", name: "", password: "", uid: "", username: ""})

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

    const getUserType = () =>{
        return userInfo.value.type

    }

    return {
        currentUserId, getCurrentUserId, setCurrentUserId, setUserInfo,
        getUserInfo,setPassword,contentLogVisible,contentDeviceVisible,
        getUserType
    }
})