export class Box<T> {
    private elements: Array<T> = [];

    public add(element: T): void {
        this.elements.unshift(element);
    }

    public remove(): T {
        return this.elements.shift();
    }

    public count(): number {
        return this.elements.length;
    }
}