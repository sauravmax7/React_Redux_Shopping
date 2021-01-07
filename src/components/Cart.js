import React, { Component } from 'react'
import formatCurrency from "../util";
import Fade from 'react-reveal/Fade'

export default class Cart extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
            name:"",
            email:"",
            address:"",
            isProceedClicked:false         
        }

    }

    handleProceed=()=>{
        this.setState({
            isProceedClicked:true
        })
    }

    handleInput=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    createOrder=(e)=>{
        e.preventDefault();
        const order = {
            name:this.state.name,
            email:this.state.email,
            address:this.state.address,
            cartItems:JSON.parse(localStorage.getItem("cartItems"))
        };
        
        this.props.createOrder(order);
    }

    render() {

        let cartItems;

        if(localStorage.getItem("cartItems")===null){
             cartItems=this.props.cartItems;
        }
        else{
            cartItems=JSON.parse(localStorage.getItem("cartItems"))
        }
        

        return (
            <>
            <div>
                {cartItems.length===0? (<div className="cart cart-header"> Cart is empty!</div>
                ):(
                <div className="cart cart-header">You have {cartItems.length} items in the cart</div>
                )}
            </div>
            <div>
                <div className="cart">
                    <Fade left cascade>
                    <ul className="cart-items">
                        {
                            cartItems.map(item=>(
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt=""/>
                                    </div>
                                    <div className="right">
                                        <div>{item.title}</div>
                                        <div>{item.count}*{item.price}={formatCurrency(item.count*item.price)}</div>
                                        <button onClick={()=>{this.props.removeItem(item)}}>Remove</button>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    </Fade>
                </div>
                {cartItems.length!==0?<div >
                    <div className="total">
                        <div>
                            Total:{" "}
                            {formatCurrency(cartItems.reduce((a,b)=>a+b.price*b.count,0))}
                        </div>
                    
                    <button onClick={this.handleProceed} className="button primary">Proceed</button>
                    </div>
                { this.state.isProceedClicked ? (<div className="cart">
                  <Fade bottom >
                  <form onSubmit={this.createOrder}>
                    <ul className="form-container">
                      <li>
                        <label>Email</label>
                        <input
                          name="email"
                          type="email"
                          required
                          onChange={this.handleInput}
                        ></input>
                      </li>
                      <li>
                        <label>Name</label>
                        <input
                          name="name"
                          type="text"
                          required
                          onChange={this.handleInput}
                        ></input>
                      </li>
                      <li>
                        <label>Address</label>
                        <input
                          name="address"
                          type="text"
                          required
                          onChange={this.handleInput}
                        ></input>
                      </li>
                      <li>
                        <button className="button primary" type="submit">
                          Checkout
                        </button>
                      </li>
                    </ul>
                  </form>
                  </Fade>
                </div>):(<div></div>)}
                </div>:("")}
                
            </div>
            </>
        )
    }
}
