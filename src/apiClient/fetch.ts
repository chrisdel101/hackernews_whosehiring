import {endPoint, currentItem} from "../app/constants"

export const fetchItemById = async (id: string) => {
    const response = await fetch(`${endPoint}/item/${id}.json`);
    const data = await response.json();
    return data;
}


