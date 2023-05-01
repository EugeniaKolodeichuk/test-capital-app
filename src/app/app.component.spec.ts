import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        AppModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should show the form when showForm is true', () => {
    component.showForm = true;
    fixture.detectChanges();
    const form = fixture.nativeElement.querySelector('app-form');
    expect(form).toBeTruthy();
  });

  it('should show the filters when showForm is false', () => {
    component.showForm = false;
    fixture.detectChanges();
    const filters = fixture.nativeElement.querySelector('app-filters');
    expect(filters).toBeTruthy();
  });

  it('should toggle showForm when toggleForm() is called', () => {
    component.showForm = true;
    component.toggleForm();
    expect(component.showForm).toBe(false);
    component.toggleForm();
    expect(component.showForm).toBe(true);
  });
});
