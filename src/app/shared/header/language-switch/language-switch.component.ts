import {Component, inject} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-switch-language',
  imports: [
    TranslatePipe
  ],
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.scss'
})
export class LanguageSwitchComponent {
  private translateService = inject(TranslateService)

  switchLanguage(language: string) {
    this.translateService.use(language);
  }
}
