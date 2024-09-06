export const getProjectName = (id: number) => {
  return data.find((project) => project.id === id)?.name;
};

export const getProject = (id: number) => {
  return data.find((project) => project.id === id);
};

export const getPlan = (projectID: number, planID: number) => {
  return data
    .find((project) => project.id === projectID)
    ?.plans.data.find((plan) => plan.id === planID);
};

export const getPlans = (projectID: number) => {
  return data.find((project) => project.id === projectID)?.plans.data;
};

export const getRunTitle = (projectID: number, runID: number) => {
  return data
    .find((project) => project.id === projectID)
    ?.runs.data.find((run) => run.id === runID)?.name;
};

export const getRuns = (projectID: number) => {
  return data.find((project) => project.id === projectID)?.runs.data;
};

export const getRun = (projectID: number, runID: number) => {
  const project = data.find((project) => project.id === projectID);
  return project?.runs.data.find((run) => run.id === runID);
};

export const getPlanCase = (
  projectID: number,
  planID: number,
  groupID: number,
  caseID: number,
) => {
  const project = data.find((project) => project.id === projectID);
  const plan = project?.plans.data.find((plan) => plan.id === planID);
  const group = plan?.cases.data.find((group) => group.id === groupID);
  const targetCase = group?.list.data.find((c) => c.id === caseID);

  return targetCase;
};

export const getPlanCases = (projectID: number, planID: number) => {
  const project = data.find((project) => project.id === projectID);
  const plan = project?.plans.data.find((plan) => plan.id === planID);

  return plan?.cases.data;
};

export const getRunCase = (
  projectID: number,
  runID: number,
  caseID: number,
) => {
  const project = data.find((project) => project.id === projectID);
  const run = project?.runs.data.find((run) => run.id === runID);
  const targetCase = run?.plan.cases.data.find((c) => c.id === caseID);

  return targetCase;
};

export const getRunCases = (projectID: number, runID: number) => {
  const project = data.find((project) => project.id === projectID);
  const run = project?.runs.data.find((run) => run.id === runID);

  return run?.plan.cases.data;
};

export const getSuite = (
  projectID: number,
  planID: number,
  groupID: number,
) => {
  const project = data.find((project) => project.id === projectID);
  const plan = project?.plans.data.find((plan) => plan.id === planID);
  const targetCase = plan?.cases?.data.find((g) => g.id === groupID);

  return targetCase;
};

export const getExistedSuites = (projectID: number, planID: number) => {
  const project = data.find((project) => project.id === projectID);
  const plan = project?.plans.data.find((plan) => plan.id === planID);

  return plan?.cases.data.map((c) => c.name);
};

export const calcPassRate = (groups: CaseGroup[]) => {
  let total = 0;
  let passed = 0;
  groups.forEach((group: CaseGroup) => {
    group.list.data.forEach((c: Case) => {
      c.steps.data.forEach((s: Step) => {
        total++;
        if (s.result) {
          passed++;
        }
      });
    });
  });

  return {
    pass: passed,
    fail: total - passed,
    passRate: Math.round((passed / total) * 100),
  };
};

export const calcProgress = (groups: CaseGroup[]) => {
  let total = 0;
  let finished = 0;
  groups.forEach((group: CaseGroup) => {
    group.list.data.forEach((c: Case) => {
      c.steps.data.forEach((s: Step) => {
        total++;
        if (s.result) {
          finished++;
        }
      });
    });
  });

  return {
    total,
    finished,
    progress: Math.round((finished / total) * 100),
  };
};

