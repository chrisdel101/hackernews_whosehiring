import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Months, Years,currentYearKey } from '@/app/constants'
interface IProps {
  width?: string
  values: Months | Years
  defaultValue: keyof Months | keyof Years
  handleChangeProp?: (event: SelectChangeEvent) => void
  labelText?: string
}

export default function AppSelect({
  width,
  values,
  defaultValue,
  handleChangeProp,
  labelText
}: IProps) {
  
  // console.log('values',values)
  // console.log('value', values?.[`${defaultValue}`])
  // console.log('handleChangeProp', handleChangeProp)
  

  return (
    <Box sx={{ minWidth: 120, 
            '@media (min-width:768px)': {
              minWidth: 150,
          },
            '@media (min-width:960px)': {
              minWidth: 200,
          },
        }}>
      <FormControl fullWidth>
        <InputLabel className="select-label">{labelText}</InputLabel>
        {/* default values is index number of enum list */}
        <Select
          labelId="simple-select-label"
          className="simple-select"
          value={defaultValue as string}
          onChange={handleChangeProp}
         
        >
          {/* values are enum keys */}
          {Object.entries(values)?.map((pair, i) => {
            return (
              <MenuItem  key={i} value={pair[0] as string}>{pair[1] as string}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  )
}
