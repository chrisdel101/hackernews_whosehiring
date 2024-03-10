import styles from './page.module.css'
import { fetchItemById } from '../apiClient/fetch'
import { currentMonthID, Years, YearsNumber, Months, MonthsNumber } from '../app/constants'
import JobsList from './components/client/JobsList'
import AppBar from './components/material/NavAppBar'
import { redirect } from 'next/navigation'
import { getCurrentDate, verifyInputIsMonthYear } from './utils'

export interface URLParams {
  params: {
    year:  Years
    month: MonthsNumber
  }
}
const appRouting = ({params}: URLParams) => {
  const {year, month} = getCurrentDate()
  if(verifyInputIsMonthYear(params?.year, params?.month)) {
    // if valid redirect to given page URL
    redirect(`/${params.year}/${params.month}`)    
  } else {
    // if invalid url params redirect to current year/month
    redirect(`/${year}/${month}`)
  }
}
export default async function Page({params}: URLParams) {
  appRouting({params})
}
