'use client'
import StudentStatCard from './components/Cards/intex'
import BaseCard from './components/Cards/BaseCard'
import useSWR from 'swr'
import { fetcher } from '@/utils'

export default function Home() {
  const { data, error, isLoading } = useSWR(
    'http://localhost:8080/dashboard',
    fetcher
  )
  if (isLoading) return <div>Loading...</div>

  return (
    <div className="dark:divide-gray-700">
      <div className="flex items-center space-x-8  text-sm ">
        <StudentStatCard />
        <BaseCard stat={data[0].num_of_careers} />
        <BaseCard stat={data[0].num_of_students} />
      </div>
    </div>
  )
}
