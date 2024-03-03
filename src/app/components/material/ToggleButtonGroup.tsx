import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Filters } from '@/app/constants';

interface IProps {
    filter?: string | null 
    handleFilter?: (event: React.MouseEvent<HTMLElement>, newFilter: string | null) => void
}

export default function ToggleButtons({filter, handleFilter}: IProps) {

  return (
    <ToggleButtonGroup
      value={filter}
      exclusive
      onChange={handleFilter}
      aria-label="job order filter"
    >
      <ToggleButton value={Filters.NEWEST} aria-label="date newest">
       Date Newest 
      </ToggleButton>
      <ToggleButton value={Filters.OLDEST} aria-label="date oldest">
       Date Oldest 
      </ToggleButton>
      <ToggleButton value={Filters.COUNTRY} aria-label="country">
      Country
      </ToggleButton>
      <ToggleButton value={Filters.RESET} aria-label="reset">
       X
      </ToggleButton>
    </ToggleButtonGroup>
  );
}