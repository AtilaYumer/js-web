export abstract class Melon {
    public weight: number;
    public melonSort: string;

    constructor(weight: number, melonSort: string) {
        this.weight = weight;
        this.melonSort = melonSort;
    }

    public getElementIndex(): number {
        return this.weight * this.melonSort.length;
    }

    abstract getType(): string;

    protected toString(): string {
        return `Element: ${this.getType()}\nSort: ${this.melonSort}\nElement Index: ${this.getElementIndex()}`;
    }
}