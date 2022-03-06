import { Box } from "./Box";

let numberBox = new Box<Number>();
numberBox.add(1);
numberBox.add(2);
numberBox.add(3);
console.log(numberBox.count());

console.log('==========================');

let stringBox = new Box<string>();
stringBox.add('Ali');
stringBox.add('Veli');
console.log(stringBox.count());
stringBox.remove();
console.log(stringBox.count());