import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

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
      <ToggleButton value="newest" aria-label="date newest">
       Date Newest 
      </ToggleButton>
      <ToggleButton value="oldest" aria-label="date oldest">
       Date Oldest 
      </ToggleButton>
      <ToggleButton value="country" aria-label="country">
      Country
      </ToggleButton>
      <ToggleButton value="reset" aria-label="resest" disabled>
       X
      </ToggleButton>
    </ToggleButtonGroup>
  );
}