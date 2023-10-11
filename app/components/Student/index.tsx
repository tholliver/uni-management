'use client'
import useSWR from 'swr'
import { StudentTypo } from '../../typos'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { fetcher } from '@/utils'
import { Skeleton } from '../Skeleton'

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
        <div>
          <Skeleton numberRows={7} />
        </div>
      </>
    )

  return (
    <div>
      <ul className="max-w-md divide-y  divide-gray-200 dark:divide-gray-700">
        {data.map((student: StudentTypo) => (
          <li key={student.id}>
            <div className="flex items-center space-x-4 pt-3">
              <div className="flex-shrink-0">
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
