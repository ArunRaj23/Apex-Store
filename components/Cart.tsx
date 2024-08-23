"use client"

import { selectTotalItems } from "@/redux/features/cartSlice"
import { RootState } from "@/redux/rootReducer"
import { useSession } from "@clerk/nextjs"
import { loadStripe } from "@stripe/stripe-js"
import { useSelector } from "react-redux"
import CartProduct from "./CartProduct"
import { Button } from "./ui/button"

const Cart = () => {
  const { isSignedIn } = useSession()
  const products = useSelector((state: RootState) => state.cart.products)
  const totalItems = useSelector(selectTotalItems)

  const price = products.reduce(
    (accu: number, item: ProductProps) => accu + item.totalPrice,
    0
  )

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  const stripePromise = loadStripe(publishableKey)

  const onCheckout = async () => {
    const stripe = await stripePromise

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products,
      }),
    })

    const checkoutSession = await response.json()

    if (checkoutSession) {
      const result = await stripe?.redirectToCheckout({
        sessionId: checkoutSession.id,
      })
      result?.error && alert(result.error.message)
    }
  }

  return (
    <>
      <h2 className="text-4xl border-b pb-5">
        {totalItems > 0 ? "Your Shopping Cart" : "Your Cart is Empty!"}
      </h2>

      {totalItems > 0 && (
        <>
          <div className="space-y-16 py-10">
            {products.map((product: ProductProps) => (
              <CartProduct key={product.id} product={product} />
            ))}
          </div>
          <div className="flex flex-col lg:flex-row gap-4 text-center justify-between pt-5">
            <h4 className="text-3xl">
              Subtotal ({totalItems} items):{" "}
              <span className="font-medium">$ {price.toFixed(2)}</span>
            </h4>
            {isSignedIn ? (
              <Button onClick={onCheckout}>Proceed to Checkout</Button>
            ) : (
              <Button disabled>Sign In to Checkout</Button>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default Cart
