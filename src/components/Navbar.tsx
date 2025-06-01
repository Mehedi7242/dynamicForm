"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <a href="/" className="text-xl font-bold text-black dark:text-white">
            Dynamic Form
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <a href="/" className="text-black dark:text-white hover:text-gray-500 transition">
              Home
            </a>
            <a href="/" className="text-black dark:text-white hover:text-gray-500 transition">
              About
            </a>
            <a href="/" className="text-black dark:text-white hover:text-gray-500 transition">
              Contact
            </a>
            <Button size="sm" variant="default">
              Login
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isOpen ? <X className="h-5 w-5 text-black dark:text-white" /> : <Menu className="h-5 w-5 text-black dark:text-white" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-black">
          <a href="/" className="block text-black dark:text-white hover:text-gray-500 transition">
            Home
          </a>
          <a href="/" className="block text-black dark:text-white hover:text-gray-500 transition">
            About
          </a>
          <a href="/" className="block text-black dark:text-white hover:text-gray-500 transition">
            Contact
          </a>
          <Button size="sm" className="w-full">
            Login
          </Button>
        </div>
      )}
    </nav>
  )
}
