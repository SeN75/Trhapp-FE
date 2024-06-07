import {
  selectSuites,
  selectIsLoading,
} from '@/mina/data-access/store/suites.reducer';
import { BedsTentMina } from '@/mina/utils/types/beds-tent-mina.type';
import { LoungesMina } from '@/mina/utils/types/lounges-mina.type';
import { SuiteState } from '@/mina/utils/types/suites.type';
import { MaterialModule } from '@/shared/module/material.module';
import { LoungeMina, Suite } from '@/shared/types/base.type';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';

@Component({
  selector: 'tp-mina-pack1-stepper',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './mina-pack1-stepper.component.html',
  styleUrl: './mina-pack1-stepper.component.scss',
})
export class MinaPack1StepperComponent implements AfterViewInit {
  private store = inject(Store<{ suites: SuiteState }>);
  isLoading$ = this.store.select(selectIsLoading);
  loaded = false;
  @ViewChild(MatStepper) stepper!: MatStepper;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() value = new EventEmitter<BedsTentMina[0]>();
  bedDataSource = new MatTableDataSource<BedsTentMina[0]>();
  bedObs = this.bedDataSource.connect();
  sutite$ = this.store.select(selectSuites);

  selectedSuite: Suite | null = null;
  selectedLounge: LoungeMina | null = null;
  beds: BedsTentMina = [];
  selectedBed: BedsTentMina[0] | null = null;
  constructor() {
    this.isLoading$.pipe(takeUntilDestroyed()).subscribe((s) => {
      this.loaded = s || false;
    });
  }
  selectSuite(suite: Suite) {
    this.selectedSuite = suite;
    this.selectedLounge = null;
    this.selectedBed = null;
    this.stepper.next();
  }
  selectLounge(lounge: LoungeMina) {
    this.selectedLounge = lounge;
    this.bedDataSource.data = lounge.beds || [];
    this.selectedBed = null;

    this.stepper.next();
  }
  selectBed(bed: BedsTentMina[0]) {
    console.log(bed);
    this.selectedBed = bed;
    this.value.emit(bed);
  }
  ngAfterViewInit(): void {
    this.bedDataSource.paginator = this.paginator;
  }
}
