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
    state: string
}

//预交易门架设备
export interface preTransactionGantryEquipment {
    transactionId: string,
    transactionName: string,
    installationDate: string,
    state: string,
    equipmentIp: string,
    childrenNumber:number,
    currentNumber:number,
}

//摄像头
export interface Camera {
    cameraId: string,
    laneInfrastructureId: string,
    transactionId: string,
    fatherName?: string
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
    fatherName?: string
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
    fatherName?: string
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
    childrenNumber:number,
    currentNumber:number,
}

//出口自助缴费设备
export interface ExportPaymentEquipment {
    exportEquipmentId: string;
    laneSmartDeviceId: string;
    fatherName?: string
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
    fatherName?: string
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
    fatherName?: string
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
    fatherName?: string
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
    fatherName?: string
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
    fatherName?: string
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
    childrenNumber:number,
    currentNumber:number,
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
    maintenanceId: string,
    logId: string,
    maintainTime: string,
    maintainDescription: string,
    maintainResult: string,
    maintainPeople: string,
    deviceName: string,
}

/**
 * 设备日志
 */



export interface AwningLightLog {
    logId: string;
    awningLightId: string;
    logTime: string;
    state: string; // 状态（连接还是未连接）
    errorCode: string; // 错误代码
    description: string; // 日志描述
    fixtureType:string,
    brightness: number; // 亮度
    equipmentIp: string; // IP地址
    logType: string; // 日志类型（维修日志或故障日志）
    writerId: string; // 日志书写人ID
    equipmentName?: string;
    writerName?: string;
}

//摄像头日志
export interface CameraLog {
    logId: string,
    cameraId: string,
    equipmentName?:string,
    logTime: string,
    state: string,
    errorCode: string,
    description: string,
    focalLength: number,
    aperture: string,
    equipmentIp: string,
    logType: string,
    writerId: string,
    writerName?: string,
}

export interface CarDetectorLog {
    logId: string;
    carDetectorId: string;
    logTime: string;
    state: string; // 状态（连接还是未连接）
    errorCode: string; // 错误代码
    description: string; // 日志描述
    detectionMethod: string; // 检测方式
    detectionRange: number; // 检测范围
    equipmentIp: string; // IP地址
    logType: string; // 日志类型（维修日志或故障日志）
    writerId: string; // 日志书写人ID
    equipmentName?: string;
    writerName?: string;
}

export interface EntranceEquipmentLog {
    logId: string;
    entranceEquipmentId: string;
    logTime: string;
    state: string; // 状态（连接还是未连接）
    errorCode: string; // 错误代码
    description: string; // 日志描述
    cardNumber: number; // 机器内卡片数量
    equipmentIp: string; // IP地址
    logType: string; // 日志类型（维修日志或故障日志）
    writerId: string; // 日志书写人ID
    equipmentName?: string;
    writerName?: string;
}

export interface EtcAntennaLog {
    logId: string;
    antennaId: string;
    logTime: string;
    state: string; // 状态（连接还是未连接）
    errorCode: string; // 错误代码
    description: string; // 日志描述
    frequency: number; // 工作频率
    readRange: number; // 读取距离
    beamWidth: number; // 波束宽度
    equipmentIp: string; // IP地址
    logType: string; // 日志类型（维修日志或故障日志）
    writerId: string; // 日志书写人ID
    equipmentName?: string;
    writerName?: string;
}

export interface ExportPaymentEquipmentLog {
    logId: string;
    exportEquipmentId: string;
    logTime: string;
    state: string; // 状态（连接还是未连接）
    errorCode: string; // 错误代码
    description: string; // 日志描述
    receiptNumber: number; // 打印收据的纸的数量
    scannerState: string; // 收费扫描器的状态
    equipmentIp: string; // IP地址
    logType: string; // 日志类型（维修日志或故障日志）
    writerId: string; // 日志书写人ID
    equipmentName?: string;
    writerName?: string;
}

export interface InductionScreenLog {
    logId: string;
    inductionScreenId: string;
    logTime: string;
    state: string; // 状态（连接还是未连接）
    errorCode: string; // 错误代码
    description: string; // 日志描述
    brightness: number; // 亮度
    contrastRatio: number; // 对比度
    displayRate: number; // 显示率
    equipmentIp: string; // IP地址
    logType: string; // 日志类型（维修日志或故障日志）
    writerId: string; // 日志书写人ID
    equipmentName?: string;
    writerName?: string;
}

export interface IntelBoardLog {
    logId: string;
    ledBoardId: string;
    logTime: string;
    state: string; // 状态（连接还是未连接）
    errorCode: string; // 错误代码
    description: string; // 日志描述
    displayRate: number; // 显示率
    brightness: number; // 亮度
    contrastRatio: number; // 对比度
    equipmentIp: string; // IP地址
    logType: string; // 日志类型（维修日志或故障日志）
    writerId: string; // 日志书写人ID
    equipmentName?: string;
    writerName?: string;
}

export interface LaneWeighingEquipmentLog {
    logId: string;
    laneWeighingId: string;
    logTime: string;
    state: string; // 状态（连接还是未连接）
    errorCode: string; // 错误代码
    description: string; // 日志描述
    weighingMachineState: number; // 称重器状态
    displayState: string; // 称重显示器状态
    equipmentIp: string; // IP地址
    logType: string; // 日志类型（维修日志或故障日志）
    writerId: string; // 日志书写人ID
    equipmentName?: string;
    writerName?: string;
}


export enum userType {
    "管理员" = 1,
    "监测人员" = 2,
    "维修人员" = 3
}