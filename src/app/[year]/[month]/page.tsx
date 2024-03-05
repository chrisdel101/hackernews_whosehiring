'use server'
import styles from '../../page.module.css'
import { fetchItemById } from '../../../apiClient/fetch'
import { currentMonthID } from '@/app/constants'
import JobsList from '../../components/client/JobsList'
import AppBar from '../../components/material/NavAppBar'
import { URLParams } from '@/app/page'

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


export default async function Page({params}: URLParams) {
  console.log('XXXX', params)
  return (
    // <div>Hello</div>
      <JobsList jobs={await fetchAllJobs(currentMonthID)}/>
  )
}
