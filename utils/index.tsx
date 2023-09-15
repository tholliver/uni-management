import { StudentTypo } from '@/app/typos'

export async function getStudents(
  username: string
): Promise<StudentTypo[] | undefined> {
  const res = await fetch(`${process.env.API_BASE_URL}/student`)

  if (!res.ok) return undefined

  const students: StudentTypo[] = await res.json()
  return students
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json())
