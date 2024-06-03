import {
    Antenna,
    AwningLight,
    Camera,
    CarDetector,
    EntranceEquipment, ExportPaymentEquipment, InductionScreen,
    IntelBoard,
    LaneWeighingEquipment
} from "../../utils/interface.ts";
import {reactive} from "vue";
import {tableDataType} from "../../utils/type.ts";

export type formDataType<T> = {
    "data": T,
    "message": Array<{
        "label": string,
        "name": string,
        "type": string,
    }>
}

//数据标签和对应名称
export const awningLightData: formDataType<AwningLight> = reactive({
    data: {} as AwningLight,
    message: [
        {
            label: "名称", name: "awningLightName", type: ""
        },
        {
            label: "安装日期", name: "installationDate", type: ""
        },
        {
            label: "亮度", name: "brightness", type: "number"
        },
        {
            label: "灯具类型", name: "fixtureType", type: ""
        },
        {
            label: "IP地址", name: "equipmentIp", type: ""
        },
    ]
})

export const editAwningLightData: formDataType<AwningLight> = reactive({
    data: {} as AwningLight,
    message: [
        {
            label: "名称", name: "awningLightName", type: ""
        },
        {
            label: "安装日期", name: "installationDate", type: ""
        },
        {
            label: "亮度", name: "brightness", type: "number"
        },
        {
            label: "灯具类型", name: "fixtureType", type: ""
        },
        {
            label: "IP地址", name: "equipmentIp", type: ""
        },
    ]
})

export const carDetectorData: formDataType<CarDetector> = reactive({
    data: {} as CarDetector,
    message: [
        {
            label: "名称", name: "carDetectorName", type: ""
        },
        {
            label: "安装日期", name: "installationDate", type: ""
        },
        {
            label: "检测方式", name: "detectionMethod", type: ""
        },
        {
            label: "检测范围", name: "detectionRange", type: "number"
        },
        {
            label: "IP地址", name: "equipmentIp", type: ""
        },
    ]
})

export const editCarDetectorData: formDataType<CarDetector> = reactive({
    data: {} as CarDetector,
    message: [
        {
            label: "名称", name: "carDetectorName", type: ""
        },
        {
            label: "安装日期", name: "installationDate", type: ""
        },
        {
            label: "检测方式", name: "detectionMethod", type: ""
        },
        {
            label: "检测范围", name: "detectionRange", type: "number"
        },
        {
            label: "IP地址", name: "equipmentIp", type: ""
        },
    ]
})

export const intelBoardData: formDataType<IntelBoard> = reactive({
    data: {} as IntelBoard,
    message: [
        {
            label: "名称", name: "ledBoardName", type: ""
        },
        {
            label: "安装日期", name: "installationDate", type: ""
        },
        {
            label: "对比度", name: "contrastRatio", type: "number"
        },
        {
            label: "亮度", name: "brightness", type: "number"
        },
        {
            label: "IP地址", name: "equipmentIp", type: ""
        },
        {
            label: "显示率", name: "displayRate", type: "number"
        },
    ]
})

export const editIntelBoardData: formDataType<IntelBoard> = reactive({
    data: {} as IntelBoard,
    message: [
        {
            label: "名称", name: "ledBoardName", type: ""
        },
        {
            label: "安装日期", name: "installationDate", type: ""
        },
        {
            label: "对比度", name: "contrastRatio", type: "number"
        },
        {
            label: "亮度", name: "brightness", type: "number"
        },
        {
            label: "IP地址", name: "equipmentIp", type: ""
        },
        {
            label: "显示率", name: "displayRate", type: "number"
        },
    ]
})

export const laneWeighingEquipmentData: formDataType<LaneWeighingEquipment> = reactive({
    data: {} as LaneWeighingEquipment,
    message: [
        {
            label: "名称", name: "laneWeighingName", type: ""
        },
        {
            label: "安装日期", name: "installationDate", type: ""
        },
        {
            label: "称重器状态", name: "weighingMachineState", type: "number"
        },
        {
            label: "称重显示器状态", name: "displayState", type: ""
        },
        {
            label: "IP地址", name: "equipmentIp", type: ""
        },
    ]
})

export const editLaneWeighingEquipmentData: formDataType<LaneWeighingEquipment> = reactive({
    data: {} as LaneWeighingEquipment,
    message: [
        {
            label: "名称", name: "laneWeighingName", type: ""
        },
        {
            label: "安装日期", name: "installationDate", type: ""
        },
        {
            label: "称重器状态", name: "weighingMachineState", type: "number"
        },
        {
            label: "称重显示器状态", name: "displayState", type: ""
        },
        {
            label: "IP地址", name: "equipmentIp", type: ""
        },
    ]
})

