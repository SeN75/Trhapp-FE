import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { DistributeState } from '../../utils/types/distribute.type';
import {
  selectPack1Read,
  selectPack4Read,
} from '../../data-access/store/distribution.reducer';
import { DistributionAction } from '../../data-access/store/distribution.action';

@Component({
  selector: 'app-mina-distribute',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mina-distribute.component.html',
  styleUrl: './mina-distribute.component.scss',
})
export class MinaDistributeComponent implements OnInit {
  private aRouter = inject(ActivatedRoute);
  pack = this.aRouter.snapshot.params['pack'] || 'pack1';

  private store = inject(Store<{ distribute: DistributeState }>);
  data$ =
    this.pack === 'pack1'
      ? this.store.select(selectPack1Read)
      : this.store.select(selectPack4Read);

  ngOnInit(): void {
    this.store.dispatch(
      DistributionAction.read({
        pack: this.pack === 'pack1' ? 'package1' : 'package4',
      })
    );
  }
}
