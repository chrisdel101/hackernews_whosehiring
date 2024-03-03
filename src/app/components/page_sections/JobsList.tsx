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
  const timeStampFilter = (jobs: Job[]) => {
    jobs.sort((a, b) => {
        return a.time - b.time
    })
    
  }
const handleFilter = (event: React.MouseEvent<HTMLElement>, newFilter: string | null) => {
    console.log('newFilter', newFilter)
}
// pass in the jobs array for the month
export default function JobsList({jobs}: IProps) {
    const [filter, setFilter] = useState<Filters | null>(null)
    return(
    <main className={`${styles['jobs-list-container']}`}>   
        <ToggleButtons handleFilter={handleFilter} filter={filter}/>     
        {jobs.map(job => {
            let parsedJob = parseJobText
            (job.text)
            const parsedTime = parseTimeStamp(job.time)
            console.log('parsedTime', parsedTime)
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