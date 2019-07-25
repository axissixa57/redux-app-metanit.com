const React = require("react");
const ReactDOM = require("react-dom");
const redux = require("redux");
const Provider = require("react-redux").Provider;
const reducer = require("./reducer.jsx");
const AppView = require("./appview.jsx");

// здесь собственно создается хранилище.
// В метод redux.createStore() следует передать функцию reducer, которая используется для обновления хранилища.
const store = redux.createStore(reducer);  
 
// Используя метод store.dispatch(), можно выполнить какое-либо действие. 
// В частности, здесь выполняется действие с типом "SET_STATE", которое устанавливает начальные данные для состояния хранилища.
store.dispatch({
  type: "SET_STATE",
  state: {
    phones: [ "iPhone 7 Plus", "Samsung Galaxy A5" ]
  }
});
 
// Чтобы связать хранилище и компонент, применяется провайдер - класс Provider из пакета "react-redux". 
// У провайдера устанавливается объект хранилища через свойство store: <Provider store={store}>. 
// Поэтому именно это хранилище и будет использоваться для поставки данных в AppView через выше рассмотренную функцию connect.
ReactDOM.render(
  <Provider store={store}>
    <AppView />
  </Provider>,
  document.getElementById("container")
);