import { Typography } from "@mui/material"

interface IErrorMessage{
    message: string
}

export const ErrorMessage = (props:IErrorMessage)=>{
    const {message} = props
    return (
        <Typography  sx={{margin: '30px 40px'}} color="red">
            {message}
        </Typography>
    )
}