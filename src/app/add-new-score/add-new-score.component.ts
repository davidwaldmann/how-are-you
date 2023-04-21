import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ScoreEntry } from '../score-entry';
import { ScoresService } from '../shared/scores.service';

@Component({
  selector: 'app-add-new-score',
  templateUrl: './add-new-score.component.html',
  styleUrls: ['./add-new-score.component.css']
})
export class AddNewScoreComponent implements OnInit {
  @Input() scoreId?: number;
  scoreEntry: ScoreEntry = new ScoreEntry();
  isEditing: boolean = false;
  newCategory?: string;
  isEditingScore: boolean = false;

  constructor(private scoresService: ScoresService) { }

  ngOnInit(): void {
    if (this.scoreId !== undefined) {
      let tmpScoreEntry = this.scoresService.get_scores().get(this.scoreId);
      if (tmpScoreEntry !== undefined) {
        this.scoreEntry = tmpScoreEntry;
        this.isEditingScore = true;
      } else {
        console.error("davidwe **** To be edited scoreEntry could not be found. scoreId = ", this.scoreId);
      }
    }
  }

  post_new_score_entry(): void {
    if (!Number.isNaN(this.scoreEntry.get_total())) {
      // Edit ScoreEntry
      if (this.isEditingScore) {
        if (this.scoreId !== undefined) {
          this.scoresService.edit_score_entry(this.scoreId, this.scoreEntry);
        } else {
          console.error("davidwe **** To be edited scoreId ", this.scoreId, " is undefined");
        }
      }
      // Add new ScoreEntry
      else {
        this.scoresService.add_score_entry(this.scoreEntry);
      }
    }
    this.scoresService.set_add_new_entry_screen(false);
  }

  get_score_entry(scoreId: number): ScoreEntry | undefined {
    return this.scoresService.get_scores().get(scoreId);
  }

  on_tap(categoryId: number, score: number): void {
    // if already pressed, delete the score
    if (this.scoreEntry.get_score(categoryId) == score) {
      this.scoreEntry.delete_score(categoryId);
    } else {
      this.scoreEntry.add_score(categoryId, score);
    }
  }

  get_category_score(categoryId: number): number | undefined {
    return this.scoreEntry.get_score(categoryId);
  }

  get_categories(): Map<number, string> {
    return this.scoresService.get_categories();
  }

  edit_categories(): void {
    this.isEditing = !this.isEditing;
    // In Edit-Mode destroy all tapped scores from this entry
    this.scoreEntry = new ScoreEntry();
  }

  delete_category(id: number): boolean {
    return this.scoresService.delete_category_return_success(id);
  }

  submit_new_category(event: any): void {
    let newCat: string = event.target.value;
    newCat = newCat?.trim();
    if (newCat.length > 0) {
      this.scoresService.add_category_return_key(newCat);
    }
    // clear input field
    event.target.value = "";
  }

}
