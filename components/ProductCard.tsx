"use client"

import { useToast } from "@/components/ui/use-toast"
import { addProduct } from "@/redux/features/cartSlice"
import { ShoppingCart, Star } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"

const ProductCard: React.FC<{ product: ProductProps }> = ({ product }) => {
  const { id, category, description, image, price, rating, title } = product
  const { toast } = useToast()
  const router = useRouter()
  const dispatch = useDispatch()

  const addToCart = () => {
    toast({
      description: "Item added to cart.",
    })

    dispatch(addProduct({ ...product, quantity: 1, totalPrice: price }))
  }

  return (
    <Card className="shadow-lg max-w-sm mx-auto overflow-x-hidden">
      <CardHeader
        onClick={() => router.push(`/product/${id}`)}
        className="cursor-pointer bg-white"
      >
        <Badge className="w-fit italic" variant={"secondary"}>
          {category}
        </Badge>

        <Image
          src={image}
          alt="product image"
          width={240}
          height={240}
          className="mx-auto w-72 h-60 object-contain"
        />
      </CardHeader>
      <CardContent className="space-y-3">
        <CardTitle className="truncate">{title}</CardTitle>

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

        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>

        <p className="text-2xl font-bold">$ {price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button className="flex gap-3 w-full" onClick={addToCart}>
          <ShoppingCart />
          <p>Add to Cart</p>
        </Button>
      </CardFooter>
    </Card>
  )
}
export default ProductCard
