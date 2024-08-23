import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const { products } = await req.json()

  const redirectURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://apex-st0re.vercel.app"

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

  products.forEach((product: ProductProps) => {
    line_items.push({
      quantity: product.quantity,
      price_data: {
        currency: "USD",
        product_data: {
          images: [product.image],
          name: product.title,
          description: product.description,
        },
        unit_amount: product.price * 100,
      },
    })
  })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: redirectURL + "?status=success",
    cancel_url: redirectURL + "?status=cancel",
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
  })

  return NextResponse.json({ id: session.id })
}
