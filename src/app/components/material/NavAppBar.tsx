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

interface IProps {
  handleChange: any
  params: URLParams
}

export default function NavAppBar({ handleChange, params }: IProps) {
  // console.log('params', Months?.[`${params.currentMonth}`])
  // const [monthIndex, setMonthIndex] = useState<number>(cprurrentMonthIndex)
  // const [yearIndex, setYearIndex] = useState<number>(currentYearIndex)
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

          <AppSelect
            width={'100px'}
            values={Months}
            defaultValue={Object.keys(Months)[Object.values(Months).indexOf(params.currentMonth)]}
            handleChangeProp={handleChange}
            labelText="Select Month"
          />
          <AppSelect
            width={'50px'}
            values={Years}
            defaultValue={Object.keys(Years)[Object.values(Years).indexOf(params.currentYear)]}
            handleChangeProp={handleChange}
            labelText="Select Year"
          />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
