import useCart from "../hooks/useCart"
import { useState } from "react"
import CartLineItem from "./CartLineItem"
import { Box, Button } from "@mui/material"

const Cart = () => {
    const [confirm, setConfirm] = useState<boolean>(false)
    const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart()

    const onSubmitOrder = () => {
        dispatch({ type: REDUCER_ACTIONS.SUBMIT })
        setConfirm(true)
    }

    const pageContent = confirm
        ? <h2>Thank you for your order.</h2>
        : <>
            <h2 className="offscreen">Cart</h2>
            <ul className="cart">
                {cart.map(item => {
                    return (
                        <CartLineItem
                            key={item.sku}
                            item={item}
                            dispatch={dispatch}
                            REDUCER_ACTIONS={REDUCER_ACTIONS}
                        />
                    )
                })}
            </ul>
            <Box>
                <p style={{fontWeight:'bold',textAlign:'center',marginBottom:'5px'}}>Total Items: {totalItems}</p>
                <p style={{fontWeight:'bold',textAlign: 'center',marginBottom:'5px'}}>Total Price: {totalPrice}</p>
                <Box sx={{ display:'flex', justifyContent:'center'}}>
                    <Button sx={{ width: { xs: '100%', md: '50%'}, mb:'100px'}} variant="contained" disabled={!totalItems} onClick={onSubmitOrder}>
                        Order
                    </Button>
                </Box>    
            </Box>
        </>

    const content = (
        <main className="main main--cart">
            {pageContent}
        </main>
    )

    return content
}
export default Cart