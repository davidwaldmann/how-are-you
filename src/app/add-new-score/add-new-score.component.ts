import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-score',
  templateUrl: './add-new-score.component.html',
  styleUrls: ['./add-new-score.component.css']
})
export class AddNewScoreComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  add_new_score(): boolean {
    return false;
  }

}
