import React, { Component } from 'react'
import formatCurrency from "../util";

export default class Cart extends Component {
    render() {

        const cartItems=this.props.cartItems;

        console.log(cartItems);
        
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
                </div>
                {cartItems.length!==0?<div className="cart">
                    <div className="total">
                        <div>
                            Total:{" "}
                            {formatCurrency(cartItems.reduce((a,b)=>a+b.price*b.count,0))}
                        </div>
                    </div>
                </div>:("")}
                

            </div>
            </>
        )
    }
}
