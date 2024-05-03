import { Injectable, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
@Injectable({
  providedIn: 'root',
})
export class IconsService {
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);

  constructor() {
    this.matIconRegistry.addSvgIcon(
      'tp-bed',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icons/bed.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'tp-bus',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icons/bus.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'tp-camping',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icons/camping.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'tp-card',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icons/card.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'tp-category',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icons/category.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'tp-door-side',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icons/door_sliding.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'tp-dresser',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icons/dresser.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'tp-group',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icons/groups.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'tp-logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icons/Logo.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'tp-seat',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icons/seat.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'tp-weekend',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icons/weekend.svg'
      )
    );
  }
}
