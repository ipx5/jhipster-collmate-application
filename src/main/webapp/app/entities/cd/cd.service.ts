import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICd } from 'app/shared/model/cd.model';

type EntityResponseType = HttpResponse<ICd>;
type EntityArrayResponseType = HttpResponse<ICd[]>;

@Injectable({ providedIn: 'root' })
export class CdService {
  public resourceUrl = SERVER_API_URL + 'api/cds';

  constructor(protected http: HttpClient) {}

  create(cd: ICd): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cd);
    return this.http
      .post<ICd>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(cd: ICd): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cd);
    return this.http
      .put<ICd>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICd>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICd[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(cd: ICd): ICd {
    const copy: ICd = Object.assign({}, cd, {
      added: cd.added && cd.added.isValid() ? cd.added.toJSON() : undefined,
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
      res.body.forEach((cd: ICd) => {
        cd.added = cd.added ? moment(cd.added) : undefined;
      });
    }
    return res;
  }
}
