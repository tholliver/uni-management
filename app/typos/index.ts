export type StudentTypo = {
    id?: number,
    student_name: string;
    student_lastname: string;
    date_birth: string;
    email: string;
    phone_number: string;
}
export type Career = {
    id: number;
    career_name: string;
    duration_years: number;
    createdAt: string;
    updatedAt: string;
    careerlevelId: number;
}

export type EducationLevel = {
    id: number;
    level_name: string;
    createdAt: string;
    updatedAt: string;
    careers: Career[];
}
