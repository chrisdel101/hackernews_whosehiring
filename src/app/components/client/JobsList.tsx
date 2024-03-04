'use client'
import { useState } from 'react'
import styles from '../../page.module.css'
import AppAccordion from '../material/Accordion'
import ToggleButtons from '../material/ToggleButtonGroup'
import {Filters} from '../../constants'
import { parseTimeStamp, parseJobText, sortJobsNewest, sortJobsOldest } from '@/app/utils'
import {Job, JobText} from '@/app/types'
import { Layout } from './Layout' // Fixed import statement
interface IProps {
  jobs: Job[]
}

  const handleChange = (route: string) => {
    console.log('route', route)
  }
  
  // pass in the jobs array for the month
  export default function JobsList({jobs}: IProps) {
      const [filter, setFilter] = useState<Filters | null>(null)
      const [sortedJobs, setSortedJobs] = useState<Job[]>([...jobs])
      const handleFilter = (event: React.MouseEvent<HTMLElement>, newFilter: string | null) => {
         if(newFilter === Filters.NEWEST) {
            setFilter(Filters.NEWEST)
            setSortedJobs(sortJobsNewest(jobs))
         } else if(newFilter === Filters.OLDEST) {
               setFilter(Filters.OLDEST)
               setSortedJobs(sortJobsOldest(jobs))
         } else if(newFilter === Filters.RESET) {
             setFilter(null)
             setSortedJobs(jobs)
         }
      }
    return(
      <Layout>  
        {/* <div>Hello</div> */}
      <main className={`${styles['jobs-list-container']}`}>   
          <ToggleButtons handleFilter={handleFilter} filter={filter}/>     
          {sortedJobs.map(job => {
              let parsedJob = parseJobText
              (job.text)
              const parsedTime = parseTimeStamp(job.time)
              return (
              <div key={job.id} className={styles['job-accordion-container']}>
                  <AppAccordion heading={parsedJob.heading} descriptions={parsedJob.descriptions}
                  timeString={parsedTime}/>                 
              </div>
              )
          })}
      </main>
      </Layout>
    )
}