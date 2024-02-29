import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from '../app/page.module.css'
console.log('styles',styles)

interface IProps {
    heading: string;
    descriptions: string[];
}
export default function AppAccordion({heading, descriptions}: IProps) {
  return (
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className={styles['job-heading']}
          // sx={{ bgcolor: "rgb(214, 219, 220)"}}
        >
           <h3 dangerouslySetInnerHTML={{__html: heading}}/>
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
