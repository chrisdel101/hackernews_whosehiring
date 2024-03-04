'use client'
import { useState } from 'react'
import styles from '../../page.module.css'
import AppAccordion from '../material/Accordion'
import ToggleButtons from '../material/ToggleButtonGroup'
import {Filters} from '../../constants'
import { parseTimeStamp } from '@/app/utils'


interface IProps {
    jobs: Job[]
}

type JobText = {
    heading: string,
    descriptions: string[]
};

type Job = {
    id: string
    name: string
    text: string
    time: number
  }
  const parseJobText = (text: string| undefined) => {
    const splitText = text?.split('<p>')
    const heading = splitText?.[0]
    const descriptions = splitText?.slice(1)
    return {
      heading,
      descriptions,
    } as JobText;
  }
  const sortJobsNewest = (jobs: Job[]) => {
    const copyJobs =    [...jobs]   
    return copyJobs.sort((a, b) => {
        return b.time - a.time
    })
  }
  const sortJobsOldest = (jobs: Job[]) => {
    const copyJobs =    [...jobs] 
    return copyJobs.sort((a, b) => {
        return a.time - b.time
    })
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
    )
}