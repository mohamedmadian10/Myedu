import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.page.html',
  styleUrls: ['./subscribe.page.scss'],
  standalone: false,
})
export class SubscribePage {
  private navCtrl = inject(NavController)
  subscribeForm: FormGroup;
  grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4'];
  topics = [
    { name: 'Arabic' },
    { name: 'Islamic' },
    { name: 'English' },
    { name: 'History' },
    { name: 'Sports' },
  ];

  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 },
  ];
  years: number[] = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

  constructor(private fb: FormBuilder) {
    this.subscribeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      childName: ['', [Validators.required]],
      dobDay: ['', [Validators.required]],
      dobMonth: ['', [Validators.required]],
      dobYear: ['', [Validators.required]],
      grade: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      topics: [[], [Validators.required, Validators.maxLength(3)]], // FormControl for selected topics
    });
  }

  get topicsControl(): FormControl {
    return this.subscribeForm.controls['topics'] as FormControl;
  }

  toggleTopic(index: number) {
    const selectedTopics: string[] = this.topicsControl.value;
    const topicName: string = this.topics[index].name;
  
    if (selectedTopics.includes(topicName)) {
      this.topicsControl.setValue(
        selectedTopics.filter((topic: string) => topic !== topicName)
      );
    } else if (selectedTopics.length < 3) {
      this.topicsControl.setValue([...selectedTopics, topicName]);
    }
  }
  
  goBack() {
    this.navCtrl.back();

  }
  onSubmit() {
    if (this.subscribeForm.valid) {
      const { dobDay, dobMonth, dobYear, topics, ...rest } = this.subscribeForm.value;
      const dob = `${dobYear}-${dobMonth}-${dobDay}`;
      console.log('Form Data:', { ...rest, dob, topics });
    }
  }
}
