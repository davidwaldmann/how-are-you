import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScoreEntry } from '../score-entry';
import { CATEGORIES } from '../mock-categories';

@Component({
  selector: 'app-add-new-score',
  templateUrl: './add-new-score.component.html',
  styleUrls: ['./add-new-score.component.css']
})
export class AddNewScoreComponent implements OnInit {
  @Output() backToStartEvent = new EventEmitter<ScoreEntry>();
  scoreEntry: ScoreEntry = new ScoreEntry();
  categories: string[] = CATEGORIES;
  idxPressed: number[] = [];

  constructor() { }

  ngOnInit(): void {
    for (let category in this.categories) {
      this.idxPressed.push(-1);
    }
  }

  send_new_entry(): void {
    this.backToStartEvent.emit(this.scoreEntry);
  }

  on_tap(categoryId: number, score: number): void {
    this.scoreEntry.add_score(categoryId, score);
    this.idxPressed[categoryId] = score;
  }

}
