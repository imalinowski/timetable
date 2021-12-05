const Departments = [
    {
        name:"BSc Computer science"
    },
    {
        name:"BSc Microbiology"
    },
    {
        name:"BSc Biotechnology"
    },
    {
        name:"BSc Biochemistry"
    },
    {
        name:"BA Economics"
    },
    {
        name:"BA English"
    },
    {
        name:"BA West Asian Studies"
    },
    {
        name:"B.Com Computer Application"
    },
    {
        name:"B.Com Co-op"
    },
    {
        name:"BBA"
    },
    {
        name:"BVoc Logistics"
    },
    {
        name:"BVoc Professional Accounting and Taxation"
    },
    {
        name:"BSc Maths and Physics"
    }
]

const Semesters = [
    {
        name: "1st semester"
    },
    {
        name: "2nd semester"
    },
    {
        name: "3rd semester"
    },
    {
        name: "4th semester"
    },
    {
        name: "5th semester"
    },
    {
        name: "6th semester"
    },
];

const STORAGE_KEYS = {
    SEMESTER:'user-sem',
    DEPARTMENT:'user-dept'
}

const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JULY",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
];
const days = [
    { short: "mon", full: "Monday" },
    { short: "tue", full: "Tuesday" },
    { short: "wed", full: "Wednesday" },
    { short: "thu", full: "Thursday" },
    { short: "fri", full: "Friday" },
];

const common = [
    "9:00AM - 9:45AM",
    "9:50AM - 10:30AM",
    "10:50AM - 11:30AM",
    "11:40AM - 12:30PM",
    "12:30PM - 1:15PM",
];
const special = [
    "8:45AM - 9:25AM",
    "9:30AM - 10:10AM",
    "10:15AM - 10:55AM",
    "11:00AM - 11:40AM",
    "11:45AM - 12:15PM"
];
const periodTime = [common, common, common, common, special]

export {periodTime, months, days, Departments, Semesters, STORAGE_KEYS};
