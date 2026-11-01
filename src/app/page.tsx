import { redirect } from 'next/navigation'
import { getLatestPostDate, verifyInputIsMonthYear } from './utils'
import { URLParams } from './types'
import { fetchData } from '../apiClient/fetch'
import { endPoint, whoseHiring } from './constants'

export const dynamic = 'force-dynamic'

interface RouteParams {
  params: URLParams
}

const appRouting = async ({ params }: RouteParams) => {
  if (verifyInputIsMonthYear(params?.year, params?.month)) {
    // if valid redirect to given page URL
    redirect(`/${params.year}/${params.month}`)
  } else {
    // if invalid url params redirect to newest posted year/month
    const userData = await fetchData(`${endPoint}/${whoseHiring}.json`)
    const { year, month } = await getLatestPostDate(userData)
    redirect(`/${year}/${month}`)
  }
}
export default async function Page({ params }: RouteParams) {
  await appRouting({ params })
}
