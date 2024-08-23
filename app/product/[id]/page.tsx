import ProductDetail from "@/components/ProductDetail"
import { fetchAPI } from "@/lib/utils"

type Prop = {
  params: { id: string }
}

const page = async ({ params: { id } }: Prop) => {
  const product: ProductProps = await fetchAPI(
    `https://fakestoreapi.com/products/${id}`
  )
  return (
    <>
      <ProductDetail product={product} />
    </>
  )
}
export default page
