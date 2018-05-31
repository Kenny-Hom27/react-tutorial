import React, { Component } from 'react';

//import any other components here
import HelloWorld from '../src/helloworld';
import Article from '../src/article';
import SearchBar from '../src/searchbar';

//import CSS here, so webpack knows to include in bundle
import style from '../client/style/main.css';

//this is the component that generates the body of the page
class App extends Component {
  constructor(props) {
    super(props);

    // this.toggleSummaries = this.toggleSummaries.bind(this);
    // this.moveTopThreeArticles = this.moveTopThreeArticles.bind(this)
    //default state
    //this keeps track of "live" data on the browser
    this.state = {
      articles: null,
      error: null,
      loaded: false,
      searchTerm: ""
    };
  }

  componentDidMount() {
    //fetching data clientside
    fetch('/api/articles').then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);

      //send data to our state
      //which will trigger render()
      this.setState({
        articles: data.items,
        loaded: true
      });
    }).catch((error) => {
      console.log(error);

      this.setState({
        error: error,
        loaded: true
      });
    });
  }

  //click handler for button
  toggleSummaries() {
    // this.setState((prevState, props) => ({
    //   showSummaries: !prevState.showSummaries
    // }))
    this.setState({
      showSummaries: !this.state.showSummaries
    })
  }

  moveTopFourArticles = () => {
    let tempArticles = [...this.state.articles]
    tempArticles = tempArticles.slice(4).concat(tempArticles.slice(0,4))

    this.setState({
      articles: tempArticles
    })
  }

  searchArticles = (articles) => {
    return articles.filter(article => {
      return this.downcaseTitle(article.headline).includes(this.state.searchTerm)
    })
  }

  downcaseTitle = (word) => {
    return word.split(" ").map(w => w.toLowerCase()).join(" ")
  }

  getSearchTerm = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  render() {
    const {loaded, error, articles, showSummaries, searchTerm} = this.state;
    if (error) {
      //render this when there's error getting data
      return <div>Sorry! Something went wrong</div>
    } else if (!loaded) {
      //render while content is loading
      return <div>Loading...</div>
    } else {
      //render articles
      let articleJSX = [];
      let searchedArticles = this.searchArticles(articles) || []
      searchedArticles.map((article, idx) => {
        articleJSX.push(
          <Article
            key={idx}
            article={article}
          />
        );
      });


      return (
        <div>
          <h1 className="wsjHeader"><img src='assets/wsj-logo.svg' /></h1>
          <div className="searchBar">
            <SearchBar getSearchTerm={this.getSearchTerm}/>
            <button className="shiftArticles" onClick={this.moveTopFourArticles}>Shift Articles</button>
          </div>
          <div className="allArticles">
            {articleJSX}
          </div>
        </div>
      );

    }
  }
}

export default App;
