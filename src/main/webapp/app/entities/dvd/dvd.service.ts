import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDvd } from 'app/shared/model/dvd.model';

type EntityResponseType = HttpResponse<IDvd>;
type EntityArrayResponseType = HttpResponse<IDvd[]>;

@Injectable({ providedIn: 'root' })
export class DvdService {
  public resourceUrl = SERVER_API_URL + 'api/dvds';

  constructor(protected http: HttpClient) {}

  create(dvd: IDvd): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dvd);
    return this.http
      .post<IDvd>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(dvd: IDvd): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dvd);
    return this.http
      .put<IDvd>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDvd>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDvd[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(dvd: IDvd): IDvd {
    const copy: IDvd = Object.assign({}, dvd, {
      added: dvd.added && dvd.added.isValid() ? dvd.added.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.added = res.body.added ? moment(res.body.added) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((dvd: IDvd) => {
        dvd.added = dvd.added ? moment(dvd.added) : undefined;
      });
    }
    return res;
  }
}
