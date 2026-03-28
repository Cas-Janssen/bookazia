import { Component, inject, ElementRef, HostListener } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-switch-language',
  imports: [TranslatePipe],
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.scss',
})
export class LanguageSwitchComponent {
  private translateService = inject(TranslateService);
  private elementRef = inject(ElementRef);
  isOpen = false;

  ngOnInit(): void {
    const defaultLang = localStorage.getItem('defaultLang') || 'en';
    this.translateService.setDefaultLang(defaultLang);
    this.translateService.use(defaultLang);
  }

  switchLanguage(language: string): void {
    this.translateService.use(language);
    localStorage.setItem('defaultLang', language);
    this.isOpen = false;
  }

  currentLang(): string {
    return this.translateService.currentLang || 'en';
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen) return;

    if (
      this.elementRef.nativeElement &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.isOpen = false;
    }
  }
}
