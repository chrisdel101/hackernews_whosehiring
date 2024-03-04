import styles from './page.module.css'
import { fetchItemById } from '../apiClient/fetch'
import { currentMonthID } from '../app/constants'
import JobsList from './components/page_sections/JobsList'
import SearchAppBar from './components/material/Appbar'


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
export default async function Page() {
  return (
    <div className="layout">
      <SearchAppBar />
      <main className={`${styles.main}`}>
        <JobsList jobs={await fetchAllJobs(currentMonthID)}/>
      </main>
    </div>
  )
}
