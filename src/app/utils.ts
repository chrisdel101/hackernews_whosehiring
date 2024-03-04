import {Years, YearsIndex, Months, MonthsIndex} from './constants'
import {Job, JobText} from '@/app/types'

export const parseTimeStamp = (time: number) => {
    let date = new Date(time * 1000)
    let options = { timeZone: 'UTC' }; 
    return date.toLocaleDateString('en-US', options)
  }
export const verifyParams = (year: Years|YearsIndex, month: Months|MonthsIndex) => {
  if(
    (Object.values(Years).includes(year as Years) || Object.values(YearsIndex).includes(year)) && Object.values(Months).includes(month as Months) || Object.values(MonthsIndex).includes(month)) {
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