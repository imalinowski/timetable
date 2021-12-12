const Departments = [
    {
        name: "BSc Computer science"
    },
    {
        name: "BSc Microbiology"
    },
    {
        name: "BSc Biotechnology"
    },
    {
        name: "BSc Biochemistry"
    },
    {
        name: "BA Economics"
    },
    {
        name: "BA English"
    },
    {
        name: "BA West Asian Studies"
    },
    {
        name: "B.Com Computer Application"
    },
    {
        name: "B.Com Co-op"
    },
    {
        name: "BBA"
    },
    {
        name: "BVoc Logistics"
    },
    {
        name: "BVoc Professional Accounting and Taxation"
    },
    {
        name: "BSc Maths and Physics"
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
    {short: "mon", full: "Monday"},
    {short: "tue", full: "Tuesday"},
    {short: "wed", full: "Wednesday"},
    {short: "thu", full: "Thursday"},
    {short: "fri", full: "Friday"},
];

const common = [
    "9:30AM - 11:05AM",
    "11:15AM - 12:50AM",
    "13:40AM - 15:15AM",
    "15:25AM - 17:00PM",
    "17:10PM - 18:40PM",
];

const periodTime = [common, common, common, common, common]

const serverURL = "http://localhost:8080/"

export {serverURL, periodTime, months, days, Departments, Semesters, common};
