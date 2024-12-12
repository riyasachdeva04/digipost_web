"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function CitySelector() {
  

  // Simplified cities list with just Delhi and Mumbai
  const cities = [
    { value: "delhi", label: "Delhi" },
    { value: "mumbai", label: "Mumbai" },
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? cities.find((city) => city.value === value)?.label : "Select city..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <div>
          {cities.map((city) => (
            <div
              key={city.value}
              className="cursor-pointer p-2 hover:bg-gray-100"
              onClick={() => {
                setValue(city.value === value ? "" : city.value)
                setOpen(false)
              }}
            >
              <Check
                className={`mr-2 h-4 w-4 ${value === city.value ? "opacity-100" : "opacity-0"}`}
              />
              {city.label}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
