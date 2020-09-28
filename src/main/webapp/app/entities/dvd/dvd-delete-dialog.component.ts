import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDvd } from 'app/shared/model/dvd.model';
import { DvdService } from './dvd.service';

@Component({
  templateUrl: './dvd-delete-dialog.component.html',
})
export class DvdDeleteDialogComponent {
  dvd?: IDvd;

  constructor(protected dvdService: DvdService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dvdService.delete(id).subscribe(() => {
      this.eventManager.broadcast('dvdListModification');
      this.activeModal.close();
    });
  }
}
