import {Path} from './path';

export interface Task {
  taskId: number;
  taskName: string;
  taskShortDescription: string;
  taskLongDescription?: string;
  taskActive: boolean;
  paths?: Path[];
}
