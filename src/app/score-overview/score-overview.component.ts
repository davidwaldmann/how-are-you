import { Component, OnInit } from '@angular/core';
import { ScoresService } from '../shared/scores.service';
import { COLOR_CLASSES, ScoreEntry } from '../score-entry';

@Component({
  selector: 'app-score-overview',
  templateUrl: './score-overview.component.html',
  styleUrls: ['./score-overview.component.css']
})
export class ScoreOverviewComponent implements OnInit {
  colorClasses: string[] = COLOR_CLASSES;
  selectedScoreId?: Date;

  constructor(private scoresService: ScoresService) { }

  ngOnInit(): void {
  }

  get_scores(year: number, month: number): { [day: number]: ScoreEntry; } {
    return this.scoresService.get_score_month(year, month);
  }

  get_score_date(year: number, month: number, day: number): Date {
    return new Date(year, month, day);
  }

  get_score_key(year: number, month: number, day: number): string {
    // console.debug("2023-04-" + (day < 10)? ("0" + day): ("" + day));
    let dayString: string;
    if (day < 10) { dayString = "0" + day; }
    else {  dayString = "" + day; }
    let monthString: string;
    if (month < 9) { monthString = "0" + (month + 1); }
    else {  monthString = "" + (month + 1); }
    return "" + year + "-" + monthString + "-" + dayString;
  }

  get_today_score_key(): string {
    let today = new Date();
    return this.get_score_key(today.getFullYear(), today.getMonth(), today.getDate());
  }

  edit_score_entry(year: number, month: number, day: number): void {
    // if scoreEntry does not exist, do nothing
    if (!this.scoresService.has_entry(year, month, day)) {
      return;
    }
    this.selectedScoreId = new Date(year, month, day);

    // ************ TODO *********************
    // this.scoresService.set_add_new_entry_screen(true);
  }

  get_score_entry_mean(year: number, month: number, day: number): string {
    let scoreEntry = this.scoresService.get_score_entry(year, month, day);
    let scoreEntryMean = (scoreEntry !== undefined)? scoreEntry.get_mean().toString(): "";
    return (scoreEntryMean.length !== 0)? " [" + scoreEntryMean + "]": "";
  }

  score_entry_exists(year: number, month: number, day: number): boolean {
    let scoreId = this.get_score_key(year, month, day); 
    return this.scoresService.has_entry(year, month, day);
  }

  get_color_class(year: number, month: number, day: number): string {
    const scoreEntry = this.scoresService.get_score_entry(year, month, day);
    if (scoreEntry) {
      return this.colorClasses[scoreEntry.get_total()];
    }
    // if no scoreEntry defined for this id, return empty string
    return '';
  }

  debug_add_score_entry(year: number, month: number, total: number) {
    let nextDay = this.scoresService.get_next_empty_day(year, month);
    let d = new Date(year, month, nextDay);
    const scoreEntry: ScoreEntry = new ScoreEntry(d);
    scoreEntry.debug_set_total(total);
    this.scoresService.add_score_entry_return_not_already_exists(scoreEntry);
  }

  get_score_entry(year: number, month: number, day: number): ScoreEntry | undefined {
    return this.scoresService.get_score_entry(year, month, day);
  }

}
