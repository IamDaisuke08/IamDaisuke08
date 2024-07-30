import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AuthorisationService } from '@services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  navDisplay: string = 'block';
  navBars = new Array(4).fill(false);
  showingMobileBar : boolean = false;

  breakpoint = inject(BreakpointObserver);
  auth = inject(AuthorisationService);

  ngOnInit(): void {
    this.breakpoint
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
  }

  logout() {
    this.auth.user$.next(null);
    sessionStorage.clear();
    this.hideMenu();
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

    this.hideMenu();
  }

  setDisplay() {
    if(this.navDisplay == 'none') {
      this.navDisplay = 'block';
    } else {
      this.navDisplay = 'none';
    }
  }

  hideMenu() {
    if (this.navDisplay == 'block' && this.showingMobileBar) {
      this.navDisplay = 'none';
    }
  }
}
