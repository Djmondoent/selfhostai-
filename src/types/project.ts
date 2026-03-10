export const frameworks = [
  "Next.js",
  "React",
  "Node",
  "Python Flask",
  "Laravel",
  "Static Site"
] as const;

export type Framework = (typeof frameworks)[number];

export type ProjectInput = {
  projectName: string;
  domain: string;
  framework: Framework;
  port: string;
  repoUrl: string;
  buildCommand: string;
  startCommand: string;
  environmentVariables: string;
};

export type ChecklistItem = {
  id: string;
  title: string;
  description: string;
  done?: boolean;
};

export type GuideStep = {
  title: string;
  body: string;
  command?: string;
  tip?: string;
};

export type TroubleshootingIssue = {
  title: string;
  reason: string;
  fix: string;
};
