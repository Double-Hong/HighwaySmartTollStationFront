import {tableDataType} from "../../utils/type.ts";
import {Camera, CameraLog} from "../../utils/interface.ts";
import {reactive} from "vue";

export const cameraLogTableData: tableDataType<CameraLog> = reactive({
    data:[] as CameraLog[],
    message:[
        {
            label:"日志时期",name:"",prop:"logTime"
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