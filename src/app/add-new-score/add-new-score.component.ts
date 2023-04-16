import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../category';

@Component({
  selector: 'app-add-new-score',
  templateUrl: './add-new-score.component.html',
  styleUrls: ['./add-new-score.component.css']
})
export class AddNewScoreComponent implements OnInit {
  @Input() categories?: Category[];
  @Output() backToStartEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    console.log("categories:");
    console.log(this.categories);
  }

  add_new_score(): void {
    this.backToStartEvent.emit(false);
  }

}
