import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CollmateSharedModule } from 'app/shared/shared.module';
import { CdComponent } from './cd.component';
import { CdDetailComponent } from './cd-detail.component';
import { CdUpdateComponent } from './cd-update.component';
import { CdDeleteDialogComponent } from './cd-delete-dialog.component';
import { cdRoute } from './cd.route';

@NgModule({
  imports: [CollmateSharedModule, RouterModule.forChild(cdRoute)],
  declarations: [CdComponent, CdDetailComponent, CdUpdateComponent, CdDeleteDialogComponent],
  entryComponents: [CdDeleteDialogComponent],
})
export class CollmateCdModule {}
