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

    equals(other: any): boolean {
        if (other.year === undefined || other.month === undefined || other.day === undefined) {
            return false;
        }
        return this.hashCode() === other.hashCode();
    } 
}
