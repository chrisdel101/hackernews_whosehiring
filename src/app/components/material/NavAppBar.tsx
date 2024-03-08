'use client'
import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import useMediaQuery from '@mui/material/useMediaQuery'
import AppSelect from './Select'
import {
  navTitleLarge,
  navTitleXS,
  Months,
  Years,
  currentMonthIndex,
  currentYearIndex,
  currentMonthKey,
  currentYearKey
} from '@/app/constants'
import { useState } from 'react'
import { MonthKey, YearKey } from '@/app/types'
import { URLParams } from '@/app/page'
import { SelectChangeEvent } from '@mui/material'

interface IProps {
  handleChange: (event: SelectChangeEvent) => void
  params: {
    currentMonth: Months
    currentYear: Years
  }
}

export default function NavAppBar({ handleChange, params }: IProps) {
  console.log('nav params', params)
  // const [monthIndex, setMonthIndex] = useState<number>(cprurrentMonthIndex)
  // const [yearIndex, setYearIndex] = useState<number>(currentYearIndex)
  const monthKey: MonthKey = Object.keys(Months)[Object.values(Months).indexOf(params.currentMonth)] as MonthKey
  const yearKey: YearKey = Object.keys(Years)[Object.values(Years).indexOf(params.currentYear)] as YearKey
  const isXs = useMediaQuery('(max-width:600px)')
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: '#ff6600',
          // '@media (min-width:600px)': {
          //   minHeight: '75px',
          // },
          minHeight: '75px',
          justifyContent: 'center',
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {isXs ? navTitleXS : navTitleLarge}
          </Typography>
          {/* default value uses value to get key */}
          <AppSelect
            width={'100px'}
            values={Months}
            defaultValue={monthKey}
            handleChangeProp={handleChange}
            labelText="Select Month"
          />
          <AppSelect
            width={'50px'}
            values={Years}
            defaultValue={yearKey}
            handleChangeProp={handleChange}
            labelText="Select Year"
          />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
