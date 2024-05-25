import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { CityState } from '../../../citites/utils/types/cities.type';
import { SupervisorState } from '../../../supervisor/utils/types/supervisor.type';
import { BuildingAction } from '../../../building/data-access/store/building.action';
import { BuildingState } from '../../../building/utils/types/building.type';
import { SuitesAction } from '../../../mina/data-access/store/suites.action';
import { SuiteState } from '../../../mina/utils/types/suites.type';
import { CityAction } from '../../../citites/data-access/store/cities.action';
import { SupervisorAction } from '../../../supervisor/data-access/store/supervisor.action';
import { LoungeArafahAction } from '../../../arafah/data-access/store/lounge-arafah.action';
import { LoungeArafahState } from '../../../arafah/utils/types/lounges-arafah.type';
import { PilgrimState } from '../../../pilgrim/utils/types/pilgrim.type';
import { PilgrimAction } from '../../../pilgrim/data-access/store/pilgrim.action';
import { LocationState } from '../../../locations/utils/types/location.type';
import { LocationAction } from '../../../locations/data-access/store/location.action';
import { BusState } from '../../../buses/utils/types/buses.type';
import { BusesAction } from '../../../buses/data-access/store/buses.action';
import { DistributeState } from '../../../mina/utils/types/distribute.type';
import { DistributionAction } from '../../../mina/data-access/store/distribution.action';

@Component({
  standalone: true,
  selector: 'app-layout-shell',
  template: `
    <sidebar>
      <router-outlet />
    </sidebar>
  `,
  styles: [``],
  imports: [SidebarComponent, RouterOutlet],
})
export class LayoutShellComponent {
  private cityStore = inject(Store<{ cities: CityState }>);
  private supervisorStore = inject(Store<{ supervisors: SupervisorState }>);
  private buildingStore = inject(Store<{ building: BuildingState }>);
  private suitesStore = inject(Store<{ suites: SuiteState }>);
  private loungeArafahStore = inject(
    Store<{ lounges_arafah: LoungeArafahState }>
  );
  private pligrmStore = inject(Store<{ pligrms: PilgrimState }>);
  private locationStore = inject(Store<{ locations: LocationState }>);
  private busStore = inject(Store<{ buses: BusState }>);
  private distributeStore = inject(Store<{ distribute: DistributeState }>);
  ngOnInit(): void {
    this.buildingStore.dispatch(BuildingAction.get());
    this.suitesStore.dispatch(SuitesAction.get());
    this.cityStore.dispatch(CityAction.get());
    this.supervisorStore.dispatch(SupervisorAction.get());
    this.loungeArafahStore.dispatch(LoungeArafahAction.get());
    this.pligrmStore.dispatch(PilgrimAction.get());
    this.locationStore.dispatch(LocationAction.get());
    this.busStore.dispatch(BusesAction.get());
    // this.distributeStore.dispatch(
    //   DistributionAction.read({ pack: 'package1' })
    // );
    // this.distributeStore.dispatch(
    //   DistributionAction.read({ pack: 'package4' })
    // );
  }
}
