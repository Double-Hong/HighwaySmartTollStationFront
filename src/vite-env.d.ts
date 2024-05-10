/// <reference types="vite/client" />
//声明Vue文件类型
declare module '*.vue' {
    import { defineComponent } from 'vue'
    const component: ReturnType<typeof defineComponent>
    export default component

}
