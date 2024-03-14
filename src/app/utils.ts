import { Years, YearsNumber, Months, MonthsNumber } from './constants'
import { Job, JobText, MonthKey, Post, User } from '@/app/types'
import { fetchItemById } from '@/apiClient/fetch'

export const parseTimeStamp = (time: number) => {
  let date = new Date(time * 1000)
  let options = { timeZone: 'UTC' }
  return date.toLocaleDateString('en-US', options)
}
// confirm params are part of the Years/Months sets
export const verifyInputIsMonthYear = (year: Years | YearsNumber, month: Months | MonthsNumber) => {
  if (
    (Object.values(Years).includes(year as Years) || Object.values(YearsNumber).includes(year as YearsNumber)) && Object.values(Months).includes(month as Months) || Object.values(MonthsNumber).includes(month as MonthsNumber)) {
    return true
  }
  return false
}
export const parseJobText = (text: string | undefined) => {
  const splitText = text?.split('<p>')
  const heading = splitText?.[0]
  const descriptions = splitText?.slice(1)
  return {
    heading,
    descriptions,
  } as JobText
}
export const sortJobsNewest = (jobs: Job[]) => {
  const copyJobs = [...jobs]
  return copyJobs.sort((a, b) => {
    return b.time - a.time
  })
}
export const sortJobsOldest = (jobs: Job[]) => {
  const copyJobs = [...jobs]
  return copyJobs.sort((a, b) => {
    return a.time - b.time
  })
}
// check if post is Whose Hiring
export const isHiringPost = (post: Post) => {
  // check for exact match
  if (post.title.toLowerCase() === `Ask HN: Who is hiring?`.toLowerCase()) {
    return true
    // check for partial match
  } else if (post.title.toLowerCase().includes('hiring')) {
    return true
  }
}
export const findMatchingPost = async (year: Years, month: MonthsNumber, userData: User) => {
  const { submitted } = userData

  for (let index = 0;index < submitted.length;index++) {
    const element = submitted[index].toString()
    //   // check timeStamp
    const item = await fetchItemById(element)
    if (compareTimeStamp(item.time, year, month)) {
      // check if post is Whose Hiring
      if (item?.title.toLowerCase().includes('hiring')) {
        return item
      }
    }
  }
}
export const compareTimeStamp = (timeStamp: number, year: Years, month: MonthsNumber) => {
  const startDate = new Date(`${month} 1, ${year}`).getTime() / 1000 // Convert milliseconds to seconds
  const nextMonthDate = new Date(`${month} 1, ${year}`)
  // increment month including to next year 
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1) // Move to the next month
  const endDate = nextMonthDate.getTime() / 1000
  if (timeStamp >= startDate && timeStamp < endDate) {
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
export const getMonthKeyFromNumber = (monthNumber: string) => {
  const index = Object.values(MonthsNumber).indexOf(monthNumber as MonthsNumber)
  const monthKey = Object.keys(MonthsNumber)[index] as MonthKey
  return monthKey
}
export const getMontNumberFromName = (month: Months) => {
  var monthKey = Object.keys(Months)[Object.values(Months).indexOf(month)]
  const monthNumber = MonthsNumber[monthKey as keyof typeof MonthsNumber]
  return monthNumber
}
export const getCurrentDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  return {
    year,
    month
  }
}
// returns the first batch from 0-batch index 
export const getFirstJobsBatch = async (post: Post, batch: number) => {
  const batchJobs = post?.kids?.slice(0, batch)
  const jobs: Job[] = []
  for (let id of batchJobs) {
    const job = await fetchItemById(id?.toString())
    jobs.push(job)
  }
  return Promise.all(jobs)
}
export const checkForDupesArrOfObjs = (arrToLoop: Job[], arrToCheckIn: Job[]) => {
  // loop over larger arr
  return arrToLoop.filter(jobA => !arrToCheckIn.some(jobB => jobA.id === jobB.id))
} 