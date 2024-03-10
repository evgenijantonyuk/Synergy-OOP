// принцип программированич SOLID
// Single-responsibility principle - принцип единственной ответственности
// один КЛАСС = один ОБЪЕКТ плюс методы которые его "обслуживают"
// создаем класс который отвечает за формирование новостей на нашем
class News {
    constructor(title, text) {
        this.title = title;
        this.text = text;
        this.modified = false;
    }
    
    updateNews(text) {
        this.text = text;
        this.modified = true;
    }
}
    // одна сещность отвечает за ОДНО действае
    // toHTML() {  //  отображение в ВЕБе
    //     return `
    //     <div class='news'>
    //         <h1>${this.title}</h1>
    //         <p>${this.text}</p>
    //     </div>
    //     `
    // }
    // // отображение в мобильном приложении и это не хорошо, получается, что КЛАСС отвечает и за новость и за ее отображение
    // toJSON() {
    //     return JSON.stringify({
    //         title: this.title,
    //         text: this.text,
    //         modified: this.modified
    //     }, null, 2)

//     вот так ВЕРНО
class NewFormatter {
    constructor(news) {
        this.news = news;
    }
    toHTML() {  //  отображение в ВЕБе
        return `
        <div class='news'>
            <h1>${this.news.title}</h1>
            <p>${this.news.text}</p>
        </div>
        `
    }
    toJSON() {
        return JSON.stringify({
            title: this.news.title,
            text: this.news.text,
            modified: this.news.modified
        }, null, 2)
    }
}
const news = new News('Что такое SOLID?', 'SOLID  это абревиатура пяти основных принципов программирования в ООП.');
console.log(news)
// ===============================================================
// Open-closed principle - принцип откратости и закрытости
// позволяет расширять функционал, не переписывая существующий код
// class Circle {
//     constructor(radius) {
//         this.radius = radius;
//         this.type = 'circle';
//     }
// }
// class Square {
//     constructor(size) {
//         this.size = size;
//         this.type = 'square';
//     }
// }
// //   расчет площади фигур
// class AreaCalc {
//     constructor(shapes = []) {
//         this.shapes = shapes;
//     }
//     sum() {
//         return this.shapes.reduce((acc, shape) => {
//             if (shape.type === 'circle') {
//                 acc += (shape.radius ** 2) * Math.PI
//             } else if (shape.type === 'square') {
//                 acc += shape.size ** 2;
//             }
//             return acc;
//         }, 0)
//     }
// }

// правильное выражение соответствующее принципу - Open-closed principle
class Shape {
    area() {
        throw new Error('Please, implement Area method in your class');
    }
}
class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
        this.type = 'circle';
    }
    area() {
        return (this.radius ** 2) * Math.PI;
    }
}

class Square extends Shape {
    constructor(size) {
        super();
        this.size = size;
        this.type = 'square';
    }
    area() {
        return this.size ** 2;
    }
}

class Rectangle extends Shape {                 // самостоятельно добавленная фигура - прямоугольник!
    constructor(size1, size2) {
        super();
        this.size1 = size1;
        this.size2 = size2;
        this.type = Rectangle;
    }
    area() {
       return this.size1 * this.size2
    }
}
class AriaCalc {
    constructor(shapes = []) {
        this.shapes = shapes;
    }
    sum() {
        return this.shapes.reduce((acc, shape) => {
            acc += shape.area();
            return acc;
        }, 0)
    }
}
const calc = new AriaCalc([new Circle(10), new Square(5)]);
console.log(calc.sum());
const square = new Square(2);
console.log(square.area())
const rectangle = new Rectangle(10, 20);
console.log(rectangle.area());
// =============================================================
// Liskov substitution principle - принцип подстаноки Барбары Лисков
// class Employee {
//     accessToSecureSource () {
//         console.log('Access granted');
//     }
// }
// class FrontProgrammer extends Employee {};
// class BackProgrammer extends Employee {};
//
// function getSecureSource(employee) {
//     employee.accessToSecureSource();
// };
// class Desinger extends Employee {
//     accessToSecureSource() {
//             console.log('Access denied')
//         }
// };
// getSecureSource(new Desinger());
// getSecureSource(new FrontProgrammer());
// такой вариант работает верно
class Employee {};

class ProgrammerDepartment extends Employee {
    accessToSecureSource() {
        console.log('Access granted!');
    }
};
class DesignerDepartment extends Employee {
    isDesigner = true;
};

class FrontProgrammer extends ProgrammerDepartment {};

class BackProgrammer extends  ProgrammerDepartment {};

class Designer extends DesignerDepartment {
    accessToSecureSource() {
        console.log('Access denied');
    }
};
function getSecureSours(programmer) {
  programmer.accessToSecureSource();
};
getSecureSours(new FrontProgrammer());
getSecureSours(new BackProgrammer());
// =================================================================
// Interface segregation principle - принцип разделения интерфейса
// class Animal {
//     constructor(name) {
//         this.name = name;
//     }
//     fly() {
//         console.log(`${this.name} can fly`);
//     }
//     swim() {
//         console.log(`${this.name} can swim`);
//     }
//     walk() {
//         console.log(`${this.name} can walk`);
//     }
// }
//
// class Dod extends Animal{
//     fly() {
//         return null;
//     }
// }
// const dog = new Dod('Snowflake');
// dog.fly();
// dog.swim();
// dog.walk();

// нужно такб так верно
class Animal {
    constructor(name) {
        this.name = name;
    }
}
const swimmer = {
    swim() {
        console.log(`${this.name} can swim`);
    }
};
const flier = {
    fly() {
        console.log(`${this.name} can fly`);
    }
};
const walker = {
    walk() {
        console.log(`${this.name} can walk`);
    }
};

class Dog extends Animal{};
class Parrot extends Animal{};
class Dolphin extends Animal{};

Object.assign(Dog.prototype, swimmer, walker);
Object.assign(Parrot.prototype, flier, walker);
Object.assign(Dog.prototype, swimmer);

const dog = new Dog('Snowflake');
dog.swim();
dog.walk();
// dog.fly();

// Dependency inversion principle - принципп инверсии зависимостей
// прмтер из урока
// class Fetch {
//     request(url) {
//         return Promise.resolve('Test data');
//     }
// }
// class LocalStorage {
//     get() {
//         const localStorageData = 'neq test data';
//         return localStorageData
//     }
// }
// class FetchClient {
//     constructor() {
//         this.fetch = new Fetch()
//     }
// }
// class localStorageClient {
//     constructor() {
//         this.localStorage = new LocalStorage;
//     }
//         clientGet(key) {
//         return this.localStorage.get(key);
//         }
// }
// class Database {
//     constructor(client) {
//         this.client = client;
//     }
//     getData(url) {
//         return this.client.clientGet(url);
//     }
// }
// const db = new Database(new FetchClient);
// console.log(db.getData('any url'));
// const db1 = new Database(new localStorageClient)
// console.log(db1.getData('key'));

// ========== пример еще один, не из урока
// класс User не зависит от конкретной реализации класса MySQLDatabase, а зависит от абстракции Database. Это позволяет нам легко заменить реализацию базы данных на другую, не меняя код класса User.
class User {
    constructor(database) {
        this.database = database;
    }
    
    save() {
        this.database.save();
    }
}

class MySQLDatabase {
    save() {
        console.log('Saving to MySQL database');
    }
}

const user = new User(new MySQLDatabase());
user.save();