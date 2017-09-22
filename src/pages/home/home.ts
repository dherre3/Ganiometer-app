import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
import { Platform } from 'ionic-angular';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {
  subscription;
  displayAngle:number;
  constructor(private platform: Platform, public navCtrl: NavController, private deviceOrientation: DeviceOrientation) {
    console.log(this.deviceOrientation);
    if(this.deviceOrientation)
    {
      this.platform.ready().then(()=>{
        this.subscription = this.deviceOrientation.watchHeading().subscribe(
          (data: DeviceOrientationCompassHeading) =>{
            console.log(data);
            this.displayAngle = data.trueHeading;

          }
        );
      }).catch(()=>{
        console.log("Not READ");
      });
    }

  }
  ngOnInit() {
    this.platform.ready().then(() => {
      if(this.deviceOrientation)
      {
        this.deviceOrientation.getCurrentHeading().then(
          (data: DeviceOrientationCompassHeading) => {
            console.log(data);
            this.displayAngle = data.trueHeading;
          },
          (error: any) => console.log(error)
        );
      }else console.log("FUCK");


    }).catch(() => {
      console.log("Not READ");
    });
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}
