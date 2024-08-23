"use client"

import { removeProduct, updateProduct } from "@/redux/features/cartSlice"
import { Minus, Plus, ShoppingCart, Star } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useDispatch } from "react-redux"
import Wrapper from "./Wrapper"
import { Button } from "./ui/button"

const CartProduct: React.FC<{ product: ProductProps }> = ({ product }) => {
  const { id, description, image, totalPrice, rating, title, quantity } =
    product
  const [item, setItem] = useState(quantity)
  const dispatch = useDispatch()

  const removeProductFromCart = () => {
    dispatch(removeProduct(id))
  }

  const increaseItem = () => {
    const newQuantity = item + 1

    setItem(newQuantity)

    dispatch(updateProduct({ ...product, quantity: newQuantity }))
  }

  const decreaseItem = () => {
    const newQuantity = item !== 1 ? item - 1 : item

    setItem(newQuantity)

    dispatch(updateProduct({ ...product, quantity: newQuantity }))
  }

  return (
    <Wrapper className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-center">
      <div className="mx-auto">
        <Image src={image} alt="product image" width={200} height={200} />
      </div>

      <div className="lg:col-span-3 space-y-2">
        <h3 className="text-3xl font-bold truncate">{title}</h3>

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

        <p className="line-clamp-3">{description}</p>

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

          <p className="text-3xl font-bold">$ {totalPrice.toFixed(2)}</p>
        </div>
      </div>

      <Button variant={"destructive"} onClick={removeProductFromCart}>
        <ShoppingCart className="mr-2" />
        <p>Remove from Cart</p>
      </Button>
    </Wrapper>
  )
}
export default CartProduct
