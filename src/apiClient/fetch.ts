import { endPoint } from "../app/constants"
// wrapper around FetchAPI with string input
export const fetchItemById = async (id: string) => {
    const response = await fetch(`${endPoint}/item/${id}.json`)
    const data = await response.json()
    return data
}
// wrapper around FetchAPI
export const fetchData = async (url: string) => {
    const response = await fetch(url); const data = await response.json()
    return data
}

