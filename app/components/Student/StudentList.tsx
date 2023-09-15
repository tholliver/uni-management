import { StudentTypo } from '../../typos'
import { getStudents } from '@/app/tools'
import Image from 'next/image'

export async function StudentList() {
  const artistData: StudentTypo[] = await Promise.all([
    getStudents('masaa', 'd'),
  ])

  console.log('', artistData)

  return <div></div>
}