export const data: Project[] = [
  {
    id: 1,
    name: "ZCP-Web",
    createdTime: "2024/01/01 13:57",
    plans: {
      num: 2,
      data: [
        {
          id: 11,
          name: "Version 1.0.0",
          createdTime: "2024/01/01 13:57",
          cases: {
            totalCases: 9,
            totalSuites: 3,
            data: [
              {
                id: 111,
                name: "Login Functionalities",
                list: {
                  num: 3,
                  data: [
                    {
                      id: 1111,
                      gid: 111,
                      name: "Login with valid credentials",
                      priority: "High",
                      steps: {
                        num: 3,
                        data: [
                          {
                            id: 11111,
                            action: "Open the browser",
                            expectedOutput:
                              "The login page should be displayed",
                            result: null,
                            comment: null,
                          },
                          {
                            id: 11112,
                            action: "Enter the username and password",
                            expectedOutput:
                              "The user should be logged in successfully",
                            result: null,
                            comment: null,
                          },
                          {
                            id: 11113,
                            action: "Click on the login button",
                            expectedOutput:
                              "The user should be redirected to the home page",
                            result: null,
                            comment: null,
                          },
                        ],
                      },
                    },
                    {
                      id: 1112,
                      gid: 111,
                      name: "Login with invalid credentials",
                      priority: "Medium",
                      steps: {
                        num: 3,
                        data: [
                          {
                            id: 11121,
                            action: "Open the browser",
                            expectedOutput:
                              "The login page should be displayed",
                            result: null,
                            comment: null,
                          },
                          {
                            id: 11122,
                            action: "Enter the username and password",
                            expectedOutput: "The user should not be logged in",
                            result: null,
                            comment: null,
                          },
                          {
                            id: 11123,
                            action: "Click on the login button",
                            expectedOutput:
                              "The user should not be redirected to the home page",
                            result: null,
                            comment: null,
                          },
                        ],
                      },
                    },
                    {
                      id: 1113,
                      gid: 111,
                      name: "Logout",
                      priority: "Low",
                      steps: {
                        num: 2,
                        data: [
                          {
                            id: 11131,
                            action: "Click on the logout button",
                            expectedOutput: "The user should be logged out",
                            result: null,
                            comment: null,
                          },
                          {
                            id: 11132,
                            action: "Click on the login button",
                            expectedOutput:
                              "The user should be redirected to the login page",
                            result: null,
                            comment: null,
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                id: 112,
                name: "Account Management Functionalities",
                list: {
                  num: 3,
                  data: [
                    {
                      id: 1121,
                      gid: 112,
                      name: "Create a new account",
                      priority: "High",
                      steps: {
                        num: 3,
                        data: [
                          {
                            id: 11211,
                            action: "Click on the account management tab",
                            expectedOutput:
                              "The account management page should be displayed",
                            result: null,
                            comment: null,
                          },
                          {
                            id: 11212,
                            action: "Click on the create account button",
                            expectedOutput:
                              "The create account form should be displayed",
                            result: null,
                            comment: null,
                          },
                          {
                            id: 11213,
                            action: "Enter the account details",
                            expectedOutput:
                              "The account should be created successfully",
                            result: null,
                            comment: null,
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                id: 113,
                name: "Device Management Functionalities",
                list: {
                  num: 3,
                  data: [
                    {
                      id: 1131,
                      gid: 113,
                      name: "Add a new device",
                      priority: "High",
                      steps: {
                        num: 3,
                        data: [
                          {
                            id: 11311,
                            action: "Click on the device management tab",
                            expectedOutput:
                              "The device management page should be displayed",
                            result: null,
                            comment: null,
                          },
                          {
                            id: 11312,
                            action: "Click on the add device button",
                            expectedOutput:
                              "The add device form should be displayed",
                            result: null,
                            comment: null,
                          },
                          {
                            id: 11313,
                            action: "Enter the device details",
                            expectedOutput:
                              "The device should be added successfully",
                            result: null,
                            comment: null,
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          id: 12,
          name: "Version 1.0.1",
          createdTime: "2024/01/02 09:23",
          cases: {
            totalCases: 3,
            totalSuites: 1,
            data: [
              {
                id: 121,
                name: "Bug Fixes",
                list: {
                  num: 1,
                  data: [
                    {
                      id: 1211,
                      gid: 121,
                      name: "Fix login issue",
                      priority: "High",
                      steps: {
                        num: 3,
                        data: [
                          {
                            id: 12111,
                            action: "Open the browser",
                            expectedOutput:
                              "The login page should be displayed",
                            result: null,
                            comment: null,
                          },
                          {
                            id: 12112,
                            action: "Enter the username and password",
                            expectedOutput:
                              "The user should be logged in successfully",
                            result: null,
                            comment: null,
                          },
                          {
                            id: 12113,
                            action: "Click on the login button",
                            expectedOutput:
                              "The user should be redirected to the home page",
                            result: null,
                            comment: null,
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
    runs: {
      num: 2,
      data: [
        {
          id: 11,
          name: "Test Run for Version 1.0.0",
          createdTime: "2024/01/03 10:45",
          plan: {
            id: 11,
            name: "Version 1.0.0",
            createdTime: "2024/01/01 13:57",
            cases: {
              totalCases: 9,
              totalSuites: 3,
              data: [
                {
                  id: 111,
                  name: "Login Functionalities",
                  list: {
                    num: 3,
                    data: [
                      {
                        id: 1111,
                        gid: 111,
                        name: "Login with valid credentials",
                        priority: "High",
                        steps: {
                          num: 3,
                          data: [
                            {
                              id: 11111,
                              action: "Open the browser",
                              expectedOutput:
                                "The login page should be displayed",
                              result: null,
                              comment: null,
                            },
                            {
                              id: 11112,
                              action: "Enter the username and password",
                              expectedOutput:
                                "The user should be logged in successfully",
                              result: null,
                              comment: null,
                            },
                            {
                              id: 11113,
                              action: "Click on the login button",
                              expectedOutput:
                                "The user should be redirected to the home page",
                              result: null,
                              comment: null,
                            },
                          ],
                        },
                      },
                      {
                        id: 1112,
                        gid: 111,
                        name: "Login with invalid credentials",
                        priority: "Medium",
                        steps: {
                          num: 3,
                          data: [
                            {
                              id: 11121,
                              action: "Open the browser",
                              expectedOutput:
                                "The login page should be displayed",
                              result: null,
                              comment: null,
                            },
                            {
                              id: 11122,
                              action: "Enter the username and password",
                              expectedOutput:
                                "The user should not be logged in",
                              result: null,
                              comment: null,
                            },
                            {
                              id: 11123,
                              action: "Click on the login button",
                              expectedOutput:
                                "The user should not be redirected to the home page",
                              result: null,
                              comment: null,
                            },
                          ],
                        },
                      },
                      {
                        id: 1113,
                        gid: 111,
                        name: "Logout",
                        priority: "Low",
                        steps: {
                          num: 2,
                          data: [
                            {
                              id: 11131,
                              action: "Click on the logout button",
                              expectedOutput: "The user should be logged out",
                              result: null,
                              comment: null,
                            },
                            {
                              id: 11132,
                              action: "Click on the login button",
                              expectedOutput:
                                "The user should be redirected to the login page",
                              result: null,
                              comment: null,
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  id: 112,
                  name: "Account Management Functionalities",
                  list: {
                    num: 3,
                    data: [
                      {
                        id: 1121,
                        gid: 112,
                        name: "Create a new account",
                        priority: "High",
                        steps: {
                          num: 3,
                          data: [
                            {
                              id: 11211,
                              action: "Click on the account management tab",
                              expectedOutput:
                                "The account management page should be displayed",
                              result: null,
                              comment: null,
                            },
                            {
                              id: 11212,
                              action: "Click on the create account button",
                              expectedOutput:
                                "The create account form should be displayed",
                              result: null,
                              comment: null,
                            },
                            {
                              id: 11213,
                              action: "Enter the account details",
                              expectedOutput:
                                "The account should be created successfully",
                              result: null,
                              comment: null,
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  id: 113,
                  name: "Device Management Functionalities",
                  list: {
                    num: 3,
                    data: [
                      {
                        id: 1131,
                        gid: 113,
                        name: "Add a new device",
                        priority: "High",
                        steps: {
                          num: 3,
                          data: [
                            {
                              id: 11311,
                              action: "Click on the device management tab",
                              expectedOutput:
                                "The device management page should be displayed",
                              result: null,
                              comment: null,
                            },
                            {
                              id: 11312,
                              action: "Click on the add device button",
                              expectedOutput:
                                "The add device form should be displayed",
                              result: null,
                              comment: null,
                            },
                            {
                              id: 11313,
                              action: "Enter the device details",
                              expectedOutput:
                                "The device should be added successfully",
                              result: null,
                              comment: null,
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
        {
          id: 12,
          name: "Test Run for Version 1.0.1",
          createdTime: "2024/01/04 14:32",
          plan: {
            id: 12,
            name: "Version 1.0.1",
            createdTime: "2024/01/02 09:23",
            cases: {
              totalCases: 3,
              totalSuites: 1,
              data: [
                {
                  id: 121,
                  name: "Bug Fixes",
                  list: {
                    num: 1,
                    data: [
                      {
                        id: 1211,
                        gid: 121,
                        name: "Fix login issue",
                        priority: "High",
                        steps: {
                          num: 3,
                          data: [
                            {
                              id: 12111,
                              action: "Open the browser",
                              expectedOutput:
                                "The login page should be displayed",
                              result: null,
                              comment: null,
                            },
                            {
                              id: 12112,
                              action: "Enter the username and password",
                              expectedOutput:
                                "The user should be logged in successfully",
                              result: null,
                              comment: null,
                            },
                            {
                              id: 12113,
                              action: "Click on the login button",
                              expectedOutput:
                                "The user should be redirected to the home page",
                              result: null,
                              comment: null,
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      ],
    },
  },
  {
    id: 2,
    name: "ZCP-App",
    createdTime: "2024/01/01 13:57",
    plans: {
      num: 2,
      data: [
        {
          id: 21,
          name: "Version 1.0.0",
          createdTime: "2024/01/01 13:57",
          cases: {
            totalCases: 9,
            totalSuites: 3,
            data: [
              {
                id: 211,
                name: "Login Functionalities",
                list: {
                  num: 3,
                  data: [
                    {
                      id: 2111,
                      gid: 211,
                      name: "Login with valid credentials",
                      priority: "High",
                      steps: {
                        num: 3,
                        data: [
                          {
                            id: 21111,
                            action: "Open the browser",
                            expectedOutput:
                              "The login page should be displayed",
                            result: null,
                            comment: null,
                          },
                          {
                            id: 21112,
                            action: "Enter the username and password",
                            expectedOutput:
                              "The user should be logged in successfully",
                            result: null,
                            comment: null,
                          },
                          {
                            id: 21113,
                            action: "Click on the login button",
                            expectedOutput:
                              "The user should be redirected to the home page",
                            result: null,
                            comment: null,
                          },
                        ],
                      },
                    },
                    {
                      id: 2112,
                      gid: 211,
                      name: "Login with invalid credentials",
                      priority: "High",
                      steps: {
                        num: 3,
                        data: [
                          {
                            id: 21121,
                            action: "Open the browser",
                            expectedOutput:
                              "The login page should be displayed",
                            result: null,
                            comment: null,
                          },
                          {
                            id: 21122,
                            action: "Enter the username and password",
                            expectedOutput: "The user should not be logged in",
                            result: null,
                            comment: null,
                          },
                          {
                            id: 21123,
                            action: "Click on the login button",
                            expectedOutput:
                              "The user should not be redirected to the home page",
                            result: null,
                            comment: null,
                          },
                        ],
                      },
                    },
                    {
                      id: 2113,
                      gid: 211,
                      name: "Logout",
                      priority: "High",
                      steps: {
                        num: 2,
                        data: [
                          {
                            id: 21131,
                            action: "Click on the logout button",
                            expectedOutput: "The user should be logged out",
                            result: null,
                            comment: null,
                          },
                          {
                            id: 21132,
                            action: "Click on the login button",
                            expectedOutput:
                              "The user should be redirected to the login page",
                            result: null,
                            comment: null,
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                id: 212,
                name: "Account Management Functionalities",
                list: {
                  num: 3,
                  data: [
                    {
                      id: 2121,
                      gid: 212,
                      name: "Create a new account",
                      priority: "High",
                      steps: {
                        num: 3,
                        data: [
                          {
                            id: 21211,
                            action: "Click on the account management tab",
                            expectedOutput:
                              "The account management page should be displayed",
                            result: null,
                            comment: null,
                          },
                          {
                            id: 21212,
                            action: "Click on the create account button",
                            expectedOutput:
                              "The create account form should be displayed",
                            result: null,
                            comment: null,
                          },
                          {
                            id: 21213,
                            action: "Enter the account details",
                            expectedOutput:
                              "The account should be created successfully",
                            result: null,
                            comment: null,
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                id: 213,
                name: "Device Management Functionalities",
                list: {
                  num: 3,
                  data: [
                    {
                      id: 2131,
                      gid: 213,
                      name: "Add a new device",
                      priority: "High",
                      steps: {
                        num: 3,
                        data: [
                          {
                            id: 21311,
                            action: "Click on the device management tab",
                            expectedOutput:
                              "The device management page should be displayed",
                            result: null,
                            comment: null,
                          },
                          {
                            id: 21312,
                            action: "Click on the add device button",
                            expectedOutput:
                              "The add device form should be displayed",
                            result: null,
                            comment: null,
                          },
                          {
                            id: 21313,
                            action: "Enter the device details",
                            expectedOutput:
                              "The device should be added successfully",
                            result: null,
                            comment: null,
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          id: 22,
          name: "Version 1.0.1",
          createdTime: "2024/01/02 09:23",
          cases: {
            totalCases: 3,
            totalSuites: 1,
            data: [
              {
                id: 221,
                name: "Bug Fixes",
                list: {
                  num: 1,
                  data: [
                    {
                      id: 2211,
                      gid: 221,
                      name: "Fix login issue",
                      priority: "High",
                      steps: {
                        num: 3,
                        data: [
                          {
                            id: 22111,
                            action: "Open the browser",
                            expectedOutput:
                              "The login page should be displayed",
                            result: null,
                            comment: null,
                          },
                          {
                            id: 22112,
                            action: "Enter the username and password",
                            expectedOutput:
                              "The user should be logged in successfully",
                            result: null,
                            comment: null,
                          },
                          {
                            id: 22113,
                            action: "Click on the login button",
                            expectedOutput:
                              "The user should be redirected to the home page",
                            result: null,
                            comment: null,
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
    runs: {
      num: 2,
      data: [
        {
          id: 11,
          name: "Test Run for Version 1.0.0",
          createdTime: "2024/01/03 10:45",
          plan: {
            id: 21,
            name: "Version 1.0.0",
            createdTime: "2024/01/01 13:57",
            cases: {
              totalCases: 9,
              totalSuites: 3,
              data: [
                {
                  id: 211,
                  name: "Login Functionalities",
                  list: {
                    num: 3,
                    data: [
                      {
                        id: 2111,
                        gid: 211,
                        name: "Login with valid credentials",
                        priority: "High",
                        steps: {
                          num: 3,
                          data: [
                            {
                              id: 21111,
                              action: "Open the browser",
                              expectedOutput:
                                "The login page should be displayed",
                              result: null,
                              comment: null,
                            },
                            {
                              id: 21112,
                              action: "Enter the username and password",
                              expectedOutput:
                                "The user should be logged in successfully",
                              result: null,
                              comment: null,
                            },
                            {
                              id: 21113,
                              action: "Click on the login button",
                              expectedOutput:
                                "The user should be redirected to the home page",
                              result: null,
                              comment: null,
                            },
                          ],
                        },
                      },
                      {
                        id: 2112,
                        gid: 211,
                        name: "Login with invalid credentials",
                        priority: "High",
                        steps: {
                          num: 3,
                          data: [
                            {
                              id: 21121,
                              action: "Open the browser",
                              expectedOutput:
                                "The login page should be displayed",
                              result: null,
                              comment: null,
                            },
                            {
                              id: 21122,
                              action: "Enter the username and password",
                              expectedOutput:
                                "The user should not be logged in",
                              result: null,
                              comment: null,
                            },
                            {
                              id: 21123,
                              action: "Click on the login button",
                              expectedOutput:
                                "The user should not be redirected to the home page",
                              result: null,
                              comment: null,
                            },
                          ],
                        },
                      },
                      {
                        id: 2113,
                        gid: 211,
                        name: "Logout",
                        priority: "High",
                        steps: {
                          num: 2,
                          data: [
                            {
                              id: 21131,
                              action: "Click on the logout button",
                              expectedOutput: "The user should be logged out",
                              result: null,
                              comment: null,
                            },
                            {
                              id: 21132,
                              action: "Click on the login button",
                              expectedOutput:
                                "The user should be redirected to the login page",
                              result: null,
                              comment: null,
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  id: 212,
                  name: "Account Management Functionalities",
                  list: {
                    num: 3,
                    data: [
                      {
                        id: 2121,
                        gid: 212,
                        name: "Create a new account",
                        priority: "High",
                        steps: {
                          num: 3,
                          data: [
                            {
                              id: 21211,
                              action: "Click on the account management tab",
                              expectedOutput:
                                "The account management page should be displayed",
                              result: null,
                              comment: null,
                            },
                            {
                              id: 21212,
                              action: "Click on the create account button",
                              expectedOutput:
                                "The create account form should be displayed",
                              result: null,
                              comment: null,
                            },
                            {
                              id: 21213,
                              action: "Enter the account details",
                              expectedOutput:
                                "The account should be created successfully",
                              result: null,
                              comment: null,
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  id: 213,
                  name: "Device Management Functionalities",
                  list: {
                    num: 3,
                    data: [
                      {
                        id: 2131,
                        gid: 213,
                        name: "Add a new device",
                        priority: "High",
                        steps: {
                          num: 3,
                          data: [
                            {
                              id: 21311,
                              action: "Click on the device management tab",
                              expectedOutput:
                                "The device management page should be displayed",
                              result: null,
                              comment: null,
                            },
                            {
                              id: 21312,
                              action: "Click on the add device button",
                              expectedOutput:
                                "The add device form should be displayed",
                              result: null,
                              comment: null,
                            },
                            {
                              id: 21313,
                              action: "Enter the device details",
                              expectedOutput:
                                "The device should be added successfully",
                              result: null,
                              comment: null,
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
        {
          id: 12,
          name: "Test Run for Version 1.0.1",
          createdTime: "2024/01/04 14:32",
          plan: {
            id: 22,
            name: "Version 1.0.1",
            createdTime: "2024/01/02 09:23",
            cases: {
              totalCases: 3,
              totalSuites: 1,
              data: [
                {
                  id: 221,
                  name: "Bug Fixes",
                  list: {
                    num: 1,
                    data: [
                      {
                        id: 2211,
                        gid: 221,
                        name: "Fix login issue",
                        priority: "High",
                        steps: {
                          num: 3,
                          data: [
                            {
                              id: 22111,
                              action: "Open the browser",
                              expectedOutput:
                                "The login page should be displayed",
                              result: null,
                              comment: null,
                            },
                            {
                              id: 22112,
                              action: "Enter the username and password",
                              expectedOutput:
                                "The user should be logged in successfully",
                              result: null,
                              comment: null,
                            },
                            {
                              id: 22113,
                              action: "Click on the login button",
                              expectedOutput:
                                "The user should be redirected to the home page",
                              result: null,
                              comment: null,
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      ],
    },
  },
];

export const logs: LogData[] = [
  {
    id: 1,
    time: "2024/01/03 10:45",
    action: "created",
    type: "project",
    name: "ZCP-Web",
  },
  {
    id: 2,
    time: "2024/01/03 10:48",
    action: "created",
    type: "plan",
    name: "Version 1.0.0",
  },
  {
    id: 3,
    time: "2024/01/08 10:50",
    action: "created",
    type: "run",
    name: "Test Run for Version 1.0.0",
  },
  {
    id: 4,
    time: "2024/01/09 10:45",
    action: "finished",
    type: "run",
    name: "Test Run for Version 1.0.0",
  },
  {
    id: 5,
    time: "2024/01/09 14:32",
    action: "created",
    type: "project",
    name: "ZCP-App",
  },
  {
    id: 7,
    time: "2024/01/10 10:48",
    action: "deleted",
    type: "plan",
    name: "Version 1.0.0",
  },
];
