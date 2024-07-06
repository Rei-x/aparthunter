"use client";

import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useQueryStates } from "nuqs";
import { filtersParsers, Sort } from "../searchParams";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SliderTwoThumb } from "@/components/ui/slider";
import { api } from "@/trpc/react";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CommandList } from "cmdk";

// export function ComboboxDemo() {
//   const [open, setOpen] = React.useState(false);
//   const [value, setValue] = React.useState("");

//   return (

//   );
// }

export const Filters = () => {
  const [filters, setFilters] = useQueryStates(filtersParsers, {
    clearOnDefault: true,
    throttleMs: 350,
  });
  // const [filters, setFilters] = useState(queryFilters);
  const [areCitiesOpen, setAreCitiesOpen] = useState(false);
  const [cities] = api.post.cities.useSuspenseQuery();

  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.refresh();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [router, filters, setFilters]);

  return (
    <div>
      <Collapsible
        open={areFiltersOpen}
        onOpenChange={setAreFiltersOpen}
        className="mb-8"
      >
        <div className="flex gap-2">
          <div className="relative h-full flex-grow">
            <Input
              placeholder="Wyszukaj..."
              value={filters.q}
              onChange={(e) =>
                void setFilters((prev) => ({ ...prev, q: e.target.value }))
              }
              className="w-full py-3 pl-10 pr-4 text-lg"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
              size={24}
            />
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="mb-4 flex items-center gap-2">
              {areFiltersOpen ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
              Filtry
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="CollapsibleContent">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <Popover open={areCitiesOpen} onOpenChange={setAreCitiesOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={areCitiesOpen}
                        className="w-[300px] justify-between"
                      >
                        {filters.city
                          ? cities.find(
                              (city) =>
                                city.name.toLowerCase() ===
                                filters.city.toLowerCase(),
                            )?.name
                          : "Wybierz miasto..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search framework..." />
                        <CommandList className="max-h-96 overflow-y-scroll">
                          <CommandEmpty>Brak takiego miasta</CommandEmpty>
                          <CommandGroup>
                            {cities.map((city) => (
                              <CommandItem
                                key={city.name}
                                value={city.name}
                                onSelect={(currentValue) => {
                                  void setFilters((prev) => ({
                                    ...prev,
                                    city:
                                      currentValue === city.name
                                        ? ""
                                        : currentValue,
                                  }));

                                  setAreCitiesOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    filters.city.toLowerCase() ===
                                      city.name.toLowerCase()
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {city.name} - {city._count.SaleApartment}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="col-span-full">
                  <Label>
                    {filters.minPrice.toLocaleString("pl")} zł -{" "}
                    {filters.maxPrice.toLocaleString("pl")} zł
                  </Label>
                  <SliderTwoThumb
                    min={0}
                    max={1_000_000}
                    step={10000}
                    value={[filters.minPrice, filters.maxPrice]}
                    onValueChange={([min, max]) => {
                      void setFilters((filters) => ({
                        ...filters,
                        minPrice: min ?? 0,
                        maxPrice: max ?? 10_000_000,
                      }));
                    }}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Sortowanie</Label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      disabled={filters.sortBy === Sort.offerDate}
                      onClick={() =>
                        void setFilters((prev) => ({
                          ...prev,
                          sortBy: Sort.offerDate,
                        }))
                      }
                      className={cn("flex-grow")}
                    >
                      Data wystawienia
                    </Button>
                    <Button
                      disabled={filters.sortBy === Sort.price}
                      variant="outline"
                      onClick={() =>
                        void setFilters((prev) => ({
                          ...prev,
                          sortBy: Sort.price,
                        }))
                      }
                      className={cn("flex-grow")}
                    >
                      Cena
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
