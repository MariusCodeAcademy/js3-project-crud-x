import React, { Component } from 'react';

class Admin extends Component {
  state = {
    formData: {
      title: 'ss',
      price: 50,
      quantity: 1,
    },
  };
  render() {
    return (
      <div className="admin-page">
        <h1>I am a Admin</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Item title" name="title" />
          <input type="number" placeholder="Item title" name="price" />
          <button type="submit">Add item</button>
        </form>
      </div>
    );
  }
}

export default Admin;
