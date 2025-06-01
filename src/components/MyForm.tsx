"use client"

import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"

const formSchema = z
  .object({
    country: z.string().min(1),
    company: z.string().optional(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    state: z.string().optional(),
    address: z.string().min(1),
    apartment: z.string().optional(),
    city: z.string().min(1),
    postcode: z.string().min(1),
    phone: z.string().min(1),
  })
  .refine(
    (data) => {
      if (data.country === "Australia") {
        return !!data.state?.trim()
      }
      return true
    },
    {
      message: "State/Territory is required for Australia",
      path: ["state"],
    }
  )


export default function MyForm() {
  const countries = [
    { label: "Netherlands", value: "Netherlands" },
    { label: "Australia", value: "Australia" },
    { label: "Bangladesh", value: "Bangladesh" },
  ] as const

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    country: "",
    company: "",
    firstName: "",
    lastName: "",
    state: "",
    address: "",
    apartment: "",
    city: "",
    postcode: "",
    phone: "",
  },
})


  const watchCountry = form.watch("country")

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values)
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(values, null, 2)}
          </code>
        </pre>
      )
    } catch (error) {
      console.error("Form submission error", error)
      toast.error("Failed to submit the form. Please try again.")
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        {/* Country Dropdown */}
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Country/Region</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? countries.find(
                            (country) => country.value === field.value
                          )?.label
                        : "Select Country"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Country..." />
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countries.map((country) => (
                          <CommandItem
                            value={country.label}
                            key={country.value}
                            onSelect={() => {
                              form.setValue("country", country.value)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                country.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {country.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company (optional) */}
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company (optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Shadcn Ltd." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* First & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

       {/* Address & Apartment */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <FormField
    control={form.control}
    name="address"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Address</FormLabel>
        <FormControl>
          <Input placeholder="e.g. 123 Main St" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  <FormField
    control={form.control}
    name="apartment"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Apartment, suite, etc. (optional)</FormLabel>
        <FormControl>
          <Input placeholder="e.g. Apt 4B" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>

      {/* City, State, Postcode in one row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Sydney" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Conditionally show State only for Australia */}
        {watchCountry === "Australia" && (
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => {
              const isAustralia = watchCountry === "Australia"
              return (
                <FormItem className={isAustralia ? "" : "hidden"}>
                  <FormLabel>State/Territory</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. NSW"
                      {...field}
                      disabled={!isAustralia}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        )}


        <FormField
          control={form.control}
          name="postcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postcode</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 2000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Phone Number */}
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="e.g. +61 412 345 678" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />


        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
