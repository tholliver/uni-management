'use client'
import useSWR from 'swr'
import { StudentModel } from '../../typos'
import Image from 'next/image'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { fetcher } from '@/utils'

export function Student() {
  // const studentData = await getStudents('s')
  const { data, error, isLoading } = useSWR(
    'http://localhost:8080/student',
    fetcher
  )

  // console.log('', studentData)

  if (error)
    return (
      <>
        <div>Error | error getting data</div>{' '}
      </>
    )

  if (isLoading)
    return (
      <>
        <div>Loading | getting data</div>{' '}
      </>
    )

  return (
    <div>
      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {data?.map((student: StudentModel) => (
          <li key={student.id}>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {/* <Image
                  src="https://static.thenounproject.com/png/2366460-200.png"
                  alt="no-image"
                  width={50}
                  height={50}
                  style={{ maxWidth: '100%', height: 'auto' }}
                /> */}
                <AccountBoxIcon />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {student.student_name} {student.student_lastname}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {student.email}
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {student.date_birth}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
