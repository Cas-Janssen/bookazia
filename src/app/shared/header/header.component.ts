import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ElementRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SearchFiltersComponent } from './search-filters/search-filters.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { LanguageSwitchComponent } from './language-switch/language-switch.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ProfileOptionsComponent } from './profile-options/profile-options.component';

@Component({
  selector: 'app-header',
  imports: [
    SearchFiltersComponent,
    NgIf,
    FormsModule,
    LanguageSwitchComponent,
    TranslatePipe,
    ProfileOptionsComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  protected searchQuery: string = '';
  private router = inject(Router);
  private destroy$: Subject<void> = new Subject<void>();
  public isLoggedIn: boolean = false;
  protected isProfileMenuOpen: boolean = false;
  private authService: AuthService = inject(AuthService);
  private el: ElementRef = inject(ElementRef);

  ngOnInit(): void {
    this.authService.currentLoginStatus
      .pipe(takeUntil(this.destroy$))
      .subscribe((status) => {
        this.isLoggedIn = status;
        if (!status) {
          this.isProfileMenuOpen = false;
        }
      });
  }
  ngAfterViewInit() {
    const headerImages = this.el.nativeElement.querySelectorAll('img');

    if (headerImages.length > 0) {
      let loadedImages = 0;
      const totalImages = headerImages.length;

      const checkAllImagesLoaded = () => {
        loadedImages++;
        if (loadedImages === totalImages) {
          setTimeout(() => this.adjustContentPadding(), 50);
        }
      };

      headerImages.forEach((img: HTMLImageElement) => {
        if (img.complete) {
          checkAllImagesLoaded();
        } else {
          img.addEventListener('load', checkAllImagesLoaded);
        }
      });
    } else {
      this.adjustContentPadding();
    }

    window.addEventListener('resize', this.adjustContentPadding.bind(this));

    this.adjustContentPadding();
  }

  adjustContentPadding() {
    const header = this.el.nativeElement.querySelector('header');
    const nav = header.querySelector('nav');

    if (nav) {
      const navHeight = nav.offsetHeight;
      const content = header.nextElementSibling;

      if (content) {
        content.style.paddingTop = `${navHeight}px`;
      }
      const filters = header.querySelector('app-search-filters');
      if (filters) {
        filters.style.marginTop = `${navHeight}px`;

        filters.style.width = '100%';
        filters.style.marginLeft = '0';
        filters.style.marginRight = '0';

        void filters.offsetHeight;
      }
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.adjustContentPadding.bind(this));
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onLogout(): void {
    this.authService.logout();
    window.alert('You have been logged out!');
    this.router.navigate(['/']);
  }

  public goToMenu(path: string): void {
    this.router.navigate([path]);
  }

  public navigateFromQuery(
    query: string,
    inputElement: HTMLInputElement
  ): void {
    inputElement.blur();
    if (query == '') {
      query = '*';
    }

    this.goToMenu('search/' + query);
    this.searchQuery = '';
  }

  protected toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  protected closeProfileMenu(): void {
    this.isProfileMenuOpen = false;
  }
}
