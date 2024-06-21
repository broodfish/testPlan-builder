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
  title: string;
  description: string;
  createdTime: string;
  list: {
    num: number;
    data: CaseGroup[];
  };
}

interface CaseGroup {
  id: number;
  name: string;
  cases: {
    num: number;
    data: Case[];
  };
}

interface Case {
  id: number;
  gid: number;
  description: string;
  priority: "High" | "Medium" | "Low";
  prerequisite: string;
  steps: {
    num: number;
    data: Step[];
  };
}

interface Step {
  id: number;
  action: string;
  inputs: string;
  expectedOutput: string;
  actualOutput?: string;
  result?: "pass" | "fail";
}

interface Run {
  id: number;
  title;
  createdTime: string;
  startedTime?: string;
  finishedTime?: string;
  status: "running" | "finished";
  configurations: string[];
  plan: Plan;
}
