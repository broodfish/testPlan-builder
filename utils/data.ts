export const projects: CustomProject[] = [
  {
    id: 1,
    name: "ZCP-Web",
    createdTime: "2024/01/01 13:57",
    plans: [
      {
        id: 11,
        title: "Test Plan v0.0.1",
        description: "This is a test plan",
        createdTime: "2024/01/01 13:57",
        cases: [],
      },
      {
        id: 12,
        title: "Test Plan v0.0.2",
        description: "This is a test plan",
        createdTime: "2024/01/01 13:57",
        cases: [
          {
            suite: "Login functionality",
            list: [
              {
                id: 121,
                description: "Log in by username and password",

                priority: "High",
                prerequisite: "",
                steps: [
                  {
                    id: 1211,
                    action: "Open browser",
                    inputs: "https://www.zintech.com.tw/login",
                    expectedOutput: "navigate to the Login page",
                  },
                  {
                    id: 1212,
                    action: "Input correct username and password",
                    inputs: "username: admin, password: a987654321",
                    expectedOutput: "",
                  },
                  {
                    id: 1213,
                    action: "Click the login button",
                    inputs: "",
                    expectedOutput: "Login successfully",
                  },
                ],
              },
              {
                id: 122,
                description: "Log in with Google",
                priority: "Medium",
                prerequisite: "",
                steps: [
                  {
                    id: 1211,
                    action: "Open browser",
                    inputs: "https://www.zintech.com.tw/login",
                    expectedOutput: "navigate to the Login page",
                  },
                  {
                    id: 1212,
                    action: "Input correct username and password",
                    inputs: "username: admin, password: a987654321",
                    expectedOutput: "",
                  },
                  {
                    id: 1213,
                    action: "Click the login button",
                    inputs: "",
                    expectedOutput: "Login successfully",
                  },
                ],
              },
              {
                id: 123,
                description: "Log in with Apple",
                priority: "Low",
                prerequisite: "",
                steps: [],
              },
            ],
          },
          {
            suite: "Account Management",
            list: [
              {
                id: 124,
                description: "Sign up by username and password",
                priority: "High",
                prerequisite: "",
                steps: [
                  {
                    id: 1211,
                    action: "Open browser",
                    inputs: "https://www.zintech.com.tw/login",
                    expectedOutput: "navigate to the Login page",
                  },
                  {
                    id: 1212,
                    action: "Input correct username and password",
                    inputs: "username: admin, password: a987654321",
                    expectedOutput: "",
                  },
                  {
                    id: 1213,
                    action: "Click the login button",
                    inputs: "",
                    expectedOutput: "Login successfully",
                  },
                ],
              },
            ],
          },
          {
            suite: "Device Management",
            list: [],
          },
        ],
      },
    ],
    runs: [
      {
        id: 11,
        cases: [],
        title: "Test Run for Test Plan v0.0.1",
        configurations: ["Microsoft Edge", "Google Chrome"],
        createdTime: "2024/01/01 13:57",
        finishedTime: "2024/01/05 23:49",
        status: "finished",
        pass: 96,
        fail: 4,
        passRate: 96,
      },
      {
        id: 12,
        cases: [
          {
            suite: "Login functionality",
            list: [
              {
                id: 121,
                description: "Log in by username and password",

                priority: "High",
                prerequisite: "",
                steps: [
                  {
                    id: 1211,
                    action: "Open browser",
                    inputs: "https://www.zintech.com.tw/login",
                    expectedOutput: "navigate to the Login page",
                    actualOutput: "",
                    result: "",
                  },
                  {
                    id: 1212,
                    action: "Input correct username and password",
                    inputs: "username: admin, password: a987654321",
                    expectedOutput: "",
                    actualOutput: "",
                    result: "",
                  },
                  {
                    id: 1213,
                    action: "Click the login button",
                    inputs: "",
                    expectedOutput: "Login successfully",
                    actualOutput: "",
                    result: "",
                  },
                ],
              },
              {
                id: 122,
                description: "Log in with Google",
                priority: "Medium",
                prerequisite: "",
                steps: [
                  {
                    id: 1211,
                    action: "Open browser",
                    inputs: "https://www.zintech.com.tw/login",
                    expectedOutput: "navigate to the Login page",
                    actualOutput: "",
                    result: "",
                  },
                  {
                    id: 1212,
                    action: "Input correct username and password",
                    inputs: "username: admin, password: a987654321",
                    expectedOutput: "",
                    actualOutput: "",
                    result: "",
                  },
                  {
                    id: 1213,
                    action: "Click the login button",
                    inputs: "",
                    expectedOutput: "Login successfully",
                    actualOutput: "",
                    result: "",
                  },
                ],
              },
              {
                id: 123,
                description: "Log in with Apple",
                priority: "Low",
                prerequisite: "",
                steps: [],
              },
            ],
          },
          {
            suite: "Account Management",
            list: [
              {
                id: 124,
                description: "Sign up by username and password",
                priority: "High",
                prerequisite: "",
                steps: [
                  {
                    id: 1211,
                    action: "Open browser",
                    inputs: "https://www.zintech.com.tw/login",
                    expectedOutput: "navigate to the Login page",
                    actualOutput: "",
                    result: "",
                  },
                  {
                    id: 1212,
                    action: "Input correct username and password",
                    inputs: "username: admin, password: a987654321",
                    expectedOutput: "",
                    actualOutput: "",
                    result: "",
                  },
                  {
                    id: 1213,
                    action: "Click the login button",
                    inputs: "",
                    expectedOutput: "Login successfully",
                    actualOutput: "",
                    result: "",
                  },
                ],
              },
            ],
          },
          {
            suite: "Device Management",
            list: [],
          },
        ],
        title: "Test Run for Test Plan v0.0.2",
        configurations: ["Microsoft Edge", "Google Chrome"],
        createdTime: "2024/01/01 13:57",
        status: "running",
        progress: 50,
      },
    ],
  },
  {
    id: 2,
    name: "ZCP-App",
    createdTime: "2024/01/01 13:57",
    plans: [
      {
        id: 21,
        title: "Test Plan v0.0.1",
        description: "This is a test plan",
        createdTime: "2024/01/01 13:57",
        cases: [],
      },
    ],
    runs: [
      {
        id: 21,
        cases: [],
        title: "Test Run for Test Plan v0.0.1",
        configurations: ["Microsoft Edge", "Google Chrome"],
        createdTime: "2024/01/01 13:57",
        finishedTime: "2024/01/05 23:49",
        status: "finished",
        pass: 96,
        fail: 4,
        passRate: 96,
      },
    ],
  },
];

