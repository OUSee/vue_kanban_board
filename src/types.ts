export enum TaskType {
  "unresolved" = "unresolved",
  "accepted" = "accepted",
  "inProgress" = "inProgress",
  "resolved" = "resolved",
}

export type Task = {
  taskId: number;
  name: string;
  description: string;
  taskType: TaskType;
};
