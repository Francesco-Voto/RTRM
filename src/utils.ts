import { ImageSourcePropType } from 'react-native';
import { Status } from './types';
import { alive, dead, unknown } from './images';

const StatusTable: Record<Status, ImageSourcePropType> = {
  Dead: dead,
  Alive: alive,
  unknown,
};

export const getStatusImage = (status: Status) => {
  if (Object.prototype.hasOwnProperty.call(StatusTable, status)) {
    return StatusTable[status];
  }

  throw new Error(`Unknown Status: ${status}`);
};
