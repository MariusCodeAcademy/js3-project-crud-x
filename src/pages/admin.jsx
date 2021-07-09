import React, { Component } from 'react';

class Admin extends Component {
  state = {
    formData: {
      title: 'ss',
      price: 50,
      quantity: 1,
    },
  };

  handleTextChange = ({ target }) => {
    const formDataCopy = { ...this.state.formData };
    formDataCopy[target.name] = target.value;
    this.setState({ formData: formDataCopy });
  };

  render() {
    const { title, price } = this.state.formData;
    return (
      <div className="admin-page">
        <h1>I am a Admin</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleTextChange}
            value={title}
            type="text"
            placeholder="Item title"
            name="title"
          />
          <input
            onChange={this.handleTextChange}
            value={price}
            type="number"
            placeholder="Item price"
            name="price"
          />
          <button type="submit">Add item</button>
        </form>
      </div>
    );
  }
}

export default Admin;
