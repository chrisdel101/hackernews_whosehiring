import styles from './page.module.css'
import { fetchItemById } from '../apiClient/fetch'
import { currentMonthID } from '../app/constants'
import fs from 'fs-extra';
import JobsList from './components/page_sections/JobsList'

const readFile =  () =>{
  const file = fs.readFileSync(process.cwd() + '/sample.txt', 'utf8');
  return file
}

const fetchAllJobs = async (id: string) => {
  const data = await fetchItemById(id)
  const jobs = data.kids.map(async (id: string) => {
    const job = await fetchItemById(id)
    return job
  })
  return Promise.all(jobs)
}
export default async function Page() {
  return (
    <div className={styles.main}>
      <JobsList jobs={await fetchAllJobs(currentMonthID)}/>
    </div>
  )
}
