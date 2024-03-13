'use server'
import { fetchData } from '../../../apiClient/fetch'
import { currentMonthID, endPoint, whoseHiring } from '@/app/constants'
import JobsList from '../../components/client/JobsList'
import { URLParams } from '@/app/page'
import { findMatchingPost, verifyInputIsMonthYear, getFirstJobsBatch } from '@/app/utils'
import { Job, Post } from '@/app/types'

export default async function Page({ params }: URLParams) {
  // console.log('page params', params)

  // fetch data for whoseHiring
  const userData = await fetchData(`${endPoint}/${whoseHiring}.json`)
  const batch = 20
  const { year, month } = params
  if (verifyInputIsMonthYear(year, month)) {
    const post = await findMatchingPost(year, month, userData)
    if (!post) {
      // send to 404
      return <div>404 not found</div>
    } else {
      return (
        <JobsList 
        firstJobs={await getFirstJobsBatch(post, 20)} 
        post={post} 
        batchSize={batch} />
      )
    }
  } else {
    return <div>404 not found</div>
    // send to 404
  }
}
