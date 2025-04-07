import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

export class TranslationLoader implements TranslateLoader {
  private httpClient: HttpClient = inject(HttpClient);

  public getTranslation(lang: string): Observable<any> {
    return this.httpClient.get(`assets/i18n/${lang}.json`);
  }
}
