import { Component } from '@angular/core';
import { ScoreEntry } from './score-entry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'how-are-you';
  add: boolean = false;
  newEntryScore: string = "";

  add_score(): void {
    this.add = true;
  }

  receive_back_to_start($event: ScoreEntry): void {
    console.log("receive_back_to_start:");
    console.log($event);
    this.newEntryScore = String($event.get_score(0)) + String($event.get_score(0)) + String($event.get_score(0));
    this.add = false;
  }
}
