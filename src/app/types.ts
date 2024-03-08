import { Months, Years } from "./constants";

export type JobText = {
    heading: string,
    descriptions: string[]
};

export type Job = {
    id: string
    name: string
    text: string
    time: number
  }
export type Post = {
    by: string
    id: number
    kids: number[]
    score: number
    time: number
    title: string
    type: string
    url: string
}
export type User = {
    about: string,
    created: number,
    delay: number,
    id:string,
    karma: number,
    submitted: number[]
}
export type MonthKey = keyof typeof Months;
export type YearKey = keyof typeof Years;
