const React = require("react");
const connect = require("react-redux").connect;
const actions = require("./actions.jsx");

class PhoneForm extends React.Component {
  constructor(props) {
    super(props);
  }
  onClick() {
    if (this.refs.phoneInput.value !== "") {
      const itemText = this.refs.phoneInput.value;
      this.refs.phoneInput.value = "";
      // addPhone из actions пришёл благодаря connect снизу файла
      return this.props.addPhone(itemText);
    }
  }
  render() {
    return <div>
      <input ref="phoneInput" />
      <button onClick={this.onClick.bind(this)}>Добавить</button>
    </div>
  }
};

class PhoneItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return <div>
      <p>
        <b>{this.props.text}</b><br />
        <button onClick={() => this.props.deletePhone(this.props.text)}>Удалить</button>
      </p>
    </div>
  }
};

class PhonesList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>
      {this.props.phones.map(item =>
        <PhoneItem key={item}
          text={item}
          deletePhone={this.props.deletePhone} />
      )}
    </div>
  }
};

class AppView extends React.Component {
  render() {
    return <div>
      <PhoneForm addPhone={this.props.addPhone} />
      <PhonesList {...this.props} />
    </div>
  }
};

// из store state в this.props.phones после отработанного aciton
function mapStateToProps(state) {
  return {
    phones: state.get("phones") // т.к. state - это Map можно использовать метод get
  };
}

module.exports = connect(mapStateToProps, actions)(AppView);

// Функция connect из пакета "react-redux" позволяет связать хранилище и компонент (в данном случае AppView). Благодаря этому все данные из хранилища будут передавать в компонент через объект props. Дополнительно мы можем установить ряд настроек. Так, первая функция mapStateToProps(), которая передается в connect, позволяет установить сопоставление между объектами из состояния хранилища с объектам в props у компонента AppView. В данном случае мы просто устанавливаем, что значение this.props.phones в компоненте AppView будет передавать значение из объекта phones из хранилища

// В Console - this.props:
// { phones: List, addPhone: ƒ, deletePhone: ƒ }

// Второй параметр в функции connect представляет набор действий, которые вызываются в компоненте AppView или в его дочерних компонентах. И опять же эти действия после этого мы сможем получить в компоненте AppView через значения this.props.addPhone и this.props.deletePhone.

// Действие this.props.addPhone передается в компонент PhoneForm и в нем уже вызывается по клику на кнопку. А действие this.props.deletePhone передается в компонент PhonesList, а через него далее в PhoneItem и там также вызывается по нажатию на кнопку "Удалить".