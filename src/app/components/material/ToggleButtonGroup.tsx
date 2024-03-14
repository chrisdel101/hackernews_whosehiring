import * as React from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { Filters } from '@/app/constants'

interface IProps {
  filter?: string | null
  handleFilter?: (event: React.MouseEvent<HTMLElement>, newFilter: string | null) => void
}

export default function ToggleButtons({ filter, handleFilter }: IProps) {

  return (
    <ToggleButtonGroup
      value={filter}
      exclusive
      onChange={handleFilter}
      aria-label="job order filter"
    >
      <ToggleButton value={Filters.NEWEST} aria-label="sort by date newest" title="Sort jobs by">
        Date Newest
      </ToggleButton>
      <ToggleButton value={Filters.OLDEST} aria-label="sort by date oldest" title="Sort jobs by">
        Date Oldest
      </ToggleButton>
    </ToggleButtonGroup>
  )
}