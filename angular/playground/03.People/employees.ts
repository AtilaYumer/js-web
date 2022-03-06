import { Employee } from "./Employee";

export class Junior extends Employee {
    constructor(name: string, age: number) {
        super(name, age);
        this.tasks.push(`${this.name} is working on a simple task.`);
    }
}

export class Senior extends Employee {
    constructor(name: string, age: number) {
        super(name, age);
        this.tasks.push(`${this.name} is working on a complicated task.`);
        this.tasks.push(`${this.name} is taking time off work.`);
        this.tasks.push(`${this.name} is supervising junior workers.`);
    }
}

export class Manager extends Employee {
    public divident: number;

    constructor(name: string, age: number) {
        super(name, age);
        this.divident = 0;
        this.tasks.push(`${this.name} is scheduled a meeting.`)
        this.tasks.push(`${this.name} is preparing a quarterly meeting.`)
    }

    public getSalary(): number {
        return this.salary + this.divident;
    }
}