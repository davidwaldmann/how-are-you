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

  get_score_date(year: number, month: number, day: number): Date {
    return new Date(year, month, day);
  }

  get_month_name(monthIdx: number) {
    return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"][monthIdx];
  }

  get_date_url_param(year: number, month: number, day: number): string {
    let dayString = "" + day;
    if (day < 10) {
      dayString = "0" + dayString;
    }
    let monthString = "" + (month + 1);
    if (month < 9) {
      monthString = "0" + monthString;
    }
    return "" + year + "-" + monthString + "-" + dayString;
  }

  get_today_url_param(): string {
    let today = new Date();
    return this.get_date_url_param(today.getFullYear(), today.getMonth(), today.getDate());
  }

  /** @returns indices of the last 3 months incl the current */
  get_months_iterable(): Iterable<number> {
    let monthIdx = new Date().getMonth();
    return [(((monthIdx - 2) % 11) + 11) % 11, (((monthIdx - 1) % 11) + 11) % 11, monthIdx];
  }

  /** @returns " [1.5]" string with mean-value for tooltip */
  get_score_entry_mean_formatted_string(year: number, month: number, day: number): string {
    let scoreEntry = this.scoresService.get_score_entry(year, month, day);
    let scoreEntryMean = (scoreEntry !== undefined) ?
      scoreEntry.get_mean().toString() :
      "";
    return scoreEntryMean.length === 0? "": " [" + scoreEntryMean + "]";
  }

  score_entry_exists(year: number, month: number, day: number): boolean {
    return this.scoresService.has_entry(year, month, day);
  }

  /** @returns css-class with background-color for the score */
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
}
