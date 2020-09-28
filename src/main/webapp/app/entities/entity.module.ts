import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'cd',
        loadChildren: () => import('./cd/cd.module').then(m => m.CollmateCdModule),
      },
      {
        path: 'dvd',
        loadChildren: () => import('./dvd/dvd.module').then(m => m.CollmateDvdModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class CollmateEntityModule {}
