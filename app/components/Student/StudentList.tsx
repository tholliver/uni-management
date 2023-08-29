import { StudentModel } from '../../typos'
import { getStudents } from '@/app/tools'
import Image from 'next/image'

export async function StudentList() {
  const artistData: StudentModel[] = await Promise.all([
    getStudents('masaa', 'd'),
  ])

  console.log('', artistData)

  return <div></div>
}
