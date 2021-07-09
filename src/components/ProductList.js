import React, { Component } from "react";
import { Table, Button } from "reactstrap";

export default class ProductList extends Component {

  render() {
    return (
      <div>
        <h2>{this.props.Info.title}</h2>

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>productName</th>
              <th>quantityPerUnit</th>
              <th>unitPrice</th>
              <th>unitsInStock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {this.props.products.map((product) => (
            <tr key={product.id}>
            <th scope="row">{product.id}</th>
              <td>{product.productName}</td>
              <td>{product.quantityPerUnit}</td>
              <td>{product.productName}</td>
              <td>{product.productName}</td>
              <td><Button onClick={()=> this.props.addToCart(product)} color="info">Add</Button></td>
            </tr>
          ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
