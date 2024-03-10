'use client'
import { use, useEffect, useRef, useState } from 'react'
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
import { fetchJobsByBatch } from '@/app/[year]/[month]/page'
import { InView, useInView } from 'react-intersection-observer'
import { fetchItemById } from '@/apiClient/fetch'
interface IProps {
  firstJobs: Job[]
  post: Post
  batchSize: number
  nums: number[]
}

const handleChange = (route: string) => {
  console.log('route', route)
}

// pass in the jobs array for the month
export default function JobsList({ firstJobs, post, batchSize, nums }: IProps) {
  const [filter, setFilter] = useState<Filters | null>(null)
  const [sortedJobs, setSortedJobs] = useState<Job[]>([...firstJobs])
  const [loaded, setLoaded] = useState<boolean>(false)
  const { ref, inView } = useInView();  
  const [numsLeft, setNumsLeft] = useState<number[]>(nums?.slice(batchSize))
  // const [postKidsLeft, setPostKidsLeft] = useState<number[]>(nums?.slice(batchSize))

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
  // const fetchNextBatch = async () => {
  //   console.log('postKidsLeft', postKidsLeft)
  //   // get current first bactch
  //   const currentBatch = postKidsLeft.slice(0, batchSize)
  //   // store all expect first batch
  //   const nextKidsLeft = postKidsLeft.slice(batchSize)
  //   setPostKidsLeft(nextKidsLeft)
    
  //   console.log('currentBatch', currentBatch)
  //   console.log('postKidsLeft', nextKidsLeft)
  //   const jobs = currentBatch.map((jobId) => fetchItemById(jobId.toString()))
  //   const _jobs = await Promise.all(jobs)
  //   console.log('_jobs', _jobs)
  //   // setSortedJobs(prevJobs => [...prevJobs, ..._jobs])
  //   // setPostKidsLeft(postKidsLeft.slice(batchSize))
  // }
  const fetchNextBatch = async () => {
    console.log('postKidsLeft', numsLeft)
    // get current first bactch
    const currentBatch = numsLeft.slice(0, batchSize)
    // store all expect first batch
    const nextKidsLeft = numsLeft.slice(batchSize)
    setNumsLeft(nextKidsLeft)
    
    console.log('currentBatch', currentBatch)
    console.log('postKidsLeft', nextKidsLeft)
    const jobs = currentBatch.map((jobId) => fetchItemById(jobId.toString()))
    const _jobs = await Promise.all(jobs)
    console.log('_jobs', _jobs)
    // setSortedJobs(prevJobs => [...prevJobs, ..._jobs])
    // setPostKidsLeft(postKidsLeft.slice(batchSize))
  }
  const fetchAndUpdateJobs = async () => {
    const batchSize = 20
    let jobsLeft = post?.kids?.slice(batchSize)
    const fetchedJobs: Job[] = []
    for (let i = 0; i < 21; i += batchSize) {

      const blockEnd = Math.min(i + batchSize, jobsLeft.length)
      const chunk = jobsLeft.slice(i, blockEnd)
      console.log('CHUNK', chunk)
      console.log('NUM:', i)
      const jobs = chunk.map((jobId) => fetchItemById(jobId.toString()))
      const _jobs = await Promise.all(jobs)
      fetchedJobs.push(..._jobs)
    }
    // Update state with all fetched jobs at once
    // setSortedJobs(prevJobs => [...prevJobs, ...fetchedJobs])
  }
  useEffect(() => {
    if(!loaded){
      fetchNextBatch()
      setLoaded(true) 
    }
    // if (inView && !loaded) {
    //  setLoaded(true) 
    //  fetchAndUpdateJobs()
    //   // Call your function here
    // } else {
    //   console.log("Ref is not in view");
    // }
  }, []);
  // useEffect(() => {
  //   console.log('ref', ref)
  //   const observer = new IntersectionObserver((entries) => {
  //     console.log('entries', entries)
  //     if (entries[0].isIntersecting) {
  //       console.log('Intersecting', entries[0])
  //     }
  //   })
  //   if (ref?.current) {
  //     observer.observe(ref?.current)
  //   }
  // })  
  // useEffect(() => {
  //   fetchAndUpdateJobs();
  // }, [])
  // useEffect(() => {
  //   ;(async () => {
  //     // chop off the first batch
  //     let jobsLeft = post?.kids?.slice(batchSize)
  //     console.log('jobsLeft', jobsLeft)
  //     // increment by batchSize thru remain arr
  //     for (var i = 0; i < 21; i += batchSize) {
  //       console.log("I", i)
  //       const blockEnd = Math.min(i + batchSize, jobsLeft.length)
  //       const chunk = jobsLeft.slice(i, blockEnd)
  //       console.log('CHUNK', chunk)
  //       console.log('NUM:', i)
  //       const jobs = chunk.map((jobId) => fetchItemById(jobId.toString()))
  //       await Promise.all(jobs)
  //         .then((_jobs) => {
  //           console.log('_jobs', _jobs)
  //           // setSortedJobs(_jobs)
  //         })
  //         .catch((error) => {
  //           console.error('Error fetching jobs:', error)
  //         })
  //       //  console.log('jobs', jobs)
  //     }
  //   })()
  // })
  // console.log('sortedJobs', sortedJobs)
  return (
    <Layout>
        <main className={`${styles['jobs-list-container']}`}>
        
        <ToggleButtons handleFilter={handleFilter} filter={filter} />
        {sortedJobs.map((job, i) => {
          let parsedJob = parseJobText(job?.text)
          const parsedTime = parseTimeStamp(job?.time)
          // console.log('job', job)
          return (
            <div ref={i === 3 ? ref : null} key={job?.id} className={`${styles['job-accordion-container']} ${i === 3 ? "found" : null}`} style={{border: inView ? "5px black solid" :"inherit"}} >
              <AppAccordion
                heading={parsedJob?.heading}
                descriptions={parsedJob?.descriptions}
                timeString={parsedTime}
              />
            </div>
          )
        })}
      </main>
      )}
    </Layout>
      )
}
