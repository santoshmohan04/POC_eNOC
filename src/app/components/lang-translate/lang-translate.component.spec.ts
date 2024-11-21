import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LangTranslateComponent } from './lang-translate.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('LangTranslateComponent', () => {
  let component: LangTranslateComponent;
  let fixture: ComponentFixture<LangTranslateComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    const translationsMock: any = {
      welcome: 'Welcome',
    };

    const translateServiceStub = {
      setDefaultLang: jasmine.createSpy('setDefaultLang'),
      use: jasmine.createSpy('use').and.returnValue(of({})), // Spy for `use`
      get: jasmine.createSpy('get').and.callFake((key: string) => of(translationsMock[key] || key)),
    };

    await TestBed.configureTestingModule({
      imports: [
        LangTranslateComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
      providers: [{ provide: TranslateService, useValue: translateServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(LangTranslateComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  afterEach(() => {
    (translateService.use as jasmine.Spy).calls.reset(); // Reset spy after each test
  });

  it('should switch language to English', () => {
    component.switchLanguage('en'); // Call the method
    expect(translateService.use).toHaveBeenCalledWith('en'); // Check spy
    expect(component.currentLanguage).toBe('en'); // Verify state update
  });

  it('should call setDefaultLang during initialization', () => {
    expect(translateService.setDefaultLang).toHaveBeenCalledWith('en');
  });

  it('should display the translated text for the welcome message', () => {
    component.switchLanguage('en'); // Change language
    fixture.detectChanges(); // Apply DOM updates
    const welcomeText = fixture.nativeElement.querySelector('.welcome-text span').textContent;
    expect(welcomeText).toBe('welcome'); // Check translation
  });
});
