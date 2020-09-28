import { Moment } from 'moment';
import { State } from 'app/shared/model/enumerations/state.model';

export interface IDvd {
  id?: number;
  name?: string;
  releaseYear?: string;
  diskCount?: string;
  format?: string;
  lang?: string;
  state?: State;
  added?: Moment;
}

export class Dvd implements IDvd {
  constructor(
    public id?: number,
    public name?: string,
    public releaseYear?: string,
    public diskCount?: string,
    public format?: string,
    public lang?: string,
    public state?: State,
    public added?: Moment
  ) {}
}
