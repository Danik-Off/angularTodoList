import { Task } from '../interfaces/task';

export function mapTaskToJson(task: Task): string {
  return JSON.stringify({
    id: task.id,
    text: task.text,
    done: task.done,
    priority: task.priority,
    startDate: task.startDate,
    endDate: task.endDate,
    categoryId: task.categoryId
  });
}

export function mapJsonToTask(storageFormat: string): Task {
  const parsedData = JSON.parse(storageFormat) as Task;
  return {
    id: parsedData.id,
    text: parsedData.text,
    done: parsedData.done,
    priority: parsedData.priority,
    startDate: parsedData.startDate,
    endDate: parsedData.endDate,
    categoryId: parsedData.categoryId,
  };
}
