// import { StudentModel } from '../typos'

// async function getStudents(id: string): Promise<StudentModel> {
//     // Fetch user data using the provided id
//     const response = await fetch(`${process.env.API_BASE_URL}/student`); // Replace with your API endpoint
//     const data = await response.json();
//     return data;
// }

export async function getStudents(username: string, path: string) {
    const res = await fetch(`${process.env.API_BASE_URL}/${path}`)
    return res.json()
}

export const newStudent = {
    student_name: '',
    student_lastname: '',
    date_birth: '',
    email: '',
    phone_number: '',
    careerId: NaN
}

