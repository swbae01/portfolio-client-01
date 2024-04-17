import { AppBar, Box, Typography } from "@mui/material"
import useCart from "../hooks/useCart"

type PropsType = {
    viewCart: boolean,
}

const Footer = ({ viewCart }: PropsType) => {
    const { totalItems, totalPrice } = useCart()

    const year: number = new Date().getFullYear()

    const content = (
        <AppBar
            position="fixed"
            color="primary"
            sx={{bgcolor: 'purple',height: 60,top: 'auto',bottom: 0}}>
            <Box sx={{ display: 'flex', alignItems:'center', pt: 1}}>
                    <Box sx={{ display: 'block',alignItems:'center', ml: 2}}>
                        <Typography sx={{align:'center'}}>Total Items: {totalItems}</Typography>
                        <Typography sx={{align:'center'}}>Total Price: {totalPrice}</Typography>
                    </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Typography sx={{align: 'right', mr: 2}}>Shopping Cart &copy; {year}</Typography>
            </Box>
        </AppBar>
    )

    return content
}
export default Footer