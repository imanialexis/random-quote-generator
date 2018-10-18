import React, { Component, Fragment } from 'react'

class QuoteMachine extends Component {
    constructor() {
        super();
        this.state = {
            quote: '',
            hasQuote: false
        }
        this.END_POINT ="https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1"

    }
    getRandomQuote = event => {
        fetch(this.END_POINT)
        .then(response => response.json())
        .then (data => {
            console.log(data)
        })
    }
    render () {
        
        const { hasQuote } = this.state;
        return (
       <Fragment>
            <h1>Quote Machine </h1>
            <button onClick={this.getRandomQuote}>Click me to get a random quote</button>
           <br />
           { hasQuote === true ? null : 'no quote yet?'}
           </Fragment>
        )
    }

}

export default QuoteMachine