import { Student as StudentC } from '../components/Student'
import StudentRegistration from '../components/Forms/StudentRegistration'

export default async function Student() {
  return (
    <div id="student-list" className="grid grid-cols-1 sm:grid-cols-2 gap-4  ">
      <div className="m-6 col-span-1 sm:col-span-3/5">
        <h4 className="font-bold ">Student List</h4>
        <div className="mt-5">
          <StudentC />
        </div>
      </div>
      <div className=" m-6 col-span-1 sm:col-span-2/5 ">
        <h4 className="font-extrabold ">Student Registration</h4>
        <div className="mt-5">
          <StudentRegistration />
        </div>
      </div>
    </div>
  )
}
