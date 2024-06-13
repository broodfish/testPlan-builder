interface Step {
  id: number;
  action: string;
  inputs: string;
  expectedOutput: string;
}

interface RunStep extends Step {
  actualOutput: string;
  result: string;
}

interface CustomTestCase {
  id: number;
  description: string;
  priority: "High" | "Medium" | "Low";
  prerequisite: string;
  steps: Step[];
}

interface RunCase extends CustomTestCase {
  steps: RunStep[];
}

interface CustomCaseGroup {
  suite: string;
  list: CustomTestCase[];
}

interface RunCaseGroup extends CustomCaseGroup {
  list: RunCase[];
}

interface CustomTestPlan {
  id: number;
  title: string;
  description: string;
  createdTime: string;
  cases: CustomCaseGroup[];
}

interface RunningRun {
  id: number;
  cases: RunCaseGroup[];
  title: string;
  configurations: string[];
  createdTime: string;
  status: "running";
  progress: number;
}

interface FinishedRun {
  id: number;
  cases: RunCaseGroup[];
  title: string;
  configurations: string[];
  createdTime: string;
  finishedTime: string | null;
  status: "finished" | "running";
  pass: number | null;
  fail: number | null;
  passRate: number | null;
}

interface CustomProject {
  id: number;
  name: string;
  createdTime: string;
  plans: CustomTestPlan[];
  runs: Array<RunningRun | FinishedRun>;
}

interface BreadCrumb {
  title: string;
  disabled: boolean;
  href: { name: string; params: RouteParams };
}
