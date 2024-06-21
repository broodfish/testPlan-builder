export const getProjectName = (id: number) => {
  return data.find((project) => project.id === id)?.name;
};

export const getPlan = (proID: number, planID: number) => {
  return data
    .find((project) => project.id === proID)
    ?.plans.data.find((plan) => plan.id === planID);
};

export const getPlans = (proID: number) => {
  return data.find((project) => project.id === proID)?.plans.data;
};

export const getRunTitle = (proID: number, runID: number) => {
  return data
    .find((project) => project.id === proID)
    ?.runs.data.find((run) => run.id === runID)?.title;
};

export const getCase = (
  proID: number,
  planID: number,
  groupID: number,
  caseID: number,
) => {
  const project = data.find((project) => project.id === proID);
  const plan = project?.plans.data.find((plan) => plan.id === planID);
  const group = plan?.list.data.find((group) => group.id === groupID);
  const targetCase = group?.cases.data.find((c) => c.id === caseID);

  return targetCase;
};

export const getCases = (proID: number, planID: number) => {
  const project = data.find((project) => project.id === proID);
  const plan = project?.plans.data.find((plan) => plan.id === planID);

  return plan?.list.data;
};

export const getSuite = (proID: number, planID: number, groupID: number) => {
  const project = data.find((project) => project.id === proID);
  const plan = project?.plans.data.find((plan) => plan.id === planID);
  const targetCase = plan?.list?.data.find((g) => g.id === groupID);

  return targetCase;
};

export const getExistedSuites = (proID: number, planID: number) => {
  const project = data.find((project) => project.id === proID);
  const plan = project?.plans.data.find((plan) => plan.id === planID);

  return plan?.list.data.map((c) => c.name);
};

export const getRunningRuns = (proID: number) => {
  const project = data.find((project) => project.id === proID);
  return project?.runs.data.filter((run) => run.status === "running");
};

export const getFinishedRuns = (proID: number) => {
  const project = data.find((project) => project.id === proID);
  return project?.runs.data.filter((run) => run.status === "finished");
};

