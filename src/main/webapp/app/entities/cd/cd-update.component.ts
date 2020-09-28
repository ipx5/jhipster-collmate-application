import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICd, Cd } from 'app/shared/model/cd.model';
import { CdService } from './cd.service';

@Component({
  selector: 'jhi-cd-update',
  templateUrl: './cd-update.component.html',
})
export class CdUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    performer: [],
    releaseYear: [],
    diskCount: [],
    medium: [],
    label: [],
    state: [],
    added: [],
  });

  constructor(protected cdService: CdService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cd }) => {
      if (!cd.id) {
        const today = moment().startOf('day');
        cd.added = today;
      }

      this.updateForm(cd);
    });
  }

  updateForm(cd: ICd): void {
    this.editForm.patchValue({
      id: cd.id,
      name: cd.name,
      performer: cd.performer,
      releaseYear: cd.releaseYear,
      diskCount: cd.diskCount,
      medium: cd.medium,
      label: cd.label,
      state: cd.state,
      added: cd.added ? cd.added.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cd = this.createFromForm();
    if (cd.id !== undefined) {
      this.subscribeToSaveResponse(this.cdService.update(cd));
    } else {
      this.subscribeToSaveResponse(this.cdService.create(cd));
    }
  }

  private createFromForm(): ICd {
    return {
      ...new Cd(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      performer: this.editForm.get(['performer'])!.value,
      releaseYear: this.editForm.get(['releaseYear'])!.value,
      diskCount: this.editForm.get(['diskCount'])!.value,
      medium: this.editForm.get(['medium'])!.value,
      label: this.editForm.get(['label'])!.value,
      state: this.editForm.get(['state'])!.value,
      added: this.editForm.get(['added'])!.value ? moment(this.editForm.get(['added'])!.value, DATE_TIME_FORMAT) : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICd>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
