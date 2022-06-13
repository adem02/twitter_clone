import React from 'react'
import { Box, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'


const DataIsFetching = ({ dataLength, information }) => {
    const { pending } = useSelector(state => state.ui)

    return (
        <React.Fragment>
            {pending &&
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                </Box>
            }
            {
                (!pending && dataLength === 0) ?
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <p>{information}</p>
                    </Box> :
                    null
            }
        </React.Fragment>
    )
}

export default DataIsFetching