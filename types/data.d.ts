interface BreadCrumb {
  title: string;
  disabled: boolean;
  href: { name: string; params: RouteParams };
}

interface Project {
  id: number;
  name: string;
  createdTime: string;
  plans: {
    num: number;
    data: Plan[];
  };
  runs: {
    num: number;
    data: Run[];
  };
}

interface Plan {
  id: number;
  name: string;
  createdTime: string;
  cases: {
    totalCases: number;
    totalSuites: number;
    data: CaseGroup[];
  };
}

interface CaseGroup {
  id: number;
  name: string;
  list: {
    num: number;
    data: Case[];
  };
}

interface Case {
  id: number;
  gid: number;
  name: string;
  priority: "High" | "Medium" | "Low";
  steps: {
    num: number;
    data: Step[];
  };
}

interface Step {
  id: number;
  action: string;
  expectedOutput: string;
  result: boolean | null;
  comment: string | null;
}

interface Run {
  id: number;
  name;
  createdTime: string;
  plan: Plan;
}

interface LogData {
  id: number;
  time: string;
  action: "created" | "finished" | "deleted";
  type: "project" | "plan" | "run";
  name: string;
}
