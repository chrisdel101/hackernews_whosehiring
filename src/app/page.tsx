import styles from './page.module.css'
import SearchAppBar from '../components/Appbar'
import AppAccordion from '../components/Accordion'
import { fetchItemById } from '../apiClient/fetch'
import { currentMonthID } from '../app/constants'
import fs from 'fs-extra';

const readFile =  () =>{
  const file = fs.readFileSync(process.cwd() + '/sample.txt', 'utf8');
  return file
}

interface Job {
  id: string
  name: string
  text: string
  // Add more properties if needed
}

type JobText = {
  heading: string,
  descriptions: string[]
};

const parseJobText = (text: string| undefined) => {
  const splitText = text?.split('<p>')
  const heading = splitText?.[0]
  const descriptions = splitText?.slice(1)
  return {
    heading,
    descriptions
  } as JobText;
}

const fetchAllJobs = async (id: string) => {
  // console.log('id',id)
  const data = await fetchItemById(id)
  // console.log('data',data)
  let testArr = data.kids.slice(0, 3)
  const jobs = testArr.map(async (id: string) => {
    const job = await fetchItemById(id)
    // console.log(job)
    return job
  })
  
  return Promise.all(jobs)
}
export default async function Page() {
  const jobs: Job[] = await fetchAllJobs(currentMonthID)
  return (
    <div>
      <SearchAppBar />
      <main className={`${styles.main} ${styles['jobs-container']}`}>        
        {jobs.map(job => {
          let parsedJob = parseJobText
          (job.text)
          return (
            <div key={job.id}>
              <AppAccordion heading={parsedJob.heading} descriptions={parsedJob.descriptions}/> 
            </div>
          )
        })}
      </main>
    </div>
  )
}
