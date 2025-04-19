import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscribePage } from './subscribe.page';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

describe('SubscribePage', () => {
  let component: SubscribePage;
  let fixture: ComponentFixture<SubscribePage>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;

  beforeEach(async () => {
    navCtrlSpy = jasmine.createSpyObj('NavController', ['back']);

    await TestBed.configureTestingModule({
      declarations: [SubscribePage],
      imports: [ReactiveFormsModule, FormsModule, IonicModule.forRoot()],
      providers: [
        { provide: NavController, useValue: navCtrlSpy },
        FormBuilder,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SubscribePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.subscribeForm).toBeTruthy();
    expect(component.subscribeForm.controls['name']).toBeDefined();
    expect(component.subscribeForm.controls['email']).toBeDefined();
    expect(component.subscribeForm.controls['childName']).toBeDefined();
    expect(component.subscribeForm.controls['dobDay']).toBeDefined();
    expect(component.subscribeForm.controls['dobMonth']).toBeDefined();
    expect(component.subscribeForm.controls['dobYear']).toBeDefined();
    expect(component.subscribeForm.controls['grade']).toBeDefined();
    expect(component.subscribeForm.controls['gender']).toBeDefined();
    expect(component.subscribeForm.controls['topics']).toBeDefined();
  });

  it('should mark the form as invalid when required fields are empty', () => {
    const form = component.subscribeForm;
    expect(form.valid).toBeFalse();
  });

  it('should mark the form as valid when all required fields are filled correctly', () => {
    const form = component.subscribeForm;
    form.controls['name'].setValue('John Doe');
    form.controls['email'].setValue('john.doe@example.com');
    form.controls['childName'].setValue('Jane Doe');
    form.controls['dobDay'].setValue(15);
    form.controls['dobMonth'].setValue(5);
    form.controls['dobYear'].setValue(2010);
    form.controls['grade'].setValue('Grade 1');
    form.controls['gender'].setValue('Male');
    form.controls['topics'].setValue(['Arabic', 'English']);

    expect(form.valid).toBeTrue();
  });

  it('should toggle topics correctly when selecting/deselecting', () => {
    component.toggleTopic(0); // Select 'Arabic'
    expect(component.topicsControl.value).toContain('Arabic');

    component.toggleTopic(0); // Deselect 'Arabic'
    expect(component.topicsControl.value).not.toContain('Arabic');

    component.toggleTopic(0); // Select 'Arabic' again
    component.toggleTopic(1); // Select 'Islamic'
    component.toggleTopic(2); // Select 'English'

    expect(component.topicsControl.value.length).toBe(3); // Only 3 topics max
    component.toggleTopic(3); // Try selecting more than 3 topics
    expect(component.topicsControl.value.length).toBe(3); // Still 3 topics
  });

  it('should call navCtrl.back() when goBack() is called', () => {
    component.goBack();
    expect(navCtrlSpy.back).toHaveBeenCalled();
  });

  it('should log form data on valid submission', () => {
    const consoleSpy = spyOn(console, 'log');
    component.subscribeForm.controls['name'].setValue('John Doe');
    component.subscribeForm.controls['email'].setValue('john.doe@example.com');
    component.subscribeForm.controls['childName'].setValue('Jane Doe');
    component.subscribeForm.controls['dobDay'].setValue(15);
    component.subscribeForm.controls['dobMonth'].setValue(5);
    component.subscribeForm.controls['dobYear'].setValue(2010);
    component.subscribeForm.controls['grade'].setValue('Grade 1');
    component.subscribeForm.controls['gender'].setValue('Male');
    component.subscribeForm.controls['topics'].setValue(['Arabic', 'English']);

    component.onSubmit();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Form Data:', {
        name: 'John Doe',
        email: 'john.doe@example.com',
        childName: 'Jane Doe',
        dob: '2010-5-15',
        grade: 'Grade 1',
        gender: 'Male',
        topics: ['Arabic', 'English'],
      }
    );
  });
});
