import { Component, OnInit, Input } from '@angular/core';
import { ScoreEntry } from '../score-entry';
import { ScoresService } from '../shared/scores.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-add-new-score',
  templateUrl: './add-new-score.component.html',
  styleUrls: ['./add-new-score.component.css']
})
export class AddNewScoreComponent implements OnInit {
  scoreEntry: ScoreEntry = new ScoreEntry(new Date());
  isEditing: boolean = false;
  newCategory?: string;
  scoreId?: Date;
  isEditingScore: boolean = false;

  constructor(private scoresService: ScoresService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    let scoreIdParam = params['score-id'];

    console.debug("AddNewScoreComponent score-id = ", scoreIdParam);
    let scoreIdIsValidKey = /\d/.test(scoreIdParam.charAt(scoreIdParam.length - 1));

    let date = this.get_date_from_date_string(scoreIdParam);
    let tmpScoreEntry = date?
          this.scoresService.get_score_entry(date.getFullYear(), date.getMonth(), date.getDate()) :
          undefined;

    // If scoreEntry already exists, set scoreId and flag
    if (tmpScoreEntry !== undefined) {
      this.scoreEntry = tmpScoreEntry;
      this.scoreId = scoreIdParam;
      this.isEditingScore = true;
    }
    else {
      let d = this.get_date_from_date_string(scoreIdParam);
      if (scoreIdIsValidKey && d !== undefined) {
        // console.debug(d);
        this.scoreEntry = new ScoreEntry(d);
      } else {
        this.scoreEntry = new ScoreEntry(new Date());
      }
    }
  }

  get_date_from_date_string(dateString: string): Date | undefined {
    if(dateString.length < 10) { return undefined; }
    let year = dateString.substring(0, 4);
    let month = dateString.substring(5, 7);
    let day = dateString.substring(8, 10);
    // console.debug("get_date_from_date_string() year, month, day = ", year, month, day);
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  post_new_score_entry(): void {
    // Add / edit scoreEntry in(to) ScoresService
    if (this.scoreId === undefined) {
      this.scoresService.add_score_entry_return_not_already_exists(this.scoreEntry);
      this.scoreId = this.scoreEntry.get_date();
      if (this.scoreId === undefined) {
        console.error("something wrong brother");
      }
    }
    else {
      if (!this.scoresService.edit_score_entry_return_success(this.scoreEntry)) {
        console.error("Could not edit score entry score-id = ", this.scoreId);
      }
    }
    // console.debug(this.scoresService.get_scores());
  }

  get_edit_date(): Date {
    return this.scoreEntry.get_date();
  }

  get_score_entry(scoreId: string): ScoreEntry | undefined {
    let date = this.get_date_from_date_string(scoreId);
    if (date === undefined) { return undefined; }
    return this.scoresService.get_score_entry(date?.getFullYear(), date?.getMonth(), date?.getDate());
  }

  on_tap(categoryId: number, score: number): void {
    // if already pressed, delete the score
    if (this.scoreEntry.get_score(categoryId) === score) {
      this.scoreEntry.delete_score(categoryId);
    }
    else {
      this.scoreEntry.add_score(categoryId, score);
    }
    this.post_new_score_entry();
  }

  get_category_score(categoryId: number): number | undefined {
    return this.scoreEntry !== undefined? this.scoreEntry.get_score(categoryId): -1;
  }

  get_categories(): Map<number, string> {
    return this.scoresService.get_categories();
  }

  edit_categories(): void {
    this.isEditing = !this.isEditing;
    // In Edit-Mode destroy all tapped scores from this entry
    if (this.scoreEntry !== undefined) {
      this.scoreEntry.reset_scores();
    }
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
