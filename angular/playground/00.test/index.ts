class User {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    sayHelo() {
        return `${this.name} says hi`;
    }
}

const user = new User('Atilla');
console.log(user.sayHelo());
