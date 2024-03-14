'use server'
import { fetchData } from '../../../apiClient/fetch'
import { endPoint, whoseHiring } from '@/app/constants'
import JobsList from '../../components/client/JobsList'
import { URLParams } from '@/app/page'
import { findMatchingPost, verifyInputIsMonthYear, getFirstJobsBatch } from '@/app/utils'
import { notFound } from 'next/navigation'


export default async function Page({ params }: URLParams) {
  // fetch data for whoseHiring
  const userData = await fetchData(`${endPoint}/${whoseHiring}.json`)
  const batch = 20
  const { year, month } = params
  if (verifyInputIsMonthYear(year, month)) {
    const post = await findMatchingPost(year, month, userData)
    if (!post) {
      // send to 404 via https://maxschmitt.me/posts/nextjs-404-page-app-router
      return notFound()
    } else {
      return (
        <JobsList
          firstJobs={await getFirstJobsBatch(post, 20)}
          post={post}
          batchSize={batch} />
      )
    }
  } else {
    // send to NextJS 404
    return notFound()
  }
}
