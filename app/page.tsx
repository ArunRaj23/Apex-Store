import Filters from "@/components/Filters"
import ProductFeed from "@/components/ProductFeed"
import SearchBar from "@/components/SearchBar"
import { fetchAPI } from "@/lib/utils"

export default async function Home() {
  const products: ProductProps[] = await fetchAPI(
    "https://fakestoreapi.com/products"
  )

  return (
    <>
      <article className="flex gap-5 flex-col md:flex-row items-center justify-between mb-10">
        <SearchBar />
        <Filters />
      </article>

      <ProductFeed products={products} />
    </>
  )
}
