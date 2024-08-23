"use client"

import { selectTotalItems } from "@/redux/features/cartSlice"
import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { Button } from "./ui/button"

const CartButton = () => {
  const router = useRouter()
  const totalItems = useSelector(selectTotalItems)

  return (
    <div className="relative">
      <Button size={"icon"} onClick={() => router.push("/cart")}>
        <ShoppingCart />
      </Button>

      <p className="bg-secondary text-primary font-medium w-5 h-5 rounded-full grid place-content-center absolute -right-2 -top-2">
        {totalItems}
      </p>
    </div>
  )
}
export default CartButton
