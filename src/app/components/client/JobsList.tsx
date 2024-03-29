'use client'
import { useEffect, useState } from 'react'
import styles from '../../page.module.css'
import AppAccordion from '../material/Accordion'
import CheckBoxLabel from '../material/Checkbox'
import ToggleButtons from '../material/ToggleButtonGroup'
import { Filters } from '../../constants'
import {
  parseTimeStamp,
  parseJobText,
  sortJobsNewest,
  sortJobsOldest,
  checkForDupesArrOfObjs,
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
interface IChildProps {
  parsedJob: JobText
  parsedTime: string
  handleChange?: ((inView: boolean) => void)
}
// pass in the jobs array for the month
export default function JobsList({ firstJobs, post, batchSize }: IProps) {
  const [filter, setFilter] = useState<Filters | null>(null)
  const [sortedJobs, setSortedJobs] = useState<Job[]>(firstJobs)
  const [allJobs, setAllJobs] = useState<Job[]>(firstJobs)
  const [allJobsIndex, setAllJobsIndex] = useState<number>(batchSize)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)
  useEffect(() => {
    // onload sets jobs to allJobs 
    getBatchJobs(batchSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (checked) {
      if (sortedJobs.length != allJobs.length) {
        // console.log('sorted', sortedJobs.length)
        displayAllJobs()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, allJobs])
  const handleFilter = (
    _event: React.MouseEvent<HTMLElement>,
    newFilter: string | null
  ) => {
    if (newFilter === Filters.NEWEST) {
      setFilter(Filters.NEWEST)
      setSortedJobs(sortJobsNewest(sortedJobs))
    } else if (newFilter === Filters.OLDEST) {
      setFilter(Filters.OLDEST)
      setSortedJobs(sortJobsOldest(sortedJobs))
    } else if (newFilter === Filters.RESET) {
      setFilter(null)
    }
  }

  const displayBatchJobs = async () => {
    const currentBatch = allJobs?.slice(allJobsIndex, allJobsIndex + batchSize)
    if (currentBatch.length > 0) {
      setSortedJobs((prevState: Job[]) => {
        const newData = checkForDupesArrOfObjs(currentBatch, prevState)
        console.log("newData", newData)
        return [...prevState, ...newData]
      })
      setAllJobsIndex(prev => prev + batchSize)
    }

  }
  const displayAllJobs = () => {
    setSortedJobs(allJobs)
  }
  const getBatchJobs = async (batchSize: number) => {
    //  slice off first batch - comes from server on load
    let jobIDsLeft = post?.kids?.slice(batchSize)
    // increment by batch size
    for (let i = 0;i < jobIDsLeft.length;i += batchSize) {
      // make currentChunkSize the size of batch, or what's left at end of arr
      const currentChunkSize = Math.min(i + batchSize, jobIDsLeft.length)
      // cut off chunk of currentChunkSize size
      const chunk = jobIDsLeft.slice(i, currentChunkSize)
      // loop over current chunk - get arr of promises
      const jobsPromises = chunk.map(async (jobId) => await fetchItemById(jobId.toString()))
      // arr of obj objs
      const resovledJobsArr = await Promise.all(jobsPromises)
      setAllJobs((prevState: Job[]) => {
        const newData = checkForDupesArrOfObjs(resovledJobsArr, prevState)
        return [...prevState, ...newData]
      })
    }
  }
  const handleInviewChange = async (inView: boolean) => {
    if (inView && !isFetching) {
      setIsFetching(true)
      displayBatchJobs()
      setIsFetching(false)
    }
  }
  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
  return (
    <Layout>
      <main className={`${styles['jobs-list-container']}`}>
        <ToggleButtons handleFilter={handleFilter} filter={filter} />
        <CheckBoxLabel
          label={"Load All"}
          handleChange={handleCheckbox}
          checked={checked}
        />
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
function WithRef({ parsedJob, parsedTime, handleChange }: IChildProps) {
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
function WithoutRef({ parsedJob, parsedTime }: IChildProps) {
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
