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
} from '@/app/constants'

interface IProps {
  handleChange: any
}

export default function NavAppBar({ handleChange }: IProps) {
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
            defaultValueIndex={currentMonthIndex}
            handleChangeProp={handleChange}
            labelText="Select Month"
          />
          <AppSelect
            width={'50px'}
            values={Years}
            defaultValueIndex={currentYearIndex}
            handleChangeProp={handleChange}
            labelText="Select Year"
          />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
