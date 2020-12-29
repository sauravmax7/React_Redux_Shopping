//feature 1
import React from "react";
import data from './data.json'
import Products from "./components/Products";
class App extends React.Component{

  constructor(props) {
    super(props)
  
    this.state = {
       products:data.products,
       size:"",
       sort:""
    };
  }
  

  render(){
  return (
    <div className="App">
      <header className="grid-container">
        <a href="/">Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main"><Products products={this.state.products}/></div>
          <div className="sidebar">Cart Items</div>
        </div>
      </main>
      <footer>
        All Rights Reserved.
      </footer>

    </div>
  );
}
}
export default App;
