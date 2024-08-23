"use client"

import { setCategory, setOther } from "@/redux/features/filtersSlice"
import { useDispatch } from "react-redux"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

const Filters = () => {
  const dispatch = useDispatch()

  return (
    <section className="flex gap-3">
      <Select onValueChange={(value) => dispatch(setCategory(value))}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Sort by Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="men's clothing">Men&apos;s Clothing</SelectItem>
          <SelectItem value="women's clothing">
            Women&apos;s Clothing
          </SelectItem>
          <SelectItem value="jewelery">Jewelery</SelectItem>
          <SelectItem value="electronics">Electronics</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => dispatch(setOther(value))}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rating">Rating</SelectItem>
          <SelectItem value="price-asc">Price: Low to high</SelectItem>
          <SelectItem value="price-desc">Price: High to low</SelectItem>
        </SelectContent>
      </Select>
    </section>
  )
}

export default Filters
