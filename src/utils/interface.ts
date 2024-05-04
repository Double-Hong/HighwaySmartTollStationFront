//用户信息
export interface userInfo{
    uid:string,
    username:string,
    name:string
    password:string,
    gender:string,
    birthday:string,
    type:string,
    phone:string,
    address:string
}

//预交易门架设备
export interface preTransactionGantryEquipment{
    transactionId:string,
    transactionName:string,
    installationDate:string,
    state:string,
    equipmentIp:string,
}

//摄像头
export interface Camera{
    cameraId:string,
    laneInfrastructureId:string,
    transactionId:string,
    cameraName:string,
    installationDate:string,
    focalLength:number,
    aperture:string,
    state:string,
    equipmentIp:string,
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



export enum userType{
    "普通" = 1 ,
    "检查人员" =2 ,
    "维修人员" =3
}