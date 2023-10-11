import React from 'react'
interface skeProps {
  numberRows: number
}
import { NextPage } from 'next'

export const Skeleton: NextPage<skeProps> = (props) => {
  return (
    <div>
      {[...Array(props.numberRows)].map((row, i) => (
        <div
          key={i}
          className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700  dark:border-gray-700 dark:bg-slate-600 "
        >
          {i === 0 ? (
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-500 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-500"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
          ) : (
            <div className="flex items-center justify-between ">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-500 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-500"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
