import { useEffect, useState } from "react"
import { TaskListType } from "@/types/types"

type UseFetchTasksType = {
  tasks: TaskListType
  onRemove: (id: string) => void
  onComplete: (id: string, done: boolean) => void
  onEdit: (id: string, title: string) => void
  onAdd: (title: string) => void
}

export function useFetchTasks(endpoint: string): UseFetchTasksType {
  const [tasks, setTasks] = useState<TaskListType>([])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(endpoint)
        if (!res.ok) {
          throw new Error(`Error API ${res.status}, ${res.statusText}`)
        }
        const data = await res.json()
        setTasks(data)
      } catch (error) {
        console.log(
          "Somthing wrong while fetching tasks",
          (error as Error).message
        )
      }
    }
    fetchTasks()
  }, [endpoint])

  const onRemove = async (id: string) => {
    try {
      const res = await fetch(`${endpoint}${id}`, { method: "DELETE" })
      if (!res.ok) {
        throw new Error(`Error API ${res.status}, ${res.statusText}`)
      }
      setTasks((prev) => prev.filter((task) => task.id !== id))
    } catch (error) {
      console.log(
        `Somthing wrong while Removing task that id is ${id}`,
        (error as Error).message
      )
    }
  }

  const onComplete = async (id: string, done: boolean) => {
    try {
      const res = await fetch(`${endpoint}${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, done: !done }),
      })
      if (!res.ok) {
        throw new Error(`Error API ${res.status}, ${res.statusText}`)
      }
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, done: !done } : task))
      )
    } catch (error) {
      console.log(
        `Somthing wrong while toggle complete task that id is ${id}`,
        (error as Error).message
      )
    }
  }

  const onEdit = async (id: string, title: string) => {
    try {
      const res = await fetch(`${endpoint}${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title }),
      })
      if (!res.ok) {
        throw new Error(`Error API ${res.status}, ${res.statusText}`)
      }
      setTasks((prev) =>
        prev.map((item) => (item.id === id ? { ...item, title } : item))
      )
    } catch (error) {
      console.log(
        `Somthing wrong while editing task that id is ${id}`,
        (error as Error).message
      )
    }
  }

  const onAdd = async (title: string) => {
    try {
      const res = await fetch(`${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, done: false }),
      })
      if (!res.ok) {
        throw new Error(`Error API ${res.status}, ${res.statusText}`)
      }

      const newTask = await res.json()
      setTasks((prev) => [...prev, newTask])
    } catch (error) {
      console.log(
        `Somthing wrong while adding new task`,
        (error as Error).message
      )
    }
  }

  return {
    tasks,
    onRemove,
    onComplete,
    onEdit,
    onAdd,
  }
}
