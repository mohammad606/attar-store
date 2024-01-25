export type items = string[]
export type qtn = number[]
export type data = {
    id:number
    allQtn:number
    items:items
    qtn:qtn
    date:string
    noa?:number
    oop?:string
    delete?:boolean
    sender?:string
    client?:string
}

export type dataInOut = [data]

export type storyObjType = {
    id:number
    item:string
    qtn:number
    box:number | string
}

export type dataStoryType = [storyObjType]

