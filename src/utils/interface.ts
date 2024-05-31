//用户信息
export interface userInfo {
    uid: string,
    username: string,
    name: string
    password: string,
    gender: string,
    birthday: string,
    type: string,
    phone: string,
    address: string,
    state:string
}

//预交易门架设备
export interface preTransactionGantryEquipment {
    transactionId: string,
    transactionName: string,
    installationDate: string,
    state: string,
    equipmentIp: string,
}

//摄像头
export interface Camera {
    cameraId: string,
    laneInfrastructureId: string,
    transactionId: string,
    cameraName: string,
    installationDate: string,
    focalLength: number,
    aperture: string,
    state: string,
    equipmentIp: string,
}

//ETC天线
export interface Antenna {
    antennaId: string;
    transactionId: string;
    antennaName: string;
    installationDate: string;
    frequency: number;
    readRange: number;
    beamWidth: number;
    state: string;
    equipmentIp: string;
}

//诱导屏
export interface InductionScreen {
    inductionScreenId: string;
    transactionId: string;
    inductionScreenName: string;
    installationDate: string;
    brightness: number;
    contrastRatio: number;
    displayRate: number;
    state: string;
    equipmentIp: string;
}

//车道智能自助设备
export interface LaneSmartDevice {
    laneSmartDeviceId: string;
    entranceEquipmentId: string;
    exportEquipmentId: string;
    laneSmartDeviceName: string;
    installationDate: string;
    state: string;
    equipmentIp: string;
}

//出口自助缴费设备
export interface ExportPaymentEquipment {
    exportEquipmentId: string;
    laneSmartDeviceId: string;
    exportName: string;
    installationDate: string;
    state: string;
    receiptNumber: number;
    scannerState: string;
    equipmentIp: string;
}

//入口自助收费设备
export interface EntranceEquipment {
    entranceEquipmentId: string;
    laneSmartDeviceId: string;
    entranceName: string;
    installationDate: string;
    state: string;
    cardNumber: number;
    equipmentIp: string;
}

//雨棚灯
export interface AwningLight {
    awningLightId: string;
    laneInfrastructureId: string;
    awningLightName: string;
    installationDate: string; // 这里假设你已经将日期转换为合适的字符串格式
    state: string;
    fixtureType: string;
    brightness: number;
    equipmentIp: string;
}

//车检器
export interface CarDetector {
    carDetectorId: string;
    laneInfrastructureId: string;
    carDetectorName: string;
    installationDate: string; // 这里假设你已经将日期转换为合适的字符串格式
    state: string;
    detectionMethod: string;
    detectionRange: number;
    equipmentIp: string;
}

//LED情报板
export interface IntelBoard {
    ledBoardId: string;
    laneInfrastructureId: string;
    ledBoardName: string;
    state: string;
    installationDate: string; // 这里假设你已经将日期转换为合适的字符串格式
    displayRate: number;
    brightness: number;
    contrastRatio: number;
    equipmentIp: string;
}

//车道称重设备
export interface LaneWeighingEquipment {
    laneWeighingId: string;
    laneInfrastructureId: string;
    laneWeighingName: string;
    installationDate: string; // 这里假设你已经将日期转换为合适的字符串格式
    state: string;
    weighingMachineState: number;
    displayState: string;
    equipmentIp: string;
}

//车道基础设备
export interface LaneInfrastructure {
    laneInfrastructureId: string;
    carDetectorId: string;
    laneWeighingId: string;
    ledBoardId: string;
    awningLightId: string;
    laneInfrastructureName: string;
    installationDate: string; // 这里假设你已经将日期转换为合适的字符串格式
    state: string;
    equipmentIp: string;
}

//维修人员日志
export interface AccendantLog {
    accendantId: string;
    uid: string;
    logTime: string;
    logDescription: string;
    deviceName: string;
    deviceId: string;
    deviceType: string;
}

//监测人员日志
export interface InspectorLog {
    inspectorLogId: string;
    uid: string;
    logTime: string;
    logDescription: string;
    deviceName: string;
    deviceId: string;
    deviceType: string;
}

//故障日志
export interface FaultLog {
    logId: string;
    deviceId: string;
    faultTime: string;
    description: string;
    writerId: string;
    maintenanceState: string;
    deviceName: string;
}

//维修日志
export interface MaintenanceLog {
    maintenanceId:string,
    logId:string,
    maintainTime:string,
    maintainDescription:string,
    maintainResult:string,
    maintainPeople:string,
    deviceName:string,
}

export enum userType {
    "管理员" = 1,
    "监测人员" = 2,
    "维修人员" = 3
}