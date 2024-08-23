"use client"

import { setSearchTerm } from "@/redux/features/filtersSlice"
import { Search } from "lucide-react"
import { useDispatch } from "react-redux"
import { Input } from "./ui/input"

const SearchBar = () => {
  const dispatch = useDispatch()

  return (
    <section className="relative w-[28rem]">
      <Input
        placeholder="Search for products..."
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />
      <Search className="text-input absolute top-2 right-3" />
    </section>
  )
}

export default SearchBar
