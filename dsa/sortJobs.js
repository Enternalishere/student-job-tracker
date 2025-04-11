function sortJobsByDate(jobs) {
  return jobs.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
}

// Example usage
const jobs = [
  { company: "Google", role: "SDE Intern", appliedDate: "2025-04-01" },
  { company: "Amazon", role: "Dev Intern", appliedDate: "2025-03-15" },
  { company: "Meta", role: "FE Intern", appliedDate: "2025-04-10" },
];
console.log(sortJobsByDate(jobs));
