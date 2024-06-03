import {
  Distribute,
  DistributeState,
} from '@/distribute/utils/types/distribute.type';
import {
  selectStatus,
  selectErrors,
  selectIsLoading,
  selectPack1Peek,
  selectPack4Peek,
} from '@/distribute/data-access/store/distribution.reducer';
import { Component, Inject, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, switchMap, tap } from 'rxjs';
import { MaterialModule } from '@/shared/module/material.module';
import {
  AsyncPipe,
  JsonPipe,
  NgClass,
  NgIf,
  NgTemplateOutlet,
} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { City, DialogData } from '@/shared/types/base.type';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DistributionAction } from '@/distribute/data-access/store/distribution.action';
import { LocationState } from '@/locations/utils/types/location.type';
import { selectLocations } from '@/locations/data-access/store/location.reducer';
import { ActivatedRoute } from '@angular/router';
import { DistributeGroupCardComponent } from '@/distribute/ui/distribute-group-card/distribute-group-card.component';

@Component({
  selector: 'tp-distribute-form',
  standalone: true,
  imports: [
    MaterialModule,
    AsyncPipe,
    NgIf,
    NgClass,
    NgTemplateOutlet,
    JsonPipe,
    DistributeFormComponent,
    DistributeGroupCardComponent,
  ],
  templateUrl: './distribute-form.component.html',
  styleUrl: './distribute-form.component.scss',
})
export class DistributeFormComponent {
  private store = inject(Store<{ distrbution: DistributeState }>);
  private loctionsStroe = inject(Store<{ locations: LocationState }>);
  private aRouter = inject(ActivatedRoute);
  get controls() {
    return this.form.controls;
  }
  data$ = combineLatest({
    status: this.store.select(selectStatus),
    error: this.store.select(selectErrors),
    isLoading: this.store.select(selectIsLoading),
  });
  form = new FormGroup({
    num_employees: new FormControl<number>(0),
    city: new FormControl<string>(''),
    // city: new FormGroup({
    //   name: new FormControl(),
    // }),
  });
  package_name = '';
  peek$ = this.store
    .select(selectPack1Peek)
    .pipe(tap((p) => console.log('ppp ==> ', p)));
  locations$ = this.loctionsStroe
    .select(selectLocations)
    .pipe(map((l) => l?.filter((_) => _?.is_start) || []));
  constructor(
    public dialogRef: MatDialogRef<DistributeFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData<Distribute & { package_name: string }>
  ) {}
  ngOnInit(): void {
    if (this.data.type === 'update') {
      this.form.patchValue(this.data.data as any);
    }
    if (this.data.data) {
      this.package_name = this.data.data.package_name;
    }
  }

  action() {
    console.log(this.form.getRawValue());
    if (this.data.type === 'create') {
      const value = this.form.getRawValue();
      this.store.dispatch(
        DistributionAction.peek({
          num_employees: value.num_employees!,
          city: { name: value.city! },
          pack: this.package_name as 'package1' | 'package4',
        })
      );
    } else if (this.data.type === 'update') {
      const value = this.form.getRawValue();
      this.store.dispatch(
        DistributionAction.update({
          num_employees: value.num_employees!,
          city: { name: value.city! },
          pack: this.package_name as 'package1' | 'package4',
        })
      );
    }
  }

  send() {
    this.data.type = 'update';
    this.action();
  }
}
