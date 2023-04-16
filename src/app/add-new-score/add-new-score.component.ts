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

  constructor() { }

  ngOnInit(): void {
    // console.log("categories:");
    // console.log(categories);
  }

  add_new_score(): void {
    this.scoreEntry.add_score(0, 1);
    this.scoreEntry.add_score(1, 2);
    this.scoreEntry.add_score(2, 3);
    this.backToStartEvent.emit(this.scoreEntry);
  }

}
