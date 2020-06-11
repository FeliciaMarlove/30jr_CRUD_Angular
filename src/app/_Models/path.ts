import { Task } from './task';

/**
 * Modèle : parcours
 */
export interface Path {
  pathId: number;
  pathName: string;
  pathShortDescription: string;
  pathLongDescription?: string;
  pathActive: boolean;
  tasks?: Task[];
}
