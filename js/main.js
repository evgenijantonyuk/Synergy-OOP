// объявление одиночного объекта
// let book = {
//     title: 'Anna Karenina',
//         author: 'L.Tolstoy',
//         annotation: function () {
//         console.log(`Автором книги ${this.title} является ${this.author}`);
//     }
// }
// let book1 = {
//     title: 'War and peace',
//     author: 'L.Tolstoy',
//     annotation: function () {
//         console.log(`Автором книги ${this.title} является ${this.author}`);
//     }
// }
// book.annotation()
// book1.annotation()
//
// // функциональный способ создания объекта
// // избавление от однотипного кода
// function Book (title, author) {
//     this.title = title;
//         this.author = author
// }
// let book4 = new Book('War and peace', 'L.Tolstoy')
// let book5 = new Book('Anna Karenina', 'L.Tolstoy')
// console.log(book4, book5)

// КЛАСС
// class BookClass {      // шаблон некого объекта
//     constructor(author = 'A.Pushkin', title = 'The Captains Daughter') {  // по умолчанию
//         this.author = author;
//         this.title = title;
//     }
//     showBook() {       // Метод...
//         console.log(`Автором книги ${this.title} является ${this.author}`);
//     }
// }
// // Использование
// let book6 = new BookClass('L.Tolstoy', 'Anna Karenina');
// book6.showBook();
// let book7 = new BookClass();
// book7.showBook();
// console.log(typeof BookClass);

// приватные свойства классов
class User {
    #password   // приватное свойство
    constructor(email, password) {
        this.email = email;
        this.#password = password;
    }
    
    login(email, password) {
        if (email === this.email && password === this.#password) {
            console.log('Login Successfully');
        } else {
            console.log('Authentication Failed!');
        }
    }
    
    resetPassword(newPassword) {
        this.#password = newPassword;
    }
    
    logout() {
        console.log('Logout Successfully!')
    }
}

let user = new User('user@mail.com', 'password');
user.login('email', 'password');

console.log(user.email);
console.log(user.password);

user.resetPassword('new_password');
user.login('user@mail.com', 'password');
user.login('user@mail.com', 'new_password');

//  раследование
class Author extends User {
    #numOfPost;
    constructor(email, password) {
        super(email, password);
        this.#numOfPost = 0;
    }
    createPost(content) {
        console.log(content)
        this.#numOfPost++;
    }
    getNumOfPost() {
        return this.#numOfPost
    }
};
let user1 = new Author('user@mail.com', 'password');
user1.login('user1@mail.com', 'password');
user1.createPost('L.Tolstoy is the Russian author');
console.log(user1.getNumOfPost());
