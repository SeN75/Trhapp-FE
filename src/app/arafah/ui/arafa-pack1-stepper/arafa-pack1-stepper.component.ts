import {
  selectLounges_arafah,
  selectIsLoading,
} from '@/arafah/data-access/store/lounge-arafah.reducer';
import { LoungeArafahState } from '@/arafah/utils/types/lounges-arafah.type';
import { MaterialModule } from '@/shared/module/material.module';
import { BedTentArafah, LoungeArafah } from '@/shared/types/base.type';
import { CommonModule } from '@angular/common';
import {
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
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'tp-arafa-pack1-stepper',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './arafa-pack1-stepper.component.html',
  styleUrl: './arafa-pack1-stepper.component.scss',
})
export class ArafaPack1StepperComponent {
  // private aRouter = inject(ActivatedRoute);
  private store = inject(Store<{ lounges_arafah: LoungeArafahState }>);

  lounges$ = this.store.select(selectLounges_arafah);
  isLoading$ = this.store.select(selectIsLoading);
  loaded = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatStepper) stepper!: MatStepper;

  @Output() value = new EventEmitter<BedTentArafah>();
  bedDataSource = new MatTableDataSource<BedTentArafah>();
  bedObs = this.bedDataSource.connect();

  selectedLounge: LoungeArafah | null = null;
  beds: BedTentArafah[] = [];
  selectedBed: BedTentArafah | null = null;
  constructor() {
    this.isLoading$.pipe(takeUntilDestroyed()).subscribe((s) => {
      this.loaded = s || false;
    });
  }

  selectLounge(lounge: LoungeArafah) {
    this.selectedLounge = lounge;
    this.bedDataSource.data = lounge.beds || [];
    this.bedDataSource.paginator = this.paginator;

    this.selectedBed = null;
    this.stepper.next();
  }
  selectBed(bed: BedTentArafah) {
    console.log(bed);
    this.selectedBed = bed;
    this.value.emit(bed);
  }
  ngAfterViewInit(): void {
    this.bedDataSource.paginator = this.paginator;
  }
}
