import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HowItWorksComponent implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}
  goToSubscribePage() {
    this.navCtrl.navigateForward('/subscribe');
  }
}
