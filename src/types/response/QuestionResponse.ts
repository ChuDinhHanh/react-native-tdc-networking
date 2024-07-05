import { Base } from "./Base"

export interface Question{
    id?:number
    type?:string
    title:string
    choices:Choice[]
    required:number
}

export interface Choice{
    id?:number
    content:string
}

export interface ChoiceProps{
    index:number
    choice:string
}

export interface QuestionResponse extends Base{
    type: string
    title: string
    choices: Choice[]
    required: number
}