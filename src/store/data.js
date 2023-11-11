import st1 from '../images/student1.jpg'
import st2 from '../images/student2.jpg'
import st3 from '../images/student3.jpg'
import st4 from '../images/student4.jpg'
import st5 from '../images/student5.jpg'
import st6 from '../images/student6.jpg'
import st7 from '../images/student7.jpg'
import st8 from '../images/student8.jpg'

const stImages = [st1, st2, st3, st4, st5, st6, st7, st8]
export function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * stImages.length);
    return stImages[randomIndex];
}
const sgpaData = [];
const subNamesMap = {
    'Mathematics I': 'MATH101',
    'Physics I': 'PHYS101',
    'Chemistry I': 'CHEM101',
    'Introduction to Programming': 'COMP101',
    'Engineering Mechanics': 'ENGR101',
    'Data Structures': 'COMP201',
    'Digital Electronics': 'ELEC101',
    'Communication Skills': 'ENGL101',
    'Engineering Drawing': 'ENGR102',
    'Thermodynamics': 'MECH201',
    'Algorithms': 'COMP301',
    'Material Science': 'MATS101',
    'Circuit Theory': 'ELEC201',
    'Environmental Science': 'ENVS101',
    'Robotics': 'MECH301',
    // Add more real engineering subjects and corresponding codes as needed
};

const indianNames = [
    'Aarav Patel',
    'Aarohi Gupta',
    'Advait Kumar',
    'Ananya Singh',
    'Arjun Sharma',
    'Ishaan Verma',
    'Kavya Kapoor',
    'Rohan Singh',
    'Sanya Bhatia',
    'Shivansh Yadav',
    'Tanvi Sharma',
    'Aryan Kapoor',
    'Prisha Verma',
    'Vivaan Singh',
    'Anika Gupta',
    'Shaurya Bhatia',
    'Siya Yadav',
    'Kabir Verma',
    'Aditi Kapoor',
    // Add more Indian names
];

for (let i = 1; i <= 20; i++) {
    const subjects = generateRandomSubjects();

    const studentData = {
        logo: getRandomImage(),
        name: indianNames[i - 1] || `Student ${i}`,
        id: i,
        rollNo: 400 + i,
        semNo: i % 8 + 1,
        subjects: subjects.map(sub => ({ ...sub, subName: subNamesMap[sub.subName] })),
        gradePoints: calculateGradePoints(subjects).toFixed(2),
        type: "SGPA"
    };

    sgpaData.push(studentData);
}

function generateRandomSubjects() {
    const numSubjects = Math.floor(Math.random() * 5) + 1; // Random number of subjects between 1 and 5
    const availableSubjects = Object.keys(subNamesMap);
    const selectedSubjects = [];

    for (let i = 0; i < numSubjects; i++) {
        const randomIndex = Math.floor(Math.random() * availableSubjects.length);
        const subName = availableSubjects.splice(randomIndex, 1)[0];
        const Credits = Math.floor(Math.random() * 4) + 1; // Random number of credits between 1 and 4
        const gpa = getRandomGPA();

        selectedSubjects.push({ subId: i + 1, subName, Credits, gpa });
    }

    return selectedSubjects;
}

function getRandomGPA() {
    return Math.floor(Math.random() * (10 - 4 + 1)) + 4;
}

function calculateGradePoints(subjects) {
    const totalCredits = subjects.reduce((total, subject) => total + subject.Credits, 0);
    const totalGradePoints = subjects.reduce((total, subject) => total + subject.gpa * subject.Credits, 0);

    return totalGradePoints / totalCredits;
}

export const dataSgpa = sgpaData

const cgpaData = [];

const names = [
    'Arjun Reddy',
    'Lakshmi Devi',
    'Vikram Gopal',
    'Sahithi Vartakudu',
    'Devi Prasanna',
    'Harshit Raju',
    'Saumya Sharma',
    'Mohan Kumar',
    'Sai Krishna',
    'Lalith Kumar',
    'Shreya Reddy',
    'Anirudh Babu',
    'Suneetha Raju',
    'Pradeep Kumar',
    'Sri Devi',
    'Vijay Kumar',
    'Navin Reddy',
    'Madhavi Patakudu',
    'Archana Vyas',
    'Vinay Raju'
];




for (let i = 1; i <= 20; i++) {
    const semesters = generateRandomSemesters();

    const studentData = {
        logo: getRandomImage(),
        name: names[i - 1] || `Student ${i}`,
        id: i,
        rollNo: 500 + i,
        semesters,
        gradePoints: calculateCgpaPoints(semesters),
        type: "CGPA"
    };

    cgpaData.push(studentData);
}

function generateRandomSemesters() {
    const numSemesters = Math.floor(Math.random() * 8) + 1; // Random number of semesters between 1 and 6
    const semesters = [];

    for (let i = 1; i <= numSemesters; i++) {
        const totalCredits = Math.floor(Math.random() * 10) + 15; // Random number of total credits between 15 and 24
        const creditsAwarded = Math.floor(Math.random() * totalCredits) + 1; // Random number of credits awarded between 1 and totalCredits
        const sgpa = (Math.random() * (10 - 4) + 4).toFixed(2); // Random SGPA between 4 and 10

        semesters.push({ semNo: i, totalCredits, creditsAwarded, sgpa: parseFloat(sgpa) });
    }
    return semesters.sort((a, b) => a.semNo - b.semNo);
}

function calculateCgpaPoints(semesters) {
    const totalCredits = semesters.reduce((total, semester) => total + semester.totalCredits, 0);
    const totalGradePoints = semesters.reduce((total, semester) => total + semester.creditsAwarded * semester.sgpa, 0);

    return (totalGradePoints / totalCredits).toFixed(2);
}
export const dataCgpa = cgpaData

