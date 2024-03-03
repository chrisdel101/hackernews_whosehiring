'use client'
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { parseTimeStamp } from '@/app/utils'
import styles from '../../page.module.css'
import { useEffect } from 'react';

interface IProps {
    heading: string;
    descriptions: string[];
    timeString: string;
}
export default function AppAccordion({heading, descriptions, timeString}: IProps) {
  return (
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className={styles['job-heading']}
        >
          <div className={styles['job-heading-inner']}>
            <h3 dangerouslySetInnerHTML={{__html: heading}}/>
            <span>Date Posted: {timeString}</span>
          </div>
        </AccordionSummary>
        <AccordionDetails className={styles['job-description-container']}>
        {descriptions.map((description, index) => {
          return <p key={index}
          dangerouslySetInnerHTML={{__html: description}}/>
          })}
        </AccordionDetails>
      </Accordion>
  );
}
