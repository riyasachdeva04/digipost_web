"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const postOffices = [
  { value: "central", label: "Central Post Office" },
  { value: "north", label: "North Branch" },
  { value: "south", label: "South Branch" },
  { value: "east", label: "East Branch" },
  { value: "west", label: "West Branch" },
]

export function PostOfficeSelector() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? postOffices.find((office) => office.value === value)?.label
            : "Select post office..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search post office..." />
          <CommandEmpty>No post office found.</CommandEmpty>
          <CommandGroup>
            {postOffices.map((office) => (
              <CommandItem
                key={office.value}
                value={office.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === office.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {office.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

