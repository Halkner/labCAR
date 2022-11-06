export function validateAge(birthDate: any) {
    const current_year = new Date().getFullYear();
    const birthYear = birthDate.split('/')[2];

    const age = current_year - birthYear;

    return age;
}