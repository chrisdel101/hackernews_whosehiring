import { timeStamp } from 'console';
import {Years, YearsNumber, Months, MonthsNumber} from './constants'
import {Job, JobText, Post, User} from '@/app/types'
import { fetchItemById } from '@/apiClient/fetch';

export const parseTimeStamp = (time: number) => {
    let date = new Date(time * 1000)
    let options = { timeZone: 'UTC' }; 
    return date.toLocaleDateString('en-US', options)
  }
// confirm params are part of the Years/Months sets
export const verifyInputIsMonthYear = (year: Years|YearsNumber, month: Months|MonthsNumber) => {
  // console.log(Object.keys(Months))
  // console.log(Object.keys(YearsNumber))
  // console.log('year', year, Object.values(YearsNumber).includes(year), Object.keys(YearsNumber))
  if(
    (Object.values(Years).includes(year as Years) || Object.values(YearsNumber).includes(year as YearsNumber)) && Object.values(Months).includes(month as Months) || Object.values(MonthsNumber).includes(month as MonthsNumber)) {
      console.log('month OK', month)
      console.log('year OK', year)
      return true
    }
  return false
}
export const parseJobText = (text: string| undefined) => {
  const splitText = text?.split('<p>')
  const heading = splitText?.[0]
  const descriptions = splitText?.slice(1)
  return {
    heading,
    descriptions,
  } as JobText;
}
export const sortJobsNewest = (jobs: Job[]) => {
  const copyJobs =    [...jobs]   
  return copyJobs.sort((a, b) => {
      return b.time - a.time
  })
}
export const sortJobsOldest = (jobs: Job[]) => {
  const copyJobs =    [...jobs] 
  return copyJobs.sort((a, b) => {
      return a.time - b.time
  })
}
// check if post is Whose Hiring
export const isHiringPost = (post: Post) => {
  // check for exact match
  if(post.title.toLowerCase() === `Ask HN: Who is hiring?`.toLowerCase()) {
    return true
    // check for partial match
  } else if(post.title.toLowerCase().includes('hiring')) {
    return true
  }
}
export const findMatchingPost = async (year: Years, month: MonthsNumber, userData: User) => {
  const {submitted} = userData
  
  for (let index = 0; index < submitted.length; index++) {
    const element = submitted[index].toString();
    // console.log('element', element)
  //   // check timeStamp
    const item = await fetchItemById(element)
    // console.log('year', year, 'month', month)
    // console.log('item.time', item.time * 1000)
    // console.log('item.time xx', new Date(item.time * 1000).toDateString())
    if(compareTimeStamp(item.time , year, month)) {
      // check if post is Whose Hiring
      if(item?.title.toLowerCase().includes('hiring')) {
        return item
      }
    }
  }

  // const currentMonth = Object.keys(Months)[MonthsNumber] 
  
  
  // }
}
export const compareTimeStamp = (timeStamp: number, year: Years, month: MonthsNumber) => {
  // const incrementMonth = (Number(month) + 1) % 12 
  const startDate = new Date(`${month} 1, ${year}`).getTime() / 1000; // Convert milliseconds to seconds
  const nextMonthDate = new Date(`${month} 1, ${year}`);
  // increment month including to next year 
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1); // Move to the next month
  console.log('nextMonthDate', nextMonthDate)
  const endDate = nextMonthDate.getTime() / 1000;
 if(timeStamp >= startDate && timeStamp < endDate) {
  // console.log('XXXX')
  return true
 }
 return false
}
export const parsePathName = (pathname: string) => {
  const splitPath = pathname.split('/')
  // ignore splitpath[0]
  return {
    year: splitPath?.[1],
    monthNumber: splitPath?.[2]
  }
}
export const getMonthKeyFromNumber = (monthNumber:  string) => {
  const index = Object.values(MonthsNumber).indexOf(monthNumber as MonthsNumber)
  const month = Object.keys(MonthsNumber)[index]
  return month
}
export const getMontNumberFromName = (month:  Months) => {
  var monthKey = Object.keys(Months)[Object.values(Months).indexOf(month)]
  console.log('monthKey', monthKey)
  const monthNumber = MonthsNumber[monthKey as keyof typeof MonthsNumber] 
  console.log('monthNumber', monthNumber)
  return monthNumber
}