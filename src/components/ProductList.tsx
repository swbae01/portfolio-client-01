import useCart from "../hooks/useCart"
import useProducts from "../hooks/useProducts"
import { ReactElement, useEffect } from "react"
import Product from "./Product"
import useAuth from "../hooks/useAuth"
import Grid from '@mui/material/Grid';

export type ProductType = {
    sku: string,
    name: string,
    price: number,
    img: string,
    imgName: string
}

export type UseProductsContextType = {
    products: ProductType[],
    setProducts:React.Dispatch<React.SetStateAction<ProductType[]>>
}

const ProductList = () => {
    const { dispatch, REDUCER_ACTIONS, cart } = useCart()
    const { products, setProducts } = useProducts()
    const { auth }: any = useAuth()

    console.log("-----------Auth Check-----------", auth)

    let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>

    useEffect(() => {
        const fetchProducts = async (): Promise<ProductType[]> => {
            const data = await fetch('https://jovely12.kro.kr/visitor')
                .then(res => {
                    return res.json()
                })
                .catch(err => {
                    if (err instanceof Error) console.log(err.message)
                })
            return data
        }
        fetchProducts().then(products => setProducts(products))
    }, [])


    if (products?.length) {
        console.log("data",products)
        pageContent = products.map(product => {
            const inCart: boolean = cart.some(item => item.sku === product.sku)
           
            return (
                <Grid item sx={{display:'flex',justifyContent:'center'}} xs={12} sm={6} md={4} lg={3}>
                <Product
                    key={product.sku}
                    product={product}
                    dispatch={dispatch}
                    REDUCER_ACTIONS={REDUCER_ACTIONS}
                    inCart={inCart}
                />
                </Grid>
            )
        })
    }

    const content = (
        <main className="main main--products">
            <Grid container spacing={6}>
                {pageContent}
            </Grid>
        </main>
    )

    return content
}
export default ProductList