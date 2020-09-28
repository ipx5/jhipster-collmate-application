import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICd } from 'app/shared/model/cd.model';
import { CdService } from './cd.service';

@Component({
  templateUrl: './cd-delete-dialog.component.html',
})
export class CdDeleteDialogComponent {
  cd?: ICd;

  constructor(protected cdService: CdService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cdService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cdListModification');
      this.activeModal.close();
    });
  }
}
