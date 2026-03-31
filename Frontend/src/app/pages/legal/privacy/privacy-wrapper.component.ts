import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrivacyComponentEn } from './en/privacy.component';
import { PrivacyComponentNl } from './nl/privacy.component';


@Component({
  selector: 'app-privacy',
  imports: [PrivacyComponentEn, PrivacyComponentNl],
  templateUrl: './privacy-wrapper.component.html',
  styleUrl: './privacy-wrapper.component.scss',
})
export class PrivacyComponent implements OnInit {
  private translateService: TranslateService = inject(TranslateService);
  protected currentLang: string = this.translateService.currentLang;

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe((event) => {
      if (event.lang === 'nl') {
        this.currentLang = 'nl';
      } else {
        this.translateService.setDefaultLang('en');
        this.currentLang = 'en';
      }
    });
  }
}
