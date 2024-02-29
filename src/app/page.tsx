import styles from './page.module.css'
import SearchAppBar from '../components/Appbar'
import { fetchItemById } from '../apiClient/fetch'
import { currentMonthID } from '../app/constants'
import fs from 'fs-extra';
import he from 'he'

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
  title: string,
  descriptions: string[]
};

const parseJobText = (text: string| undefined) => {
  const splitText = text?.split('<p>')
  const title = splitText?.[0]
  const descriptions = splitText?.slice(1)
  return {
    title,
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
  return jobs
}
export default async function Page() {
  const jobs: Job[] = await fetchAllJobs(currentMonthID)
  return (
    <div>
      <SearchAppBar />
      <main className={styles.main}>
        {/* <h2 dangerouslySetInnerHTML={{__html: parsedSample.title }}/>
        <p dangerouslySetInnerHTML={{__html: parsedSample.descriptions[0] }}/>
        <p dangerouslySetInnerHTML={{__html: parsedSample.descriptions[1] }}/>
        <p dangerouslySetInnerHTML={{__html: parsedSample.descriptions[2] }}/>
        <p dangerouslySetInnerHTML={{__html: parsedSample.descriptions[3] }}/>
        <p dangerouslySetInnerHTML={{__html: parsedSample.descriptions[4] }}/>
        <p dangerouslySetInnerHTML={{__html: parsedSample.descriptions[5] }}/>
        <p dangerouslySetInnerHTML={{__html: parsedSample.descriptions[6] }}/> */}
        
        {jobs.map(async (jobPromise) => {
              const job = await jobPromise;
              const jobText = parseJobText(job.text)
              return( 
                <div key={job.id}>
                  <h2 dangerouslySetInnerHTML={{__html: jobText.title }}/>
                {jobText.descriptions.map((desc, i) => {
                  return <p key={i} dangerouslySetInnerHTML={{__html: desc }}/>
                }
                )}
                </div>
              )
          })}
      </main>
    </div>
  )
}
