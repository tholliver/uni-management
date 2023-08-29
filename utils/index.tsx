import { StudentModel } from '@/app/typos'

export async function getStudents(
  username: string
): Promise<StudentModel[] | undefined> {
  const res = await fetch(`${process.env.API_BASE_URL}/student`)

  if (!res.ok) return undefined

  const students: StudentModel[] = await res.json()
  return students
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json())
