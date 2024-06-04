
export type formDataType<T> = {
    "data": T,
    "message": Array<{
        "label": string,
        "name": string,
        "type": string,
        "unit"?:string,
    }>
}

export type logFormDataType<T> = {
    "data": T,
    "message": Array<{
        "label": string,
        "name": string,
        "prop": string,
        "unit"?: string,
        "type"?:string,
    }>
}

export type tableDataType<T> = {
    "data": Array<T>,
    "message": Array<{
        "label": string,
        "name": string,
        "prop": string,
        "unit"?: string,
    }>
}
