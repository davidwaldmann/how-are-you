import { Component, Input, OnInit } from '@angular/core';
import { CATEGORIES } from '../mock-categories';

@Component({
  selector: 'app-score-category',
  templateUrl: './score-category.component.html',
  styleUrls: ['./score-category.component.css']
})
export class ScoreCategoryComponent implements OnInit {
  @Input() categoryId?: number;
  @Input() categoryName?: string;

  constructor() { }

  ngOnInit(): void {
    console.log("categoryId: ");
    console.log(this.categoryId);
  }

  onTap(score: number): void {
    // this.category?.score = score;
  }

}
