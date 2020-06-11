import {Path} from './path';

/**
 * Modèle : tâche
 */
export interface Task {
  taskId: number;
  taskName: string;
  taskShortDescription: string;
  taskLongDescription?: string;
  taskActive: boolean;
  paths?: Path[];
}
