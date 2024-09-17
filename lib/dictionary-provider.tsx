// dictionary-provider.tsx
'use client'

import React from "react"
import { getDictionary } from "./dictionary"

type Dictionary = Awaited<ReturnType<typeof getDictionary>>

// Create a context that includes both the dictionary and the lang value
const DictionaryContext = React.createContext<{ dictionary: Dictionary; lang: string } | null>(null)

export default function DictionaryProvider({
  dictionary,
  lang,
  children,
}: {
  dictionary: Dictionary
  lang: string  // Add lang as a prop
  children: React.ReactNode
}) {
  return (
    <DictionaryContext.Provider value={{ dictionary, lang }}>
      {children}
    </DictionaryContext.Provider>
  )
}

// Hook to access both the dictionary and lang
export function useDictionary() {
  const context = React.useContext(DictionaryContext)
  if (context === null) {
    throw new Error('useDictionary hook must be used within DictionaryProvider')
  }

  return context
}
