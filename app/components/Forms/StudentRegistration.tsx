'use client'

import { StudentTypo, Career, EducationLevel } from '@/app/typos'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { useState } from 'react'
import { newStudent } from '@/app/tools'
import { fetcher } from '@/utils'

async function sendRequest(url: string, { arg }: { arg: StudentTypo }) {
  // console.log('neww', arg)
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
}
;``
export default function StudentRegistration() {
  const [formData, setFormData] = useState({ ...newStudent })
  const [validationErrors, setValidationErrors] = useState(null)
  const [careerList, setCareerList] = useState<Career[]>()
  const [careerControl, setCareerControl] = useState({
    showCareerLevels: false,
    careerLevelSelected: '',
    careersList: [] as Career[],
  })
  const {
    data,
    error: errorCarreers,
    isLoading,
  } = useSWR('http://localhost:8080/careerlevel', fetcher)
  // http://localhost:8080/career-enrollment
  // http://localhost:8080/student

  const { trigger, isMutating, error } = useSWRMutation(
    'http://localhost:8080/career-enrollment',
    sendRequest
  )

  //-------------------- states - - - - - -

  const setCareer = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(event.target.value, 10)
    console.log(id)
    setFormData((prevFormData) => ({
      ...prevFormData,
      careerId: id,
    }))
    console.log(formData)
  }
  const setCareers = async (career: string) => {
    console.log('name', career)
    const filteredCareers = await data
      .filter((c: EducationLevel) => {
        return c.level_name === career
      })
      .map((c: EducationLevel) => c.careers)
      .reduce((acc, careersArray) => acc.concat(careersArray), [])

    setCareerList(filteredCareers)
    console.log(filteredCareers)

    // setCareerControl((prevCareerControl) => ({
    //   ...prevCareerControl,
    //   careersList: filteredCareers,
    //   showCareerLevels: !prevCareerControl.showCareerLevels,
    // }))
    // setCareerList(filteredCareers)
    handleCareerLevelSelector()
    // console.log(careerControl.careersList)
  }

  const handleCareerLevelSelector = () => {
    setCareerControl({
      ...careerControl,
      showCareerLevels: !careerControl.showCareerLevels,
    })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value

    if (inputValue.length <= 10) {
      const numericOnly = inputValue.replace(/\D/g, '')

      const formattedDate = [
        numericOnly.slice(0, 4),
        numericOnly.slice(4, 6),
        numericOnly.slice(6, 8),
      ].join('-')

      setFormData((prevFormData) => ({
        ...prevFormData,
        date_birth: formattedDate,
      }))
    }
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const result = await trigger(formData)

    if (result.error) {
      setValidationErrors(result.error)
      console.log('error', result?.error)
      return
    }

    setFormData({ ...newStudent })
    setValidationErrors(null)
    console.log(result)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="student_name"
              id="student_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={formData.student_name}
              placeholder=" "
              onChange={handleInputChange}
              required
            />
            <label
              htmlFor="student_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="student_lastname"
              id="student_lastname"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={formData.student_lastname}
              placeholder=" "
              onChange={handleInputChange}
              required
            />
            <label
              htmlFor="student_lastname"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
          </div>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={handleInputChange}
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            id="date_birth"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            name="date_birth"
            value={formData.date_birth}
            onChange={handleDateChange}
            // pattern="\d{4}-\d{2}-\d{2}"
            required
          />
          <label
            htmlFor="date_birth"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Date of Birth (YYY-mm-dd)
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            name="phone_number"
            id="phone_number"
            value={formData.phone_number}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={handleInputChange}
            required
          />
          <label
            htmlFor="phone_number"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone number (123-456-7890)
          </label>
        </div>

        <div>
          <div className="">
            <div className="flex py-6">
              <button
                id="states-button"
                data-dropdown-toggle="dropdown-states"
                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                type="button"
                onClick={handleCareerLevelSelector}
              >
                Choose a Level
              </button>

              <label htmlFor="states" className="sr-only">
                Choose a career
              </label>
              {careerList ? (
                <select
                  id="states"
                  className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={setCareer}
                >
                  <option defaultValue="true">Choose a career</option>
                  {careerList.map((c: Career, i) => (
                    <option key={i} value={c.id}>
                      {c.career_name}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
          </div>
          <div
            id="dropdown-states"
            className={`z-10 ${
              careerControl.showCareerLevels ? '' : 'hidden'
            } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="states-button"
            >
              {data?.map((careerlevel: EducationLevel) => (
                <li key={careerlevel.id}>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setCareers(careerlevel.level_name)}
                  >
                    <div className="inline-flex items-center">
                      {careerlevel.level_name}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {validationErrors ? (
          <div
            className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 mr-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Validation errors!</span> Change a
              few things up and try submitting again.
            </div>
          </div>
        ) : null}

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={isMutating}
        >
          Submit
        </button>
      </form>
    </div>
  )
}
