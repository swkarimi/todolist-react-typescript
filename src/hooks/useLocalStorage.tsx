import { Dispatch, SetStateAction, useEffect, useState } from "react"

export function useLocalStorage<T>(
  key: string,
  initalValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [storedValues, setStoredValues] = useState<T>(() => {
    try {
      const values = localStorage.getItem(key)
      return values ? JSON.parse(values) : initalValue
    } catch (error) {
      console.log(
        "Error receiving data from localStorage",
        (error as Error).message
      )
      return initalValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValues))
    } catch (error) {
      console.log("Error saving data to localStorage", (error as Error).message)
    }
  }, [key, storedValues])

  return [storedValues, setStoredValues]
}
