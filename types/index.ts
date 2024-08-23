type WrapperProps = {
  children: React.ReactNode
  className: string
}

type SocialProps = {
  name: string
  icon: JSX.Element
  url: string
}

type ProductProps = {
  id: number
  title: string
  price: number
  totalPrice: number
  quantity: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}
