import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDvd, Dvd } from 'app/shared/model/dvd.model';
import { DvdService } from './dvd.service';
import { DvdComponent } from './dvd.component';
import { DvdDetailComponent } from './dvd-detail.component';
import { DvdUpdateComponent } from './dvd-update.component';

@Injectable({ providedIn: 'root' })
export class DvdResolve implements Resolve<IDvd> {
  constructor(private service: DvdService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDvd> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((dvd: HttpResponse<Dvd>) => {
          if (dvd.body) {
            return of(dvd.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Dvd());
  }
}

export const dvdRoute: Routes = [
  {
    path: '',
    component: DvdComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'collmateApp.dvd.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DvdDetailComponent,
    resolve: {
      dvd: DvdResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'collmateApp.dvd.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DvdUpdateComponent,
    resolve: {
      dvd: DvdResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'collmateApp.dvd.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DvdUpdateComponent,
    resolve: {
      dvd: DvdResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'collmateApp.dvd.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
