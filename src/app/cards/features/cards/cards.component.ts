import { Component, inject } from '@angular/core';
import { StateCardComponent } from '@/shared/components/state-card/state-card.component';
import { FormControl, FormGroup } from '@angular/forms';
import { MaterialModule } from '@/shared/module/material.module';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CityState } from '@/citites/utils/types/cities.type';
import { selectCities } from '@/citites/data-access/store/cities.reducer';
import { UploadOperationsComponent } from '@/shared/components/upload-operations/upload-operations.component';
import { UploadOpsService } from '@/shared/service/upload-operations.service';
import { catchError, of, tap } from 'rxjs';
import { BatchesRes } from '@/shared/types/upload-operations.type';
import { TPState } from '@/shared/types/base.type';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [StateCardComponent, MaterialModule, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  private cityStore = inject(Store<{ cities: CityState }>);
  private service = inject(UploadOpsService);
  cities$ = this.cityStore.select(selectCities);
  batches: BatchesRes['batch_links'] = [];
  total_batches: BatchesRes['total_batches'] = 0;
  total_pilgrims: BatchesRes['total_pilgrims'] = 0;
  total_batches_not_complete = 0;
  isLoading = false;
  status: TPState = 'sending';
  errorMsg = '';
  form = new FormGroup({
    package_name: new FormControl(),
    city: new FormControl(),
  });

  get controls() {
    return this.form.controls;
  }
  send(batch: BatchesRes['batch_links'][0]) {
    this.isLoading = true;
    this.status = 'sending';
    const { package_name, city } = this.form.value;
    this.service
      .sendBatchReqeust({
        package_name,
        city: { name: city },
        batch_number: batch.batch_number,
      })
      .pipe(
        tap((res) => {
          this.status = 'success';
          this.isLoading = false;
        }),
        catchError((error) => {
          this.status = 'error';
          this.isLoading = false;
          this.errorMsg = error;
          return of(error);
        })
      )
      .subscribe();
  }
  action() {
    this.isLoading = true;
    this.status = 'sending';
    this.errorMsg = '';
    const { package_name, city } = this.form.value;
    this.service
      .cardBatches({ package_name, city: { name: city } })
      .pipe(
        tap(({ batch_links, total_batches, total_pilgrims }) => {
          this.total_batches_not_complete = batch_links.filter(
            (b) => b.is_sent
          ).length;
          this.batches = batch_links;
          this.total_batches = total_batches;
          this.total_pilgrims = total_pilgrims;
          this.isLoading = false;
          this.status = 'success';
        }),
        catchError((error) => {
          this.status = 'error';
          this.isLoading = false;
          console.log(error);
          this.errorMsg = error.error.error;
          return of(error);
        })
      )
      .subscribe();
  }
}
