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
    value: "planId",
    name: "proID-testPlans-planId",
    to: "/:proID/testPlans/:planId",
  },
  {
    title: "Test Case",
    value: "caseId",
    name: "proID-testPlans-planId-caseId",
    to: "/:proID/testPlans/:planId/:caseId",
  },
  {
    title: "Test Runs",
    value: "testRuns",
    name: "proID-testRuns",
    to: "/:proID/testRuns",
  },
  {
    title: "Test Run",
    value: "runId",
    name: "proID-testRuns-runId",
    to: "/:proID/testRuns/:runId",
  },
];

export const getRoute = (value: string) => {
  return existRoutes.find((route) => route.value === value);
};
