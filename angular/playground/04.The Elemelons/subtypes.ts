import { Melon } from "./Melon";

export class WaterMelon extends Melon {
    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
    }

    public getType(): string {
        return "Water";
    }

    public toString(): string {
        return super.toString();
    }
}

export class Firemelon extends Melon {
    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
    }

    public getType(): string {
        return "Fire";
    }

    public toString(): string {
        return super.toString();
    }
}

export class Earthmelon extends Melon {
    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
    }

    public getType(): string {
        return "Earth";
    }

    public toString(): string {
        return super.toString();
    }
}

export class Airmelon extends Melon {
    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
    }

    public getType(): string {
        return "Air";
    }

    public toString(): string {
        return super.toString();
    }
}

export class Melolemonmelon extends WaterMelon {
    private elemenets: Array<string> = ['Fire', 'Earth', 'Air', 'Water'];

    public morph(): string {
        const element = this.elemenets.shift();
        this.elemenets.push(element);
        return element;
    }

    public toString(): string {
        return super.toString();
    }
}