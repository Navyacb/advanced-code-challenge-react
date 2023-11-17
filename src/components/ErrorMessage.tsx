import { Typography } from "@mui/material"

export const ErrorMessage = (props:any)=>{
    const {message} = props
    return (
        <Typography  sx={{margin: '30px 40px'}} color="red">
            {message}
        </Typography>
    )
}