export const getProjectName = (id: number) => {
  return projects.find((project) => project.id === id)?.name;
};

export const getPlan = (proID: number, planID: number) => {
  return projects
    .find((project) => project.id === proID)
    ?.plans.find((plan) => plan.id === planID);
};

export const getPlans = (proID: number) => {
  return projects.find((project) => project.id === proID)?.plans;
};

export const getRunTitle = (proID: number, runID: number) => {
  return projects
    .find((project) => project.id === proID)
    ?.runs.find((run) => run.id === runID)?.title;
};

export const getCase = (proID: number, planID: number, caseID: number) => {
  const project = projects.find((project) => project.id === proID);
  const plan = project?.plans.find((plan) => plan.id === planID);
  const cases = plan?.cases;
  const targetCase = cases
    ?.map((c) => c.list)
    .flat()
    .find((c) => c.id === caseID);

  return targetCase;
};

export const getCases = (proID: number, planID: number) => {
  const project = projects.find((project) => project.id === proID);
  const plan = project?.plans.find((plan) => plan.id === planID);

  return plan?.cases;
};

export const getSuite = (proID: number, planID: number, caseID: number) => {
  const project = projects.find((project) => project.id === proID);
  const plan = project?.plans.find((plan) => plan.id === planID);
  const targetCase = plan?.cases?.find((c) =>
    c.list.find((c) => c.id === caseID),
  );

  return targetCase?.suite;
};

export const getExistedSuites = (proID: number, planID: number) => {
  const project = projects.find((project) => project.id === proID);
  const plan = project?.plans.find((plan) => plan.id === planID);

  return plan?.cases.map((c) => c.suite);
};

export const getRunningRuns = (proID: number) => {
  const project = projects.find((project) => project.id === proID);
  return project?.runs.filter(
    (run) => run.status === "running",
  ) as RunningRun[];
};

export const getFinishedRuns = (proID: number) => {
  const project = projects.find((project) => project.id === proID);
  return project?.runs.filter(
    (run) => run.status === "finished",
  ) as FinishedRun[];
};

export const getRun = (proID: number, runID: number) => {
  const project = projects.find((project) => project.id === proID);
  return project?.runs.find((run) => run.id === runID);
};
