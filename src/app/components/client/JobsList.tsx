'use client'
import { useEffect, useState } from 'react'
import styles from '../../page.module.css'
import AppAccordion from '../material/Accordion'
import ToggleButtons from '../material/ToggleButtonGroup'
import { Filters } from '../../constants'
import {
  parseTimeStamp,
  parseJobText,
  sortJobsNewest,
  sortJobsOldest,
} from '@/app/utils'
import { Job, JobText, Post } from '@/app/types'
import { Layout } from './Layout' // Fixed import statement
import { InView } from 'react-intersection-observer'
import { fetchItemById } from '@/apiClient/fetch'
import React from 'react'
interface IProps {
  firstJobs: Job[]
  post: Post
  batchSize: number
  nums?: number[]
}
interface IProps2 {
  parsedJob: JobText
  parsedTime: string
  handleChange?: ((inView: boolean) => void)
}

function WithRef({ parsedJob, parsedTime, handleChange }: IProps2) {
  return (
    <div
      className={`${styles['job-list-container']} ref-added`}>
      <InView onChange={(inView) => handleChange && handleChange(inView)}>
        <AppAccordion
          heading={parsedJob?.heading}
          descriptions={parsedJob?.descriptions}
          timeString={parsedTime}
        />
      </InView>
    </div>
  )
}
function WithoutRef({ parsedJob, parsedTime }: IProps2) {
  return (
    <div
      className={`${styles['job-list-container']}`}>
      <AppAccordion
        heading={parsedJob?.heading}
        descriptions={parsedJob?.descriptions}
        timeString={parsedTime}
      />
    </div>
  )
}

// pass in the jobs array for the month
export default function JobsList({ firstJobs, post, batchSize }: IProps) {
  const [filter, setFilter] = useState<Filters | null>(null)
  const [sortedJobs, setSortedJobs] = useState<Job[]>(firstJobs)
  const [allJobs, setAllJobs] = useState<Job[]>(firstJobs)
  const [allJobsIndex, setAllJobsIndex] = useState<number>(batchSize)
  const [isFetching, setIsFetching] = useState<boolean>(false)

  useEffect(() => {
    fetchAndUpdateJobs(batchSize)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleFilter = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string | null
  ) => {
    if (newFilter === Filters.NEWEST) {
      setFilter(Filters.NEWEST)
      setSortedJobs(sortJobsNewest(firstJobs))
    } else if (newFilter === Filters.OLDEST) {
      setFilter(Filters.OLDEST)
      setSortedJobs(sortJobsOldest(firstJobs))
    } else if (newFilter === Filters.RESET) {
      setFilter(null)
      setSortedJobs(firstJobs)
    }
  }
 
  const displayByBatch = async () => {
    // get current first bactch
    const currentBatch = allJobs.slice(allJobsIndex, allJobsIndex+batchSize)
    // console.log('currentBatch', currentBatch)
    if(currentBatch.length > 0) {
      const jobs = currentBatch.map((job) => fetchItemById(job?.id.toString()))
      const _jobs = await Promise.all(jobs)
      // console.log('_jobs', _jobs)
      setAllJobsIndex(allJobsIndex + batchSize)
      setSortedJobs(prevJobs => [...prevJobs, ..._jobs])
    }
  }
  const fetchAndUpdateJobs = async (batchSize: number) => {
   
    let jobsLeft = post?.kids?.slice(batchSize)
    for (let i = 0; i < jobsLeft?.length; i += batchSize) {
      // get size of batch or what's left size
      const blockEnd = Math.min(i + batchSize, jobsLeft.length)
      // cut block size of arr
      const chunk = jobsLeft.slice(i, blockEnd)
      // console.log('CHUNK', chunk)
      // console.log('NUM:', i)
      const jobs = chunk.map((jobId) => fetchItemById(jobId.toString()))
      const _jobs = await Promise.all(jobs)
      setAllJobs(prevJobs => [...prevJobs, ... _jobs])
    }
  }

  const handleInviewChange = async (inView: boolean) => {
    // console.log('inView', inView)
    if (inView &&  !isFetching) {
      setIsFetching(true)
      await displayByBatch( )
      setIsFetching(false)
    }
  }

  return (
    <Layout>
      <main className={`${styles['jobs-list-container']}`}>

        <ToggleButtons handleFilter={handleFilter} filter={filter} />
        {sortedJobs.map((job, i) => {
          let parsedJob = parseJobText(job?.text)
          const parsedTime = parseTimeStamp(job?.time)
          return (
            <React.Fragment key={job.id}>
              {(i > 0 && (i % 3 === 0)) ?
                <WithRef
                  parsedJob={parsedJob} parsedTime={parsedTime}
                  handleChange={handleInviewChange}
                /> :

                <WithoutRef parsedJob={parsedJob} parsedTime={parsedTime} />
              }
            </React.Fragment>
          )
        })}
      </main>
    </Layout >
  )
}
