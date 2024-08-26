'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Total Elite Training
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="hover:bg-gray-700 px-3 py-2 rounded-md">Inicio</Link>
              <Link href="#" className="hover:bg-gray-700 px-3 py-2 rounded-md">Disciplinas</Link>
              <Link href="#" className="hover:bg-gray-700 px-3 py-2 rounded-md">Horarios</Link>
              <Link href="#" className="hover:bg-gray-700 px-3 py-2 rounded-md">Instructores</Link>
              <Link href="#contact" className="hover:bg-gray-700 px-3 py-2 rounded-md">Contacto</Link>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block hover:bg-gray-700 px-3 py-2 rounded-md">Inicio</Link>
            <Link href="#" className="block hover:bg-gray-700 px-3 py-2 rounded-md">Disciplinas</Link>
            <Link href="#" className="block hover:bg-gray-700 px-3 py-2 rounded-md">Horarios</Link>
            <Link href="#" className="block hover:bg-gray-700 px-3 py-2 rounded-md">Instructores</Link>
            <Link href="#contact" className="block hover:bg-gray-700 px-3 py-2 rounded-md">Contacto</Link>
          </div>
        </div>
      )}
    </nav>
  )
}