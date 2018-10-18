import React, { Component, Fragment } from 'react'

class QuoteMachine extends Component {
    constructor() {
        super();
        this.state = {
            quote: ''
            hasQuote: false
        }
        this.END_POINT ="http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1"

    }
    getRandomQuote = event => {
        console.log("it's clicking my guy ")
    }
    render () {
        
        const { hasQuote } = this.state
        return (
       <Fragment>
            <h1>Quote Machine </h1>
            <button onClick={this.getRandomQuote}>Click me to get a random quote</button>
           { hasQuote === true : null 'no quote yet?'}
           </Fragment>
        )
    }

}

export default QuoteMachine