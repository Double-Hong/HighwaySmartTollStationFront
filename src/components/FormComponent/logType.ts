import {formDataType, logFormDataType, tableDataType} from "../../utils/type.ts";
import {
    Antenna,
    AwningLightLog,
    CameraLog, CarDetectorLog,
    EntranceEquipmentLog,
    EtcAntennaLog, ExportPaymentEquipmentLog,
    InductionScreenLog, IntelBoardLog, LaneWeighingEquipmentLog
} from "../../utils/interface.ts";
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

export const awningLogTableData: tableDataType<AwningLightLog> = reactive({
    data:[] as AwningLightLog[],
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
            label:"亮度",name:"",prop:"brightness",unit:"%"
        },
        {
            label:"灯具类型",name:"",prop:"fixtureType",
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

export const awningLogFormData: logFormDataType<AwningLightLog> = reactive({
    data:{} as AwningLightLog,
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
            label:"亮度",name:"",prop:"brightness",unit:"%",type: "number"
        },
        {
            label:"灯具类型",name:"",prop:"fixtureType",
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

export const etcLogTableData: tableDataType<EtcAntennaLog> = reactive({
    data:[] as EtcAntennaLog[],
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
            label:"工作频率",name:"",prop:"frequency",unit:"GHz"
        },
        {
            label:"读取距离",name:"",prop:"readRange",unit: "米"
        },
        {
            label:"波束宽度",name:"",prop:"beamWidth",unit:"度"
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

export const etcLogFormData: logFormDataType<EtcAntennaLog> = reactive({
    data:{} as EtcAntennaLog,
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
            label:"工作频率",name:"",prop:"frequency",unit:"GHz"
        },
        {
            label:"读取距离",name:"",prop:"readRange",unit: "米",type: "number"
        },
        {
            label:"波束宽度",name:"",prop:"beamWidth",unit:"度",type: "number"
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

export const inductionLogTableData: tableDataType<InductionScreenLog> = reactive({
    data:[] as InductionScreenLog[],
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
            label:"亮度",name:"",prop:"brightness",unit:"%"
        },
        {
            label:"对比度",name:"",prop:"contrastRatio",unit: "%"
        },
        {
            label:"显示率",name:"",prop:"displayRate",unit:"%"
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

export const inductionLogFormData: logFormDataType<InductionScreenLog> = reactive({
    data:{} as InductionScreenLog,
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
            label:"亮度",name:"",prop:"brightness",unit:"%",type: "number"
        },
        {
            label:"对比度",name:"",prop:"contrastRatio",unit: "%",type: "number"
        },
        {
            label:"显示率",name:"",prop:"displayRate",unit:"%",type: "number"
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

export const entranceLogTableData: tableDataType<EntranceEquipmentLog> = reactive({
    data:[] as EntranceEquipmentLog[],
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
            label:"卡片数量",name:"",prop:"cardNumber",unit:"张"
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

export const entranceLogFormData: logFormDataType<EntranceEquipmentLog> = reactive({
    data:{} as EntranceEquipmentLog,
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
            label:"卡片数量",name:"",prop:"cardNumber",unit:"张",type: "number"
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

export const exportLogTableData: tableDataType<ExportPaymentEquipmentLog> = reactive({
    data:[] as ExportPaymentEquipmentLog[],
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
            label:"收据纸数量",name:"",prop:"receiptNumber",unit:"张"
        },
        {
            label:"收费扫描器状态",name:"",prop:"scannerState",unit:"%"
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

export const exportLogFormData: logFormDataType<ExportPaymentEquipmentLog> = reactive({
    data:{} as ExportPaymentEquipmentLog,
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
            label:"收据纸数量",name:"",prop:"receiptNumber",unit:"张",type: "number"
        },
        {
            label:"收费扫描器状态",name:"",prop:"scannerState",unit:"%"
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

export const carDetectorLogTableData: tableDataType<CarDetectorLog> = reactive({
    data:[] as CarDetectorLog[],
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
            label:"检测方式",name:"",prop:"detectionMethod",unit:""
        },
        {
            label:"检测范围",name:"",prop:"detectionRange",unit:"米"
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

export const carDetectorLogFormData: logFormDataType<CarDetectorLog> = reactive({
    data:{} as CarDetectorLog,
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
            label:"检测方式",name:"",prop:"detectionMethod",unit:""
        },
        {
            label:"检测范围",name:"",prop:"detectionRange",unit:"米"
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


export const intelLogTableData: tableDataType<IntelBoardLog> = reactive({
    data:[] as IntelBoardLog[],
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
            label:"显示率",name:"",prop:"displayRate",unit:"%"
        },
        {
            label:"亮度",name:"",prop:"brightness",unit:"%"
        },
        {
            label:"对比度",name:"",prop:"contrastRatio",unit:"%"
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

export const intelLogFormData: logFormDataType<IntelBoardLog> = reactive({
    data:{} as IntelBoardLog,
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
            label:"显示率",name:"",prop:"displayRate",unit:"%",type: "number"
        },
        {
            label:"亮度",name:"",prop:"brightness",unit:"%",type: "number"
        },
        {
            label:"对比度",name:"",prop:"contrastRatio",unit:"%",type: "number"
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

export const laneWeighingLogTableData: tableDataType<LaneWeighingEquipmentLog> = reactive({
    data:[] as LaneWeighingEquipmentLog[],
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
            label:"称重器状态",name:"",prop:"weighingMachineState",unit:"%"
        },
        {
            label:"称重显示器状态",name:"",prop:"displayState",unit:"%"
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

export const laneWeighingLogFormData: logFormDataType<LaneWeighingEquipmentLog> = reactive({
    data:{} as LaneWeighingEquipmentLog,
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
            label:"称重器状态",name:"",prop:"weighingMachineState",unit:"%",type: "number"
        },
        {
            label:"称重显示器状态",name:"",prop:"displayState",unit:"%",type: "number"
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





