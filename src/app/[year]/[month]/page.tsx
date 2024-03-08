'use server'
import { fetchAllPosts, fetchItemById, fetchData } from '../../../apiClient/fetch'
import { currentMonthID, endPoint, whoseHiring } from '@/app/constants'
import JobsList from '../../components/client/JobsList'
import { URLParams } from '@/app/page'
import { findMatchingPost, verifyInputIsMonthYear } from '@/app/utils'
import { Job, Post } from '@/app/types'

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

  const jobs = post.kids.map(async (id: number) => {
      const job = await fetchItemById(id.toString())
      return job
  })
  return Promise.all(jobs)
}
export const fetchXposts = async (post: Post, numToReturn: number) => {
  console.log('post', post)
  const jobs: Job[] = []
  for (let index = 0; index < numToReturn; index++) {
      const job = await fetchItemById(post?.kids[index].toString())
      jobs.push(job)
  }
  return Promise.all(jobs)
}


export default async function Page({params}: URLParams) {
  // console.log('page params', params)

  // fetch data for whoseHiring
  const userData = await fetchData(`${endPoint}/${whoseHiring}.json`)

  const {year, month} = params
  if(verifyInputIsMonthYear(year, month)) {
    const post = await findMatchingPost(year, month, userData)
    if(!post){
      // send to 404
      return <div>404 not found</div>
    } else {
      // console.log('JJ',post)
      return (
          <JobsList jobs={await fetchAllJobsByPost(post)}/>
          // <JobsList jobs={await fetchXposts(post, 20)}/>
      )
    }
  } else {
    return <div>404 not found</div>
    // send to 404
  }
}
