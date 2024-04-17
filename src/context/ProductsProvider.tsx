import { createContext, ReactElement, useState, useEffect } from "react"

export type ProductType = {
    sku: string,
    name: string,
    price: number,
    img: string,
    imgName: string
}

const initState: ProductType[] = []

export type UseProductsContextType = {
    products: ProductType[],
    setProducts:React.Dispatch<React.SetStateAction<ProductType[]>>
}

const initContextState: UseProductsContextType = {
    products: [],
    setProducts: ()=>{} //불확실
}

const ProductsContext = createContext<UseProductsContextType>(initContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>(initState)

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

    return (
        <ProductsContext.Provider value={{ products, setProducts }}>
          {children}
        </ProductsContext.Provider>
    )

}

export default ProductsContext 