export class DateKey {
    private year: number;
    private month: number;
    private day: number;

    constructor(year: number, month: number, day: number) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    toString(): string {
        let strMonth: string = this.month < 9? "0" + (this.month + 1): "" + (this.month + 1);
        let strDay: string = this.day < 10? "0" + this.day: "" + this.day;
        return "" + this.year + strMonth + strDay;
    }

    hashCode(): string {
        return "" + this.year + this.month + this.day;
    }

    equals(other: DateKey): boolean {
        return this.day === other.day && this.month === other.month && this.year === other.year;
    } 
}
