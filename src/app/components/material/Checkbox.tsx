import * as React from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

interface IProps {
    label?: string
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    checked: boolean
}

export default function CheckboxLabel({ label, handleChange, checked }: IProps) {
    return (
        <FormGroup>
            <FormControlLabel control={<Checkbox onChange={handleChange} checked={checked} />} label={label ?? "Label"} title="Use to allow full set searching" />
        </FormGroup>
    )
}
