var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    User.prototype.sayHelo = function () {
        return "".concat(this.name, " says hi");
    };
    return User;
}());
var user = new User('Atilla');
console.log(user.sayHelo());
