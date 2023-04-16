import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../category';

@Component({
  selector: 'app-score-category',
  templateUrl: './score-category.component.html',
  styleUrls: ['./score-category.component.css']
})
export class ScoreCategoryComponent implements OnInit {
  @Input() category?: Category;

  constructor() { }

  ngOnInit(): void {
  }

}