export const cameraTableData: tableDataType<Camera> = reactive({
    data:[] as Camera[],
    message:[
        {
            label:"名称",name:"",prop:"cameraName"
        },
        {
            label:"安装日期",name:"",prop:"installationDate"
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
            label: "所属设备",name:"",prop:"fatherName"
        }
    ]
})

export const etcTableData:tableDataType<Antenna> = reactive({
    data:[] as Antenna[],
    message:[
        {
            label:"名称",name:"",prop:"antennaName"
        },
        {
            label:"安装日期",name:"",prop:"installationDate"
        },
        {
            label:"IP地址",name:"",prop:"equipmentIp"
        },
        {
            label:"状态",name:"state",prop:"state"
        },
        {
            label:"读取距离",name:"",prop:"readRange",unit:"米"
        },
        {
            label:"工作频率",name:"",prop:"frequency",unit:"GHz"
        },
        {
            label:"波束宽度",name:"",prop:"beamWidth",unit:"度"
        },
        {
            label: "所属设备",name:"",prop:"fatherName"
        }
    ]
})

export const InductionScreenTableData:tableDataType<InductionScreen> = reactive({
    data:[] as InductionScreen[],
    message:[
        {
            label:"名称",name:"",prop:"inductionScreenName"
        },
        {
            label:"安装日期",name:"",prop:"installationDate"
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
            label:"对比度",name:"",prop:"contrastRatio",unit:"%"
        },
        {
            label:"显示率",name:"",prop:"displayRate",unit:"%"
        },
        {
            label: "所属设备",name:"",prop:"fatherName"
        }
    ]
})

export const EntranceTableData:tableDataType<EntranceEquipment> = reactive({
    data:[] as EntranceEquipment[],
    message:[
        {
            label:"名称",name:"",prop:"entranceName"
        },
        {
            label:"安装日期",name:"",prop:"installationDate"
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
            label: "所属设备",name:"",prop:"fatherName"
        }
    ]
})

export const ExportTableData:tableDataType<ExportPaymentEquipment> = reactive({
    data:[] as ExportPaymentEquipment[],
    message:[
        {
            label:"名称",name:"",prop:"exportName"
        },
        {
            label:"安装日期",name:"",prop:"installationDate"
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
            label: "所属设备",name:"",prop:"fatherName"
        }
    ]
})

export const AwingLightTableData:tableDataType<AwningLight> = reactive({
    data:[] as AwningLight[],
    message:[
        {
            label:"名称",name:"",prop:"awningLightName"
        },
        {
            label:"安装日期",name:"",prop:"installationDate"
        },
        {
            label:"IP地址",name:"",prop:"equipmentIp"
        },
        {
            label:"状态",name:"state",prop:"state"
        },
        {
            label:"灯具类型",name:"",prop:"fixtureType"
        },
        {
            label:"亮度",name:"",prop:"brightness",unit:"%"
        },
        {
            label: "所属设备",name:"",prop:"fatherName"
        }
    ]
})

export const carDetectorTableData:tableDataType<CarDetector> = reactive({
    data:[] as CarDetector[],
    message:[
        {
            label:"名称",name:"",prop:"carDetectorName"
        },
        {
            label:"安装日期",name:"",prop:"installationDate"
        },
        {
            label:"IP地址",name:"",prop:"equipmentIp"
        },
        {
            label:"状态",name:"state",prop:"state"
        },
        {
            label:"检测方式",name:"",prop:"detectionMethod"
        },
        {
            label:"检测范围",name:"",prop:"detectionRange",unit:"米"
        },
        {
            label: "所属设备",name:"",prop:"fatherName"
        }
    ]
})

export const ledBoardTableData:tableDataType<IntelBoard> = reactive({
    data:[] as IntelBoard[],
    message:[
        {
            label:"名称",name:"",prop:"ledBoardName"
        },
        {
            label:"安装日期",name:"",prop:"installationDate"
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
            label: "所属设备",name:"",prop:"fatherName"
        }
    ]
})

export const laneWeighingTableData:tableDataType<LaneWeighingEquipment> = reactive({
    data:[] as LaneWeighingEquipment[],
    message:[
        {
            label:"名称",name:"",prop:"laneWeighingName"
        },
        {
            label:"安装日期",name:"",prop:"installationDate"
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
            label: "所属设备",name:"",prop:"fatherName"
        }
    ]
})

export const addEntranceEquipmentData: formDataType<EntranceEquipment> = reactive({
    data: {} as EntranceEquipment,
    message: [
        {label: "设备名称", name: "entranceName", type: ""}
    ]
})