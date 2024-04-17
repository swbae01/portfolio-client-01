import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { green, red } from '@mui/material/colors';
import { ProductType } from "../context/ProductsProvider"
import { ReducerActionType, ReducerAction } from "../context/CartProvider"
import { ReactElement } from "react"
import { useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import useProducts from "../hooks/useProducts";
import CheckIcon from '@mui/icons-material/Check';
const DEL_URL = '/product';

type PropsType = {
    product: ProductType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
    inCart: boolean,
}

export const uploads = 'https://jovely12.kro.kr/uploads/'

const Product = ({ product, dispatch, REDUCER_ACTIONS, inCart }: PropsType): ReactElement => {
    const navigate = useNavigate();
    const { auth }: any = useAuth();
    const { products, setProducts } = useProducts();

    const onAddToCart = () => dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1, imgName: product.imgName } })

    const handleDelete = async (sku: string, imgName: string) => {
        try {
            const response = await axios.delete(DEL_URL,
                {
                    data: { sku, imgName },
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth?.accessToken}`
                    },
                    withCredentials: true
                }
            );
            const newProducts = products.filter(function (product) {
                return product.sku !== sku
            })
            setProducts(newProducts)
            console.log(JSON.stringify(response?.data));
            console.log("------------------Delete------------------")

        } catch (err) {
            console.log(err)
        }
    }

    const handleEdit = async (sku: string, name: string, price: number, img: string, imgName: string) => {
        navigate('/new', { state: { sku, name, price, img, imgName } });
    }

    let icons = null
    if (auth.accessToken) {
        icons = (auth?.roles[2])
            ? <>
                <IconButton onClick={() => { handleDelete(product.sku, product.imgName) }}>
                    <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => { handleEdit(product.sku, product.name, product.price, product.img, product.imgName) }}>
                    <EditIcon />
                </IconButton>
            </>
            : null
    }

    const itemInCart = inCart ? { bgcolor: red[500] } : { bgcolor: green[500] }
    const itemIcon = inCart ? <CheckIcon/> : 'E'
    const content =
        <Card sx={{ pl: 1, pr: 1, boxShadow: 5}}>
        <CardHeader
            avatar={
                <Avatar sx={itemInCart}>
                {itemIcon}  
                </Avatar>
            }
            title={product.name}
        />
        <CardMedia
            component="img"
            image={`${uploads}${product.imgName}`}
            alt={product.name}
            className="product__img"
            sx={{ width: 300, height:300}}
        />
        <IconButton aria-label="add to favorites">
            <IconButton onClick={onAddToCart}>
                <ShoppingCartIcon />
            </IconButton>
            {icons}
        </IconButton>
        </Card>
    return content
}

export default Product