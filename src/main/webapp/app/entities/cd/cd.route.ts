import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICd, Cd } from 'app/shared/model/cd.model';
import { CdService } from './cd.service';
import { CdComponent } from './cd.component';
import { CdDetailComponent } from './cd-detail.component';
import { CdUpdateComponent } from './cd-update.component';

@Injectable({ providedIn: 'root' })
export class CdResolve implements Resolve<ICd> {
  constructor(private service: CdService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICd> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((cd: HttpResponse<Cd>) => {
          if (cd.body) {
            return of(cd.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Cd());
  }
}

export const cdRoute: Routes = [
  {
    path: '',
    component: CdComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'collmateApp.cd.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CdDetailComponent,
    resolve: {
      cd: CdResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'collmateApp.cd.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CdUpdateComponent,
    resolve: {
      cd: CdResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'collmateApp.cd.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CdUpdateComponent,
    resolve: {
      cd: CdResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'collmateApp.cd.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
