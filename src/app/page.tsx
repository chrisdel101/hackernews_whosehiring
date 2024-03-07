import styles from './page.module.css'
import { fetchItemById } from '../apiClient/fetch'
import { currentMonthID, currentMonthIndex, Years, YearsNumber, Months, MonthsNumber, currentYearIndex } from '../app/constants'
import JobsList from './components/client/JobsList'
import AppBar from './components/material/NavAppBar'
import { redirect } from 'next/navigation'
import { verifyInputIsMonthYear } from './utils'

export interface URLParams {
  params: {
    year:  Years
    month: MonthsNumber
  }
}
const appRouting = ({params}: URLParams) => {
  if(verifyInputIsMonthYear(params?.year, params?.month)) {
    // if valid redirect to given page URL
    redirect(`/${params.year}/${params.month}`)    
  } else {
    // if invalid redirect current month and year
    redirect(`/${currentYearIndex}/${currentMonthIndex}`)
  }
}
export default async function Page({params}: URLParams) {
  appRouting({params})
}
