import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories = new Map<number, string>([
    [0, "Bewegung"], [1, "Schlaf"], [2, "Ernährung"], [3, "Ordnung"], [4, "Screentime"]
  ]);
  private nextKey: number = 5;

  public add_category_return_key(name: string): number {
      this.categories.set(this.nextKey, name);
      this.nextKey++;
      return this.nextKey - 1;
  }

  public delete_category_return_success(id: number): boolean {
    return this.categories.delete(id);
  }

  public get_name(id: number): string | undefined {
      return this.categories.get(id);
  }

  public get_categories(): Map<number, string> {
    return this.categories;
  }
}
