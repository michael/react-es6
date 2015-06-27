import React from "react";
var $$ = React.createElement;


export class ToolComponent extends React.Component {
  constructor(props) {
    super(props);
    // Set the state
    this.state = {
      active: props.active,
      disabled: props.disabled
    };
  }

  handleMouseDown(e) {
    e.preventDefault();
    console.log('button clicked');
  }

  handleClick(e) {
    e.preventDefault();
  }

  render() {
    var classNames = this.props.className.split(' ');

    if (this.state.disabled) classNames.push('disabled');
    if (this.state.active) classNames.push("active");

    return $$("button", {
      className: classNames.join(' '),
      onMouseDown: this.handleMouseDown,
      onClick: this.handleClick
    }, this.props.children);
  }
}

ToolComponent.defaultProps = {className: ""};


export class CiteToolComponent extends ToolComponent {
  handleMouseDown(e) {
    console.log('special behavior');
  }
}


class App extends React.Component {
  render() {
    return $$('div', {className: 'commentBox'},
      $$(ToolComponent, {}, "Strong"),
      $$(CiteToolComponent, {}, "Cite")
    );
  }
}

React.render(
  $$(App, {
    myVar: "Hello"
  }),
  document.getElementById('container')
);

