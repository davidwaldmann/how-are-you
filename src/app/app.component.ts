import { Component } from '@angular/core';
import { Category } from './category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'how-are-you';
  add: boolean = false;
  categories: Category[] = [
    {id: 1, name: "Bewegung"},
    {id: 2, name: "Schlaf"},
    {id: 3, name: "Ernährung"},
  ]

  add_score(): void {
    this.add = true;
  }

  receive_back_to_start($event: boolean): void {
    this.add = $event;
  }
}
