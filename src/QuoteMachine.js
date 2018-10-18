import React, { Component, Fragment } from 'react'

class QuoteMachine extends Component {
    constructor() {
        super();
        this.state = {
            quote: {
                content: '',
                title: ''
            },
            hasQuote: false
        }
        this.END_POINT ="https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1"
        // this needs to be https otherwise you will run into errors

    }
    getRandomQuote = event => {
        fetch(this.END_POINT)
        .then(response => response.json())
        .then(data => {
            console.log('This is the data >>>', data[0].title, data[0].content)
           if (data[0].content && data[0].title) {
               let { quote } = this.state;
               quote.content = data[0].content;
               quote.title = data[0].title;
               this.setState( { quote }, () => {
                   if (this.state.hasQuote === false) {
                       this.setState({ hasQuote: true })
                   }
               })
            }
             else {
               return console.error('No quote has been found')
           }
        })
    }

    renderQuote = () => {
        const { title, content } = this.state.quote;
        return (
            <div>
                <h1> { title } </h1>
                <p><i> { content } </i>
                <hr />
        )
    }
    render () {
        
        const { hasQuote,quote } = this.state;
        return (
       <Fragment>
            <h1>Quote Machine </h1>
            <button onClick={this.getRandomQuote}> 
                Click me to get a random quote
             </button>
            {/* isMember ? "$2.00" : "$10.00" */}
            <br />
            { hasQuote === true ? 
            this.renderQuote()
            : 'no quote yet'}
           </Fragment>
        )
    }

}

export default QuoteMachine;