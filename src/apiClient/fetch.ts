import {endPoint,whoseHiring} from "../app/constants"

export const fetchItemById = async (id: string) => {
    const response = await fetch(`${endPoint}/item/${id}.json`);
    const data = await response.json();
    return data;
}
export const fetchAllPosts = async () => {
    const response = await fetch(`${endPoint}/${whoseHiring}.json`);    
    const data = await response.json();
    return data;
}
export const fetchData = async (url: string) => { 
    const response = await fetch(url);    const data = await response.json();
    return data;
}

