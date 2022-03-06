import { Junior, Manager, Senior } from './employees';

const junior = new Junior('Junior', 24);
junior.work();
junior.collectSalary();

console.log('==============================');

const senior = new Senior('Senior', 32);
senior.work();
senior.collectSalary();

console.log('===============================');

const manager = new Manager('Manager', 40);
manager.work();
manager.collectSalary();
