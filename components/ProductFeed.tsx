"use client"

import { RootState } from "@/redux/rootReducer"
import { useSelector } from "react-redux"
import ProductCard from "./ProductCard"

const ProductFeed: React.FC<{ products: ProductProps[] }> = ({ products }) => {
  const searchTerm = useSelector((state: RootState) => state.filters.searchTerm)
  const category = useSelector((state: RootState) => state.filters.category)
  const other = useSelector((state: RootState) => state.filters.other)

  const filteredProducts = products.filter(
    (product: ProductProps) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category !== "" ? product.category.toLowerCase() === category : true)
  )

  switch (other) {
    case "rating":
      filteredProducts.sort(
        (a: ProductProps, b: ProductProps) => b.rating.rate - a.rating.rate
      )
      break
    case "price-asc":
      filteredProducts.sort(
        (a: ProductProps, b: ProductProps) => a.price - b.price
      )
      break
    case "price-desc":
      filteredProducts.sort(
        (a: ProductProps, b: ProductProps) => b.price - a.price
      )
      break
    default:
      filteredProducts.sort((a: ProductProps, b: ProductProps) => a.id - b.id)
      break
  }

  return (
    <article className="grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {filteredProducts.map((product: ProductProps) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </article>
  )
}
export default ProductFeed
