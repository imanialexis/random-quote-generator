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
        this.END_POINT ="https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=33"

    }
    getRandomQuote = event => {
        fetch(this.END_POINT)
        .then(response => response.json())
        .then (data => {

            
            if(data[0].content && data[0].title && data[0].link) {
                let random = Math.floor(Math.random() * (data.length));
                console.log(random)
        
                let { quote } = this.state;
                // let something = data[random].content.replace(/(<([^>]+)>)/ig,"");
                quote.content = data[random].content.replace(/(<([^>]+)>)/ig,"");
                console.log(quote.content)
                // .replace(/(<([^>]+)>)/,"");
                quote.title = data[random].title;
                quote.link = data[random].link;
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
            <div onClick={ () => this.shareOnTwitter(title, content)}>
                <a href = { link } target ="_blank">
                <h1> { title } </h1>
                <p> { content } </p>
                </a>
            </div>
        )
    }

    shareOnTwitter = (title,content) => {
    
        window.open('http://twitter.com/share?url='+encodeURIComponent()+'&text='+encodeURIComponent(content + title), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');



    }
    render () {
        
        const { hasQuote } = this.state;
        return (
       <Fragment>
            <h1>Quote Machine </h1>
            <button onClick={this.getRandomQuote}  type="button" class="btn btn-light">Click me to get a random quote</button>
           <br />
           { hasQuote === true ? 
             this.renderQuote()
             : 'no quote yet?'}
           </Fragment>
        )
    }

}

export default QuoteMachine