export const calcPassRate = (groups: CaseGroup[]) => {
  let total = 0;
  let passed = 0;
  groups.forEach((group: CaseGroup) => {
    group.cases.data.forEach((c: Case) => {
      c.steps.data.forEach((s: Step) => {
        total++;
        if (s.result === "pass") {
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

export const getRun = (proID: number, runID: number) => {
  const project = data.find((project) => project.id === proID);
  return project?.runs.data.find((run) => run.id === runID);
};

export const calcProgress = (groups: CaseGroup[]) => {
  let total = 0;
  let finished = 0;
  groups.forEach((group: CaseGroup) => {
    group.cases.data.forEach((c: Case) => {
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
          title: "Version 1.0.0",
          description: "First version of ZCP-Web",
          createdTime: "2024/01/01 13:57",
          list: {
            num: 3,
            data: [
              {
                id: 111,
                name: "Login Functionalities",
                cases: {
                  num: 3,
                  data: [
                    {
                      id: 1111,
                      gid: 111,
                      description: "Login with valid credentials",
                      priority: "High",
                      prerequisite: "",
                      steps: {
                        num: 3,
                        data: [
                          {
                            id: 11111,
                            action: "Open the browser",
                            inputs: "Enter the URL: https://zcp.zintech.com",
                            expectedOutput:
                              "The login page should be displayed",
                          },
                          {
                            id: 11112,
                            action: "Enter the username and password",
                            inputs:
                              "Enter the username: admin, Enter the password: admin",
                            expectedOutput:
                              "The user should be logged in successfully",
                          },
                          {
                            id: 11113,
                            action: "Click on the login button",
                            inputs: "",
                            expectedOutput:
                              "The user should be redirected to the home page",
                          },
                        ],
                      },
                    },
                    {
                      id: 1112,
                      gid: 111,
                      description: "Login with invalid credentials",
                      priority: "High",
                      prerequisite: "",
                      steps: {
                        num: 3,
                        data: [
                          {
                            id: 11121,
                            action: "Open the browser",
                            inputs: "Enter the URL: https://zcp.zintech.com",
                            expectedOutput:
                              "The login page should be displayed",
                          },
                          {
                            id: 11122,
                            action: "Enter the username and password",
                            inputs:
                              "Enter the username: admin, Enter the password: invalid",
                            expectedOutput: "The user should not be logged in",
                          },
                          {
                            id: 11123,
                            action: "Click on the login button",
                            inputs: "",
                            expectedOutput:
                              "The user should not be redirected to the home page",
                          },
                        ],
                      },
                    },
                    {
                      id: 1113,
                      gid: 111,
                      description: "Logout",
                      priority: "High",
                      prerequisite: "Login with valid credentials",
                      steps: {
                        num: 2,
                        data: [
                          {
                            id: 11131,
                            action: "Click on the logout button",
                            inputs: "",
                            expectedOutput: "The user should be logged out",
                          },
                          {
                            id: 11132,
                            action: "Click on the login button",
                            inputs: "",
                            expectedOutput:
                              "The user should be redirected to the login page",
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
                cases: {
                  num: 3,
                  data: [
                    {
                      id: 1121,
                      gid: 112,
                      description: "Create a new account",
                      priority: "High",
                      prerequisite: "Login with valid credentials",
                      steps: {
                        num: 3,
                        data: [
                          {
                            id: 11211,
                            action: "Click on the account management tab",
                            inputs: "",
                            expectedOutput:
                              "The account management page should be displayed",
                          },
                          {
                            id: 11212,
                            action: "Click on the create account button",
                            inputs: "",
                            expectedOutput:
                              "The create account form should be displayed",
                          },
                          {
                            id: 11213,
                            action: "Enter the account details",
                            inputs:
                              "Enter the account name: Test Account, Enter the account type: Test Type",
                            expectedOutput:
                              "The account should be created successfully",
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
                cases: {
                  num: 3,
                  data: [
                    {
                      id: 1131,
                      gid: 113,
                      description: "Add a new device",
                      priority: "High",
                      prerequisite: "Login with valid credentials",
                      steps: {
                        num: 3,
                        data: [
                          {
                            id: 11311,
                            action: "Click on the device management tab",
                            inputs: "",
                            expectedOutput:
                              "The device management page should be displayed",
                          },
                          {
                            id: 11312,
                            action: "Click on the add device button",
                            inputs: "",
                            expectedOutput:
                              "The add device form should be displayed",
                          },
                          {
                            id: 11313,
                            action: "Enter the device details",
                            inputs:
                              "Enter the device name: Test Device, Enter the device type: Test Type",
                            expectedOutput:
                              "The device should be added successfully",
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
          title: "Version 1.0.1",
          description:
            "Second version of ZCP-Web, with bug fixes and new features",
          createdTime: "2024/01/02 09:23",
          list: {
            num: 1,
            data: [
              {
                id: 121,
                name: "Bug Fixes",
                cases: {
                  num: 1,
                  data: [
                    {
                      id: 1211,
                      gid: 121,
                      description: "Fix login issue",
                      priority: "High",
                      prerequisite: "",
                      steps: {
                        num: 3,
                        data: [
                          {
                            id: 12111,
                            action: "Open the browser",
                            inputs: "Enter the URL: https://zcp.zintech.com",
                            expectedOutput:
                              "The login page should be displayed",
                          },
                          {
                            id: 12112,
                            action: "Enter the username and password",
                            inputs:
                              "Enter the username: admin, Enter the password: admin",
                            expectedOutput:
                              "The user should be logged in successfully",
                          },
                          {
                            id: 12113,
                            action: "Click on the login button",
                            inputs: "",
                            expectedOutput:
                              "The user should be redirected to the home page",
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
          title: "Test Run for Version 1.0.0",
          createdTime: "2024/01/03 10:45",
          startedTime: "2024/01/03 10:45",
          finishedTime: "2024/01/03 10:50",
          status: "finished",
          configurations: ["Chrome", "Windows 10"],
          plan: {
            id: 11,
            title: "Version 1.0.0",
            description: "First version of ZCP-Web",
            createdTime: "2024/01/01 13:57",
            list: {
              num: 3,
              data: [
                {
                  id: 111,
                  name: "Login Functionalities",
                  cases: {
                    num: 3,
                    data: [
                      {
                        id: 1111,
                        gid: 111,
                        description: "Login with valid credentials",
                        priority: "High",
                        prerequisite: "",
                        steps: {
                          num: 3,
                          data: [
                            {
                              id: 11111,
                              action: "Open the browser",
                              inputs: "Enter the URL: https://zcp.zintech.com",
                              expectedOutput:
                                "The login page should be displayed",
                              actualOutput: "The login page is displayed",
                              result: "pass",
                            },
                            {
                              id: 11112,
                              action: "Enter the username and password",
                              inputs:
                                "Enter the username: admin, Enter the password: admin",
                              expectedOutput:
                                "The user should be logged in successfully",
                              actualOutput:
                                "The user is logged in successfully",
                              result: "pass",
                            },
                            {
                              id: 11113,
                              action: "Click on the login button",
                              inputs: "",
                              expectedOutput:
                                "The user should be redirected to the home page",
                              actualOutput:
                                "The user is redirected to the home page",
                              result: "pass",
                            },
                          ],
                        },
                      },
                      {
                        id: 1112,
                        gid: 111,
                        description: "Login with invalid credentials",
                        priority: "High",
                        prerequisite: "",
                        steps: {
                          num: 3,
                          data: [
                            {
                              id: 11121,
                              action: "Open the browser",
                              inputs: "Enter the URL: https://zcp.zintech.com",
                              expectedOutput:
                                "The login page should be displayed",
                              actualOutput: "The login page is displayed",
                              result: "pass",
                            },
                            {
                              id: 11122,
                              action: "Enter the username and password",
                              inputs:
                                "Enter the username: admin, Enter the password: invalid",
                              expectedOutput:
                                "The user should not be logged in",
                              actualOutput: "The user is not logged in",
                              result: "pass",
                            },
                            {
                              id: 11123,
                              action: "Click on the login button",
                              inputs: "",
                              expectedOutput:
                                "The user should not be redirected to the home page",
                              actualOutput:
                                "The user is not redirected to the home page",
                              result: "pass",
                            },
                          ],
                        },
                      },
                      {
                        id: 1113,
                        gid: 111,
                        description: "Logout",
                        priority: "High",
                        prerequisite: "Login with valid credentials",
                        steps: {
                          num: 2,
                          data: [
                            {
                              id: 11131,
                              action: "Click on the logout button",
                              inputs: "",
                              expectedOutput: "The user should be logged out",
                              actualOutput: "The user is logged out",
                              result: "pass",
                            },
                            {
                              id: 11132,
                              action: "Click on the login button",
                              inputs: "",
                              expectedOutput:
                                "The user should be redirected to the login page",
                              actualOutput:
                                "The user is redirected to the login page",
                              result: "pass",
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
                  cases: {
                    num: 3,
                    data: [
                      {
                        id: 1121,
                        gid: 112,
                        description: "Create a new account",
                        priority: "High",
                        prerequisite: "Login with valid credentials",
                        steps: {
                          num: 3,
                          data: [
                            {
                              id: 11211,
                              action: "Click on the account management tab",
                              inputs: "",
                              expectedOutput:
                                "The account management page should be displayed",
                              actualOutput:
                                "No account management page displayed",
                              result: "fail",
                            },
                            {
                              id: 11212,
                              action: "Click on the create account button",
                              inputs: "",
                              expectedOutput:
                                "The create account form should be displayed",
                              actualOutput: "no create account form displayed",
                              result: "fail",
                            },
                            {
                              id: 11213,
                              action: "Enter the account details",
                              inputs:
                                "Enter the account name: Test Account, Enter the account type: Test Type",
                              expectedOutput:
                                "The account should be created successfully",
                              actualOutput: "The account is not created",
                              result: "fail",
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
                  cases: {
                    num: 3,
                    data: [
                      {
                        id: 1131,
                        gid: 113,
                        description: "Add a new device",
                        priority: "High",
                        prerequisite: "Login with valid credentials",
                        steps: {
                          num: 3,
                          data: [
                            {
                              id: 11311,
                              action: "Click on the device management tab",
                              inputs: "",
                              expectedOutput:
                                "The device management page should be displayed",
                              actualOutput:
                                "The device management page is displayed",
                              result: "pass",
                            },
                            {
                              id: 11312,
                              action: "Click on the add device button",
                              inputs: "",
                              expectedOutput:
                                "The add device form should be displayed",
                              actualOutput: "The add device form is displayed",
                              result: "pass",
                            },
                            {
                              id: 11313,
                              action: "Enter the device details",
                              inputs:
                                "Enter the device name: Test Device, Enter the device type: Test Type",
                              expectedOutput:
                                "The device should be added successfully",
                              actualOutput: "The device is added successfully",
                              result: "pass",
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
          title: "Test Run for Version 1.0.1",
          createdTime: "2024/01/04 14:32",
          startedTime: "2024/01/04 14:32",
          status: "running",
          configurations: ["Chrome", "Windows 10"],
          plan: {
            id: 12,
            title: "Version 1.0.1",
            description:
              "Second version of ZCP-Web, with bug fixes and new features",
            createdTime: "2024/01/02 09:23",
            list: {
              num: 1,
              data: [
                {
                  id: 121,
                  name: "Bug Fixes",
                  cases: {
                    num: 1,
                    data: [
                      {
                        id: 1211,
                        gid: 121,
                        description: "Fix login issue",
                        priority: "High",
                        prerequisite: "",
                        steps: {
                          num: 3,
                          data: [
                            {
                              id: 12111,
                              action: "Open the browser",
                              inputs: "Enter the URL: https://zcp.zintech.com",
                              expectedOutput:
                                "The login page should be displayed",
                            },
                            {
                              id: 12112,
                              action: "Enter the username and password",
                              inputs:
                                "Enter the username: admin, Enter the password: admin",
                              expectedOutput:
                                "The user should be logged in successfully",
                            },
                            {
                              id: 12113,
                              action: "Click on the login button",
                              inputs: "",
                              expectedOutput:
                                "The user should be redirected to the home page",
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
          title: "Version 1.0.0",
          description: "First version of ZCP-Web",
          createdTime: "2024/01/01 13:57",
          list: {
            num: 3,
            data: [
              {
                id: 211,
                name: "Login Functionalities",
                cases: {
                  num: 3,
                  data: [
                    {
                      id: 2111,
                      gid: 211,
                      description: "Login with valid credentials",
                      priority: "High",
                      prerequisite: "",
                      steps: {
                        num: 3,
                        data: [
                          {
                            id: 21111,
                            action: "Open the browser",
                            inputs: "Enter the URL: https://zcp.zintech.com",
                            expectedOutput:
                              "The login page should be displayed",
                          },
                          {
                            id: 21112,
                            action: "Enter the username and password",
                            inputs:
                              "Enter the username: admin, Enter the password: admin",
                            expectedOutput:
                              "The user should be logged in successfully",
                          },
                          {
                            id: 21113,
                            action: "Click on the login button",
                            inputs: "",
                            expectedOutput:
                              "The user should be redirected to the home page",
                          },
                        ],
                      },
                    },
                    {
                      id: 2112,
                      gid: 211,
                      description: "Login with invalid credentials",
                      priority: "High",
                      prerequisite: "",
                      steps: {
                        num: 3,
                        data: [
                          {
                            id: 21121,
                            action: "Open the browser",
                            inputs: "Enter the URL: https://zcp.zintech.com",
                            expectedOutput:
                              "The login page should be displayed",
                          },
                          {
                            id: 21122,
                            action: "Enter the username and password",
                            inputs:
                              "Enter the username: admin, Enter the password: invalid",
                            expectedOutput: "The user should not be logged in",
                          },
                          {
                            id: 21123,
                            action: "Click on the login button",
                            inputs: "",
                            expectedOutput:
                              "The user should not be redirected to the home page",
                          },
                        ],
                      },
                    },
                    {
                      id: 2113,
                      gid: 211,
                      description: "Logout",
                      priority: "High",
                      prerequisite: "Login with valid credentials",
                      steps: {
                        num: 2,
                        data: [
                          {
                            id: 21131,
                            action: "Click on the logout button",
                            inputs: "",
                            expectedOutput: "The user should be logged out",
                          },
                          {
                            id: 21132,
                            action: "Click on the login button",
                            inputs: "",
                            expectedOutput:
                              "The user should be redirected to the login page",
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
                cases: {
                  num: 3,
                  data: [
                    {
                      id: 2121,
                      gid: 212,
                      description: "Create a new account",
                      priority: "High",
                      prerequisite: "Login with valid credentials",
                      steps: {
                        num: 3,
                        data: [
                          {
                            id: 21211,
                            action: "Click on the account management tab",
                            inputs: "",
                            expectedOutput:
                              "The account management page should be displayed",
                          },
                          {
                            id: 21212,
                            action: "Click on the create account button",
                            inputs: "",
                            expectedOutput:
                              "The create account form should be displayed",
                          },
                          {
                            id: 21213,
                            action: "Enter the account details",
                            inputs:
                              "Enter the account name: Test Account, Enter the account type: Test Type",
                            expectedOutput:
                              "The account should be created successfully",
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
                cases: {
                  num: 3,
                  data: [
                    {
                      id: 2131,
                      gid: 213,
                      description: "Add a new device",
                      priority: "High",
                      prerequisite: "Login with valid credentials",
                      steps: {
                        num: 3,
                        data: [
                          {
                            id: 21311,
                            action: "Click on the device management tab",
                            inputs: "",
                            expectedOutput:
                              "The device management page should be displayed",
                          },
                          {
                            id: 21312,
                            action: "Click on the add device button",
                            inputs: "",
                            expectedOutput:
                              "The add device form should be displayed",
                          },
                          {
                            id: 21313,
                            action: "Enter the device details",
                            inputs:
                              "Enter the device name: Test Device, Enter the device type: Test Type",
                            expectedOutput:
                              "The device should be added successfully",
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
          title: "Version 1.0.1",
          description:
            "Second version of ZCP-Web, with bug fixes and new features",
          createdTime: "2024/01/02 09:23",
          list: {
            num: 1,
            data: [
              {
                id: 221,
                name: "Bug Fixes",
                cases: {
                  num: 1,
                  data: [
                    {
                      id: 2211,
                      gid: 221,
                      description: "Fix login issue",
                      priority: "High",
                      prerequisite: "",
                      steps: {
                        num: 3,
                        data: [
                          {
                            id: 22111,
                            action: "Open the browser",
                            inputs: "Enter the URL: https://zcp.zintech.com",
                            expectedOutput:
                              "The login page should be displayed",
                          },
                          {
                            id: 22112,
                            action: "Enter the username and password",
                            inputs:
                              "Enter the username: admin, Enter the password: admin",
                            expectedOutput:
                              "The user should be logged in successfully",
                          },
                          {
                            id: 22113,
                            action: "Click on the login button",
                            inputs: "",
                            expectedOutput:
                              "The user should be redirected to the home page",
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
          id: 21,
          title: "Test Run for Version 1.0.0",
          createdTime: "2024/01/03 10:45",
          startedTime: "2024/01/03 10:45",
          finishedTime: "2024/01/03 10:50",
          status: "finished",
          configurations: ["Chrome", "Safari", "Microsoft Edge"],
          plan: {
            id: 21,
            title: "Version 1.0.0",
            description: "First version of ZCP-Web",
            createdTime: "2024/01/01 13:57",
            list: {
              num: 3,
              data: [
                {
                  id: 211,
                  name: "Login Functionalities",
                  cases: {
                    num: 3,
                    data: [
                      {
                        id: 2111,
                        gid: 211,
                        description: "Login with valid credentials",
                        priority: "High",
                        prerequisite: "",
                        steps: {
                          num: 3,
                          data: [
                            {
                              id: 21111,
                              action: "Open the browser",
                              inputs: "Enter the URL: https://zcp.zintech.com",
                              expectedOutput:
                                "The login page should be displayed",
                            },
                            {
                              id: 21112,
                              action: "Enter the username and password",
                              inputs:
                                "Enter the username: admin, Enter the password: admin",
                              expectedOutput:
                                "The user should be logged in successfully",
                            },
                            {
                              id: 21113,
                              action: "Click on the login button",
                              inputs: "",
                              expectedOutput:
                                "The user should be redirected to the home page",
                            },
                          ],
                        },
                      },
                      {
                        id: 2112,
                        gid: 211,
                        description: "Login with invalid credentials",
                        priority: "High",
                        prerequisite: "",
                        steps: {
                          num: 3,
                          data: [
                            {
                              id: 21121,
                              action: "Open the browser",
                              inputs: "Enter the URL: https://zcp.zintech.com",
                              expectedOutput:
                                "The login page should be displayed",
                            },
                            {
                              id: 21122,
                              action: "Enter the username and password",
                              inputs:
                                "Enter the username: admin, Enter the password: invalid",
                              expectedOutput:
                                "The user should not be logged in",
                            },
                            {
                              id: 21123,
                              action: "Click on the login button",
                              inputs: "",
                              expectedOutput:
                                "The user should not be redirected to the home page",
                            },
                          ],
                        },
                      },
                      {
                        id: 2113,
                        gid: 211,
                        description: "Logout",
                        priority: "High",
                        prerequisite: "Login with valid credentials",
                        steps: {
                          num: 2,
                          data: [
                            {
                              id: 21131,
                              action: "Click on the logout button",
                              inputs: "",
                              expectedOutput: "The user should be logged out",
                            },
                            {
                              id: 21132,
                              action: "Click on the login button",
                              inputs: "",
                              expectedOutput:
                                "The user should be redirected to the login page",
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
                  cases: {
                    num: 3,
                    data: [
                      {
                        id: 2121,
                        gid: 212,
                        description: "Create a new account",
                        priority: "High",
                        prerequisite: "Login with valid credentials",
                        steps: {
                          num: 3,
                          data: [
                            {
                              id: 21211,
                              action: "Click on the account management tab",
                              inputs: "",
                              expectedOutput:
                                "The account management page should be displayed",
                            },
                            {
                              id: 21212,
                              action: "Click on the create account button",
                              inputs: "",
                              expectedOutput:
                                "The create account form should be displayed",
                            },
                            {
                              id: 21213,
                              action: "Enter the account details",
                              inputs:
                                "Enter the account name: Test Account, Enter the account type: Test Type",
                              expectedOutput:
                                "The account should be created successfully",
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
                  cases: {
                    num: 3,
                    data: [
                      {
                        id: 2131,
                        gid: 213,
                        description: "Add a new device",
                        priority: "High",
                        prerequisite: "Login with valid credentials",
                        steps: {
                          num: 3,
                          data: [
                            {
                              id: 21311,
                              action: "Click on the device management tab",
                              inputs: "",
                              expectedOutput:
                                "The device management page should be displayed",
                              actualOutput:
                                "The device management page is displayed",
                              result: "pass",
                            },
                            {
                              id: 21312,
                              action: "Click on the add device button",
                              inputs: "",
                              expectedOutput:
                                "The add device form should be displayed",
                              actualOutput: "The add device form is displayed",
                              result: "pass",
                            },
                            {
                              id: 21313,
                              action: "Enter the device details",
                              inputs:
                                "Enter the device name: Test Device, Enter the device type: Test Type",
                              expectedOutput:
                                "The device should be added successfully",
                              actualOutput: "The device is added successfully",
                              result: "pass",
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
          id: 22,
          title: "Test Run for Version 1.0.1",
          createdTime: "2024/01/04 14:32",
          startedTime: "2024/01/04 14:32",
          status: "running",
          configurations: ["Chrome", "Safari", "Microsoft Edge"],
          plan: {
            id: 22,
            title: "Version 1.0.1",
            description:
              "Second version of ZCP-Web, with bug fixes and new features",
            createdTime: "2024/01/02 09:23",
            list: {
              num: 1,
              data: [
                {
                  id: 221,
                  name: "Bug Fixes",
                  cases: {
                    num: 1,
                    data: [
                      {
                        id: 2211,
                        gid: 221,
                        description: "Fix login issue",
                        priority: "High",
                        prerequisite: "",
                        steps: {
                          num: 3,
                          data: [
                            {
                              id: 22111,
                              action: "Open the browser",
                              inputs: "Enter the URL: https://zcp.zintech.com",
                              expectedOutput:
                                "The login page should be displayed",
                            },
                            {
                              id: 22112,
                              action: "Enter the username and password",
                              inputs:
                                "Enter the username: admin, Enter the password: admin",
                              expectedOutput:
                                "The user should be logged in successfully",
                            },
                            {
                              id: 22113,
                              action: "Click on the login button",
                              inputs: "",
                              expectedOutput:
                                "The user should be redirected to the home page",
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
