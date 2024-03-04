import styles from './page.module.css'
import { fetchItemById } from '../apiClient/fetch'
import { currentMonthID, currentMonthIndex, Years, YearsIndex, Months, MonthsIndex, currentYearIndex } from '../app/constants'
import JobsList from './components/client/JobsList'
import SearchAppBar from './components/material/Appbar'
import { redirect } from 'next/navigation'
import { verifyParams } from './utils'

export interface URLParams {
  params: {
    year: Years | YearsIndex
    month: Months | MonthsIndex
  }
}

const fetchAllJobs = async (id: string) => {
  const data = await fetchItemById(id)
  console.log(data)
  // const jobs = data.kids.map(async (id: string) => {
    const job = await fetchItemById(data.kids[0])
    console.log(job)
    return Promise.all([job])

  // })
  return Promise.all(jobs)
}
const handleChange = (event: React.MouseEvent<HTMLElement>, newMonth: string | null) => {
  console.log('newMonth', newMonth)
}
export default async function Page({params}: URLParams) {
  if(verifyParams(params?.year, params?.month)) {
    console.log('HERE1')
    redirect(`/${params.year}/${params.month}`)    
  } else {
    console.log('HERE2')
    redirect(`/${currentYearIndex}/${currentMonthIndex}`)
  }
}
