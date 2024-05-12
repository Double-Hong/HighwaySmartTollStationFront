
export type formDataType<T> = {
    "data": T,
    "message": Array<{
        "label": string,
        "name": string,
        "type": string,
    }>
}
