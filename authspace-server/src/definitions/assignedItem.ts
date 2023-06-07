import {AnyObject} from '../utils/types';
import {WorkspaceResource} from './system';

export type AssignedItemPartRepresentation = string | number | AnyObject;

export interface AssignedItem<Meta extends AnyObject = AnyObject>
  extends WorkspaceResource {
  assignee: AssignedItemPartRepresentation;
  assigned: AssignedItemPartRepresentation;
  assigneeHash: string;
  assignerHash: string;
  meta: Meta;
}
