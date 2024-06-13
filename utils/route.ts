export const existRoutes = [
  {
    title: "Home",
    value: "",
    name: "",
    to: "/",
  },
  {
    title: "Overview",
    value: "proID",
    name: "proID",
    to: "/:proID",
  },
  {
    title: "Test Plans",
    value: "testPlans",
    name: "proID-testPlans",
    to: "/:proID/testPlans",
  },
  {
    title: "Test Cases",
    value: "planID",
    name: "proID-testPlans-planID",
    to: "/:proID/testPlans/:planID",
  },
  {
    title: "Test Case",
    value: "caseID",
    name: "proID-testPlans-planID-caseID",
    to: "/:proID/testPlans/:planID/:caseID",
  },
  {
    title: "Test Runs",
    value: "testRuns",
    name: "proID-testRuns",
    to: "/:proID/testRuns",
  },
  {
    title: "Test Run",
    value: "runID",
    name: "proID-testRuns-runID",
    to: "/:proID/testRuns/:runID",
  },
];

export const getRoute = (value: string) => {
  return existRoutes.find((route) => route.value === value);
};
