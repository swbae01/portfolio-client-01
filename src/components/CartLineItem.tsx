import { CartItemType } from "../context/CartProvider"
import { ReducerAction } from "../context/CartProvider"
import { ReducerActionType } from "../context/CartProvider"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ImageListItem from '@mui/material/ImageListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Box, Container, Typography } from "@mui/material"
import {uploads} from "./Product"

type PropsType = {
    item: CartItemType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
}

const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS }: PropsType) => {
console.log(item)
    const lineTotal: number = (item.qty * item.price)

    const onRemoveFromCart = () => dispatch({
        type: REDUCER_ACTIONS.REMOVE,
        payload: item,
    })

    const content = (
        <Container maxWidth="sm">
            <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem
                    secondaryAction={
                        <IconButton                     
                        className="cart__button"
                        title="Remove Item From Cart"
                        onClick={onRemoveFromCart}
                    >
                        <DeleteOutlineIcon />
                    </IconButton>
                    }
                >
                    <Box>
                        <ImageListItem sx={{height:80,width:80}}>
                            <img alt={item.name} src={`${uploads}${item.imgName}`}/>                            
                        </ImageListItem>
                        <Typography sx={{fontWeight:'bold', mt:1}}>{item.name}</Typography>
                        <Box sx={{display:'block'}}>
                            <ListItemText>Price: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}</ListItemText>
                            <ListItemText>Quantity: {item.qty}</ListItemText>
                            <ListItemText>Total: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(lineTotal)}</ListItemText>
                        </Box>
                    </Box>
                </ListItem>
            </List>
        </Container>
    )
    return content
}

export default CartLineItem