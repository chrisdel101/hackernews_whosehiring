'use server'
import { fetchAllPosts, fetchItemById, fetchData } from '../../../apiClient/fetch'
import { currentMonthID, endPoint, whoseHiring } from '@/app/constants'
import JobsList from '../../components/client/JobsList'
import { URLParams } from '@/app/page'
import { findMatchingPost, verifyInputIsMonthYear } from '@/app/utils'
import { Post } from '@/app/types'

const fetchAllJobsByPostID = async (id: string) => {
  const data = await fetchItemById(id)
  console.log('data', data)
  // const jobs = data.kids.m ap(async (id: string) => {
    const job = await fetchItemById(data.kids[0])
    console.log(job)
    return Promise.all([job])

  // })
  return Promise.all(jobs)
}

const fetchAllJobsByPost = async (post: Post) => {
  console.log('post', post)
  // const jobs = data.kids.m ap(async (id: string) => {
    const job = await fetchItemById(post?.kids[0].toString())
    console.log(job)
    return Promise.all([job])

  // })
  return Promise.all(jobs)
}


export default async function Page({params}: URLParams) {
  // fetch data for whoseHiring
  const userData = await fetchData(`${endPoint}/${whoseHiring}.json`)

  const {year, month} = params
  if(verifyInputIsMonthYear(year, month)) {
    const post = await findMatchingPost(year, month, userData)
    console.log('JJ',post)
    return (
        <JobsList jobs={await fetchAllJobsByPost(post)}/>
    )
  } else {
    console.log('404')
    // send to 404
  }
}
