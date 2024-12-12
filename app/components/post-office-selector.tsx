"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function PostOfficeSelector() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const offices = [
    { value: "Alipur SO", label: "Alipur SO" },
    { value: "Bawana SO", label: "Bawana SO" },
    { value: "Daryapur Kalan BO", label: "Daryapur Kalan BO" },
    { value: "Jungpura SO", label: "Jungpura SO" },
    { value: "Lodi Road HO", label: "Lodi Road HO" },
    { value: "Mungeshpur BO", label: "Mungeshpur BO" },
    { value: "New Friends Colony SO", label: "New Friends Colony SO" },
    { value: "Okhla Industrial Estate SO", label: "Okhla Industrial Estate SO" },
  ]
  const offices2 = [
    { value: "Andheri HO", label: "Andheri HO" },
    { value: "Bandra HO", label: "Bandra HO" },
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
          {value ? offices.find((office) => office.value === value)?.label : "Select office..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opaoffice-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <div>
          {offices.map((office) => (
            <div
              key={office.value}
              className="cursor-pointer p-2 hover:bg-gray-100"
              onClick={() => {
                setValue(office.value === value ? "" : office.value)
                setOpen(false)
              }}
            >
              <Check
                className={`mr-2 h-4 w-4 ${value === office.value ? "opaoffice-100" : "opaoffice-0"}`}
              />
              {office.label}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
