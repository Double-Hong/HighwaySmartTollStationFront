import {AwningLight, CarDetector, EntranceEquipment, IntelBoard, LaneWeighingEquipment} from "../../utils/interface.ts";
import {reactive} from "vue";

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

export const addEntranceEquipmentData: formDataType<EntranceEquipment> = reactive({
    data: {} as EntranceEquipment,
    message: [
        {label: "设备名称", name: "entranceName", type: ""}
    ]
})