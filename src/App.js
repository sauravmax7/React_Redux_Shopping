//feature 1
import React from "react";
import data from './data.json'
import Products from "./components/Products";
import Filter from "./components/Filter";
class App extends React.Component{

  constructor(props) {
    super(props)
  
    this.state = {
       products:data.products,
       size:"",
       sort:""
    };
  }
  
  sortProducts = (e) => {
    const sort=e.target.value;
    this.setState((state)=>({
      sort:sort,
      products: this.state.products.slice().sort((a,b)=>(
        sort==="lowest"?
        ((a.price>b.price)? 1:-1):
        sort==="highest"?
        ((a.price<b.price)? 1:-1):
        ((a._id<b._id)? 1:-1)
      ))
    }))
    //console.log(this.state.products)
  }

  filterdProducts= (e) => {
    const size = e.target.value;
    if(size===""){
      this.setState((state)=>({
        size:size,
        products:data.products
      }))
        
    }
    else{
    this.setState((state)=>({
      size:size,
      products:data.products.filter(p=>p.availableSizes.includes(size))
      
    }))
  }
   // console.log(this.state.products)
  }

  render(){
  return (
    <div className="App">
      <header className="grid-container">
        <a href="/">Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter 
            count={this.state.products.length}
            size={this.state.size}
            sort={this.state.sort}
            filterdProducts={this.filterdProducts}
            sortProducts={this.sortProducts}            
            />
            <Products products={this.state.products}/></div>
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
