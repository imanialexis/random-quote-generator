import React, { Component, Fragment } from 'react'

class QuoteMachine extends Component {
    constructor() {
        super();
        this.state = {
            quote: {
                content: '',
                title: '',
                link: ''
            },
            hasQuote: true
        }
        this.END_POINT ="https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1"

    }
    getRandomQuote = event => {
        fetch(this.END_POINT)
        .then(response => response.json())
        .then (data => {
            if(data[0].content && data[0].title && data[0].link) {
                let { quote } = this.state;
                quote.content = data[0].content.replace(/(<([^>]+)>)/ig,"");
                quote.title = data[0].title;
                quote.link = data[0].link;
                this.setState( { quote }, () => {
                    if(this.setState.hasQuote === false) {
                        this.setState( { hasQuote: true} )
                    }
                })
            } else {
                return console.error('No quote has been found 404')
            }
            console.log(data)
        })
    }
    renderQuote = () => {
        const { title, content , link} = this.state.quote;
        return(
            <div onClick={ () => this.shareOnTwitter(title, link)}>
                <a href = { link } target ="_blank">
                <h1> { title } </h1>
                <p> { content } </p>
                </a>
            </div>
        )
    }

    shareOnTwitter = (text,link) => {
    
        window.open('http://twitter.com/share?url='+encodeURIComponent(link)+'&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');



    }
    render () {
        
        const { hasQuote } = this.state;
        return (
       <Fragment>
            <h1>Quote Machine </h1>
            <button onClick={this.getRandomQuote}>Click me to get a random quote</button>
           <br />
           { hasQuote === true ? 
             this.renderQuote()
             : 'no quote yet?'}
           </Fragment>
        )
    }

}

export default QuoteMachine