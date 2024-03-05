import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
interface IProps {
  width?: string
  values: Months | Years
  defaultValueIndex: number
  handleChangeProp?: (event: SelectChangeEvent) => void
  labelText?: string
}

export default function AppSelect({
  width,
  values,
  defaultValueIndex,
  handleChangeProp,
  labelText
}: IProps) {
  console.log('handleChangeProp', handleChangeProp)

  const [age, setAge] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    console.log('event', event?.target?.value)
    setAge(event.target.value as string)
  }

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
        <Select
          labelId="simple-select-label"
          className="simple-select"
          value={Object.values(values)[defaultValueIndex] as string}
          onChange={handleChangeProp}
         
        >
          {Object.values(values)?.map((value, i) => {
            return (
              <MenuItem  key={i} value={value as string}>{value as string}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  )
}
