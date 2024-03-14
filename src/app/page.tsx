import { redirect } from 'next/navigation'
import { getCurrentDate, verifyInputIsMonthYear } from './utils'
import { URLParams } from './types'

interface RouteParams {
  params: URLParams
}

const appRouting = ({ params }: RouteParams) => {
  const { year, month } = getCurrentDate()
  if (verifyInputIsMonthYear(params?.year, params?.month)) {
    // if valid redirect to given page URL
    redirect(`/${params.year}/${params.month}`)
  } else {
    // if invalid url params redirect to current year/month
    redirect(`/${year}/${month}`)
  }
}
export default async function Page({ params }: RouteParams) {
  appRouting({ params })
}
