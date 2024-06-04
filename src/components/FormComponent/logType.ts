import {formDataType, logFormDataType, tableDataType} from "../../utils/type.ts";
import {CameraLog} from "../../utils/interface.ts";
import {reactive} from "vue";

export const cameraLogTableData: tableDataType<CameraLog> = reactive({
    data:[] as CameraLog[],
    message:[
        {
            label:"日志日期",name:"",prop:"logTime"
        },
        {
            label:"设备名称",name:"",prop:"equipmentName",
        },
        {
            label:"IP地址",name:"",prop:"equipmentIp"
        },
        {
            label:"状态",name:"state",prop:"state"
        },
        {
            label:"焦距",name:"",prop:"focalLength",unit:"毫米"
        },
        {
            label:"光圈",name:"",prop:"aperture",unit:"F"
        },
        {
            label:"书写人",name:"",prop:"writerName",
        },
        {
            label:"日志描述",name:"",prop:"description"
        },
        {
            label:"日志类型",name:"",prop:"logType"
        }
    ]
})

export const cameraLogFormData: logFormDataType<CameraLog> = reactive({
    data:{} as CameraLog,
    message:[
        {
            label:"日志日期",name:"logTime",prop:"logTime",type:"datetime"
        },
        {
            label:"设备名称",name:"equipmentName",prop:"equipmentName",
        },
        {
            label:"IP地址",name:"equipmentIp",prop:"equipmentIp"
        },
        {
            label:"状态",name:"state",prop:"state"
        },
        {
            label:"焦距",name:"focalLength",prop:"focalLength",unit:"毫米",type:"number"
        },
        {
            label:"光圈",name:"aperture",prop:"aperture",unit:"F",type: "number"
        },
        {
            label:"书写人",name:"writerName",prop:"writerName",
        },
        {
            label:"日志描述",name:"description",prop:"description",type:"textarea"
        },
        {
            label:"日志类型",name:"logType",prop:"logType",type:"logType"
        }
    ]
})