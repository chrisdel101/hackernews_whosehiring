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
  mapJobArrToObj,
  addArrItemsToObject,
} from '@/app/utils'
import { Job, JobObject, JobText, Post } from '@/app/types'
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
  const [sortedJobsObj, setSortedJobsObj] = useState<JobObject>(mapJobArrToObj(firstJobs))
  const [allJobsObj, setAllJobsObj] = useState<JobObject>(mapJobArrToObj(firstJobs))
  const [allJobsIndex, setAllJobsIndex] = useState<number>(batchSize)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  useEffect(() => {
    // onload sets jobs to allJobs 
    getBatchJobs(batchSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleFilter = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string | null
  ) => {
    if (newFilter === Filters.NEWEST) {
      setFilter(Filters.NEWEST)
      setSortedJobsObj(mapJobArrToObj(sortJobsNewest(firstJobs)))
    } else if (newFilter === Filters.OLDEST) {
      setFilter(Filters.OLDEST)
      setSortedJobsObj(mapJobArrToObj(sortJobsOldest(firstJobs)))
    } else if (newFilter === Filters.RESET) {
      setFilter(null)
      setSortedJobsObj((mapJobArrToObj(sortJobsOldest(firstJobs))))
    }
  }

  const displayBatchJobs = async () => {
    // get current first batch
    const currentBatch = Object.values?.(allJobsObj).slice(allJobsIndex, allJobsIndex + batchSize)
    if (currentBatch.length > 0) {
      console.log("curernt", currentBatch)
      const addJobsToSortedObj = addArrItemsToObject(currentBatch, sortedJobsObj)
      setSortedJobsObj((prevState) => {
        // console.log("prev", prevS  tate)
        const newData = addArrItemsToObject(currentBatch, prevState);
        return newData;
    });   
    setAllJobsIndex(prev => prev + batchSize)
    }
      // Create promises for state updates
    // const addSortedJobsObj = addArrItemsToObject(sortedJobs
    // setSortedJobsObj(prevJobs => [...prevJobs, ...currentBatch]);;
    // console.log('hi')
  
  }
  // useEffect(() => {
  //   console.log("HERE", allJobsObj)
  // }, [allJobsObj])
  const getBatchJobs = async (batchSize: number) => {
    //  slice off first batch - comes from server on load
    let jobIDsLeft = post?.kids?.slice(batchSize)
    // increment by batch size
    for (let i = 0; i < jobIDsLeft.length; i += batchSize) {
      // make currentChunkSize the size of batch, or what's left at end of arr
      const currentChunkSize = Math.min(i + batchSize, jobIDsLeft.length)
      // cut off chunk of currentChunkSize size
      const chunk = jobIDsLeft.slice(i, currentChunkSize)
      // console.log('CHUNK', chunk)
      // console.log('NUM:', i)
      // loop over current chunk - get arr of promises
      const jobsPromises = chunk.map(async (jobId) => await fetchItemById(jobId.toString()))
      // arr of obj objs
      const resovledJobsArr = await Promise.all(jobsPromises)
      // console.log('resovledJobsArr', resovledJobsArr)
      // console.log('allJobsObj before', allJobsObj)
      setAllJobsObj((prevState: JobObject) => {
        // console.log("prev", prevS  tate)
        const newData = addArrItemsToObject(resovledJobsArr, prevState);
        return newData;
    });      // console.log('length', Object.keys(allJobsObj).length)
    }
  }

  const handleInviewChange = async (inView: boolean) => {
    console.log('inView', inView)
    if (inView && !isFetching) {
      setIsFetching(true)
      displayBatchJobs()
        setIsFetching(false)
    }
  }

  return (
    <Layout>
      <main className={`${styles['jobs-list-container']}`}>

        <ToggleButtons handleFilter={handleFilter} filter={filter} />
        {Object.values(sortedJobsObj).map((job, i) => {
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
