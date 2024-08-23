"use client"

import { addProduct } from "@/redux/features/cartSlice"
import { Minus, Plus, ShoppingCart, Star } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"

const ProductDetail: React.FC<{ product: ProductProps }> = ({ product }) => {
  const { description, image, price, rating, title } = product
  const [item, setItem] = useState(1)
  const [totalPrice, setTotalPrice] = useState(price)
  const { toast } = useToast()
  const dispatch = useDispatch()

  const increaseItem = () => {
    setItem((prev) => prev + 1)
    setTotalPrice((prev) => prev + price)
  }

  const decreaseItem = () => {
    if (item !== 1) {
      setItem((prev) => prev - 1)
      setTotalPrice((prev) => prev - price)
    }
  }

  const addToCart = () => {
    toast({
      title: "Item added to the cart!",
    })

    dispatch(addProduct({ ...product, quantity: item, totalPrice }))
  }

  return (
    <article className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0 items-center justify-center justify-items-center">
      <section>
        <Image src={image} alt="product image" width={300} height={300} />
      </section>

      <section className="space-y-5">
        <h2 className="text-4xl font-bold">{title}</h2>

        <div className="flex gap-2 items-center">
          <p>{Math.ceil(rating.rate)}</p>

          <div className="flex gap-1">
            {Array(Math.ceil(rating.rate))
              .fill(1)
              .map((_, index) => (
                <Star key={index} className="fill-yellow-500" />
              ))}
          </div>

          <p>| {rating.count} ratings</p>
        </div>

        <p>{description}</p>

        <p className="text-4xl font-bold">$ {totalPrice.toFixed(2)}</p>

        <div className="flex gap-5">
          <div className="flex gap-5 items-center">
            <Button size={"icon"} onClick={decreaseItem}>
              <Minus />
            </Button>
            <p className="text-2xl">{item}</p>
            <Button size={"icon"} onClick={increaseItem}>
              <Plus />
            </Button>
          </div>

          <Button className="flex gap-3 w-full" onClick={addToCart}>
            <ShoppingCart />
            <p>Add to Cart</p>
          </Button>
        </div>
      </section>
    </article>
  )
}
export default ProductDetail
