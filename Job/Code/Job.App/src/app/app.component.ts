import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  navDisplay: string = 'block';
  navBars = new Array(4).fill(false);
  showingMobileBar : boolean = false;

  constructor(public breakepoint : BreakpointObserver) {
  }

  ngOnInit(): void {
    this.breakepoint
    .observe(['(max-width: 62rem)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.navDisplay = 'none';
        this.showingMobileBar = true;
      } else {
        this.navDisplay = 'block';
        this.showingMobileBar = false;
      }
    });

    // var testToken = localStorage.getItem('loginToken');
    // if (testToken === null){
    //   this.authService.LogIn('daisuke', 'password');
    // }
    // else {
    //   console.log('token available')
    // }
  }

  setSelected(selectedValue: string) {
    this.navBars.fill(false);
    if (selectedValue == "home") {
      this.navBars[0] = true;
    } else if (selectedValue == "application") {
      this.navBars[1] = true;
    } else if (selectedValue == "location") {
      this.navBars[2] = true;
    } else if (selectedValue == "jobstatus") {
      this.navBars[3] = true;
    }

    if (this.navDisplay == 'block' && this.showingMobileBar) {
      this.hideMenu();
    }
  }

  setDisplay() {
    if(this.navDisplay == 'none') {
      this.navDisplay = 'block';
    } else {
      this.navDisplay = 'none';
    }
  }

  hideMenu() {
    this.navDisplay = 'none';
  }
}
