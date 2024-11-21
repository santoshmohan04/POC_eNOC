import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-translate',
  standalone: true,
  imports: [TranslateModule],
  providers: [TranslateService],
  templateUrl: './lang-translate.component.html',
  styleUrl: './lang-translate.component.scss'
})
export class LangTranslateComponent implements OnInit {
  currentLanguage: string = 'en';

  constructor(private readonly translate: TranslateService) {}

  ngOnInit(): void {
    // Set default language to English
    this.translate.setDefaultLang('en');
  }

  switchLanguage(lang: string): void {
    if (['en', 'ar'].includes(lang)) {
      this.currentLanguage = lang;
      this.translate.use(lang).subscribe({
        error: (err) =>
          console.error(`Translation loading error for ${lang}:`, err),
      });
    } else {
      console.warn(`Unsupported language: ${lang}`);
    }
  }

}
