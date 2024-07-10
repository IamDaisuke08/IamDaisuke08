import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
setDisplay() {
throw new Error('Method not implemented.');
}
  title = 'job.app';
  navBars = new Array(4).fill(false);

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
  }
}
