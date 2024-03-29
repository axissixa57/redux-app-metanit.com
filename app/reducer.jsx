// Состояние хранилища будет представлять тип Immutable.Map, который представляет собой словарь, хранящий пары ключ-значение.
// В качестве ключей здесь используются названия свойств объекта.
const Map = require("immutable").Map; 

// в функции reducer при определении параметра присваиваем состоянию начальное значение - 
// пустой словарь: state = Map()
const reducer = function (state = Map(), action) {
    switch (action.type) {
        // вызывается в app.jsx
        case "SET_STATE":
            return state.merge(action.state); // .merge() объеденит объекты, + если у объекта с которым хотим объеденить есть такой же ключ, возьмёт его значение (вернёт новый объект)
        case "ADD_PHONE":
            return state.update("phones", (phones) => phones.push(action.phone));
        case "DELETE_PHONE":
            return state.update("phones",
                (phones) => phones.filterNot(
                    (item) => item === action.phone
                )
            );
    }
    return state;
}

// Первый параметр - это собственно состояние хранилища. Второй параметр - action - передает действие. 
// Так, как наши действия имеют свойство type, то мы можем получить это свойство и в зависимости от его значения тем или иным образом обновить состояние. 
// Для обновления состояния применяются методы класса Immutable.Map. Каждый такой метод возвращает новый объект Immutable.Map.
// Здесь предполагается, что в состоянии будет храниться массив phones, который будет содержать строки - название моделей телефонов. [ "iPhone 7 Plus", "Samsung Galaxy A5", ... ]
// Для добавления в массив применяется метод phones.push(), а для удаления мы просто возвращаем все те элементы, которые не равны удаляемому объекту. 
// Для этого применяется функция phones.filterNot, которая выполняет фильтрацию.
// И после каждого обновления состояния нам надо возвратить обновленное состояние. Таким образом произойдет обновление хранилища.

module.exports = reducer;