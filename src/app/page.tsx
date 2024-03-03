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
  // console.log('id',id)
  const data = await fetchItemById(id)
  // console.log('data',data)
  let testArr = data.kids.slice(0, 10)
  const jobs = testArr.map(async (id: string) => {
    const job = await fetchItemById(id)
    console.log('fetchAllJobs job', job)
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
