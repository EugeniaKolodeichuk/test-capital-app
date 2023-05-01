import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public showForm = true;

  public toggleForm(): void {
    this.showForm = !this.showForm;
  }
}
