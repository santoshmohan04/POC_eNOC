import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from './notification.component';
import { By } from '@angular/platform-browser';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbDropdownModule, NotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of notifications in the badge', () => {
    const badge = fixture.debugElement.query(By.css('.badge')).nativeElement;
    expect(badge.textContent.trim()).toBe(String(component.notifications.length));
  });

  it('should display the "No notifications" message when notifications are empty', () => {
    component.notifications = [];
    fixture.detectChanges();

    const noNotificationsElement = fixture.debugElement.query(By.css('.dropdown-item.text-muted'));
    expect(noNotificationsElement.nativeElement.textContent.trim()).toBe('No notifications');
  });

  it('should display up to 3 notifications and a "More" button if notifications are more than 3', () => {
    component.notifications = [
      { id: 1, message: 'Notification 1' },
      { id: 2, message: 'Notification 2' },
      { id: 3, message: 'Notification 3' },
      { id: 4, message: 'Notification 4' },
    ];
    fixture.detectChanges();

    const notificationItems = fixture.debugElement.queryAll(By.css('.dropdown-item span'));
    expect(notificationItems.length).toBe(3);

    const moreButton = fixture.debugElement.query(By.css('.btn-link.text-primary'));
    expect(moreButton).toBeTruthy();
  });

  it('should call handleMore when "More" button is clicked', () => {
    spyOn(component, 'handleMore');
    component.notifications = [
      { id: 1, message: 'Notification 1' },
      { id: 2, message: 'Notification 2' },
      { id: 3, message: 'Notification 3' },
      { id: 4, message: 'Notification 4' },
    ];
    fixture.detectChanges();

    const moreButton = fixture.debugElement.query(By.css('.btn-link.text-primary'));
    moreButton.triggerEventHandler('click', null);

    expect(component.handleMore).toHaveBeenCalled();
  });

  it('should toggle dropdown visibility on mouseenter and mouseleave', () => {
    const container = fixture.debugElement.query(By.css('.notification-container'));

    container.triggerEventHandler('mouseenter', null);
    expect(component.isDropdownOpen).toBeTrue();

    container.triggerEventHandler('mouseleave', null);
    expect(component.isDropdownOpen).toBeFalse();
  });
});
