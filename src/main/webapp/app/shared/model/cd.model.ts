import { Moment } from 'moment';
import { State } from 'app/shared/model/enumerations/state.model';

export interface ICd {
  id?: number;
  name?: string;
  performer?: string;
  releaseYear?: string;
  diskCount?: string;
  medium?: string;
  label?: string;
  state?: State;
  added?: Moment;
}

export class Cd implements ICd {
  constructor(
    public id?: number,
    public name?: string,
    public performer?: string,
    public releaseYear?: string,
    public diskCount?: string,
    public medium?: string,
    public label?: string,
    public state?: State,
    public added?: Moment
  ) {}
}
