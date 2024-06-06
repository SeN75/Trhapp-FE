import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bus, DialogData } from '@/shared/types/base.type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BusState, CreateBus, UpdateBus } from '@/buses/utils/types/buses.type';
import { Store } from '@ngrx/store';
import { combineLatest, from, map } from 'rxjs';
import {
  selectErrors,
  selectIsLoading,
  selectStatus,
} from '../../data-access/store/buses.reducer';
import { BusesAction } from '../../data-access/store/buses.action';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@/shared/module/material.module';
import { CityState } from '../../../citites/utils/types/cities.type';
import { SupervisorState } from '../../../supervisor/utils/types/supervisor.type';
import { selectCities } from '../../../citites/data-access/store/cities.reducer';
import { selectSupervisores } from '../../../supervisor/data-access/store/supervisor.reducer';
import { LocationState } from '@/locations/utils/types/location.type';
import { selectLocations } from '@/locations/data-access/store/location.reducer';

@Component({
  selector: 'app-buses-form',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './buses-form.component.html',
  styleUrl: './buses-form.component.scss',
})
export class BusesFormComponent implements OnInit {
  private store = inject(Store<{ buses: BusState }>);
  private cityStore = inject(Store<{ cities: CityState }>);
  private supervisorStore = inject(Store<{ supervisors: SupervisorState }>);
  private locationStore = inject(Store<{ locations: LocationState }>);
  cities$ = this.cityStore.select(selectCities);

  supervisors$ = this.supervisorStore.select(selectSupervisores);
  locations$ = this.locationStore.select(selectLocations);
  data$ = combineLatest({
    status: this.store.select(selectStatus),
    error: this.store.select(selectErrors),
    isLoading: this.store.select(selectIsLoading),
  });
  locationForm = (is_start: boolean) =>
    new FormGroup({
      name: new FormControl<string>('', [Validators.maxLength(100)]),
      lat: new FormControl<number>(0, [Validators.max(922337203685477)]),
      lng: new FormControl<number>(0, [Validators.max(922337203685477)]),
      city: new FormGroup({
        name: new FormControl<string>('', [Validators.maxLength(100)]),
      }),
      package_name: new FormControl(),
      is_start: new FormControl<boolean>(is_start),
    });

  supervisorForm = () =>
    new FormGroup({
      name: new FormControl<string>('', [Validators.maxLength(100)]),
      phone_number: new FormControl<string>('', [Validators.maxLength(100)]),
    });
  form = new FormGroup({
    bus_code: new FormControl<string>('', [Validators.maxLength(100)]),
    bus_plate: new FormControl<string>('', [Validators.maxLength(100)]),
    bus_name: new FormControl<string>('', [Validators.maxLength(100)]),
    package_name: new FormControl('', [
      Validators.maxLength(100),
      Validators.required,
    ]),
    max_capacity: new FormControl<number>(0, [
      Validators.max(922337203685477),
      Validators.min(-922337203685477),
      Validators.required,
    ]),
    current_capacity: new FormControl<number>(0, [
      Validators.max(922337203685477),
      Validators.min(-922337203685477),
      Validators.required,
    ]),

    start_location_id: new FormControl<{
      name: string;
      lat: number;
      lng: number;
      city: { name: string };
      package_name: string;
      is_start: boolean;
    }>({
      name: '',
      lat: 0,
      lng: 0,
      city: { name: '' },
      package_name: '',
      is_start: true,
    }),
    start_location: this.locationForm(true),
    destination_location_id: new FormControl<string>(''),
    destination_location: this.locationForm(false),
    supervisor_id: new FormControl(''),
    supervisor: this.supervisorForm(),
  });
  get controls() {
    return this.form.controls;
  }
  addStartLocation = false;
  addDestinationLocation = false;
  addSupervisor = false;
  constructor(
    public dialogRef: MatDialogRef<BusesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData<Bus>
  ) {}
  ngOnInit(): void {
    if (this.data.type === 'update') {
      this.form.patchValue(this.data.data as any);
    }
  }

  action() {
    if (this.data.type === 'create') {
      const bus = this.form.getRawValue() as unknown as CreateBus;
      bus.start_location.package_name = bus.package_name;
      bus.destination_location.package_name = bus.package_name;
      if (bus.start_location_id) {
        const start = JSON.parse(bus.start_location_id);
        bus.start_location = start;
        delete (bus as any).start_location_id;
      }
      if (bus.destination_location_id) {
        const destination = JSON.parse(bus.destination_location_id);
        bus.destination_location = destination;
        delete (bus as any).destination_location_id;
      }
      if (bus.supervisor_id) {
        const supervisor = JSON.parse(bus.supervisor_id);
        bus.supervisor = supervisor;
        delete (bus as any).superviso_id;
      }

      this.store.dispatch(BusesAction.create({ bus }));
    } else {
      const updateBus = this.form.getRawValue() as unknown as UpdateBus;
      this.store.dispatch(BusesAction.update({ updateBus }));
    }
    this.data$.pipe(map((res) => res.status)).subscribe((res) => {
      if (res === 'success') {
        this.dialogRef.close();
      }
    });
  }
}
