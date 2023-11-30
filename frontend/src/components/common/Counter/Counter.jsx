import ButtonGroup from '@mui/material/ButtonGroup';
import React from 'react'
import CommonButton from '../commonButton/CommonButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Counter = ({ size, setCount, count }) => {

    return (
        <ButtonGroup>
            <CommonButton
                color='inherit'
                disabled={count > 1 ? false : true}
                size={size}
                variant={'outlined'}
                onClick={() => { setCount((count) => { return count - 1 }) }}
                startIcon={<RemoveIcon />}
            />
            <CommonButton
                color='inherit'
                disabled={false}
                size={size}
                variant={'outlined'}
                children={count}
            />
            <CommonButton
                color='inherit'
                disabled={false}
                size={size}
                variant={'outlined'}
                onClick={() => { setCount((count) => { return count + 1 }) }}
                startIcon={<AddIcon />}
            />

        </ButtonGroup>
    )
}

export default Counter