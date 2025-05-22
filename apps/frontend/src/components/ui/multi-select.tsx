'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type MultiSelectProps = {
  value: number[]
  onChange: (value: number[]) => void
  items: { value: number, label: string }[]
}

export function MultiSelect({ value, onChange, items }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleSetValue = (val: number) => {
    if (value.includes(val)) {
      onChange(value.filter(item => item !== val))
    }
    else {
      onChange([...value, val])
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="bg-card justify-between"
          role="combobox"
          aria-expanded={open}
        >
          {value.length > 0
            ? items
                .filter(item => value.includes(Number(item.value)))
                .map(f => f.label)
                .join(', ')
            : 'Sélectionner une ou plusieurs catégories'}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandInput placeholder="Chercher une catégorie..." />
          <CommandEmpty>Pas de catégorie trouvée.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {items.map(item => (
                <CommandItem
                  key={item.value}
                  value={item.value.toString()}
                  onSelect={() => {
                    handleSetValue(item.value)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 size-4',
                      value.includes(item.value) ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
