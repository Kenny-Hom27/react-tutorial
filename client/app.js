import React, { Component } from 'react';

//import any other components here
import HelloWorld from '../src/helloworld';
import Article from '../src/article';
import SearchBar from '../src/searchbar';
import Categories from '../src/categories';

//import CSS here, so webpack knows to include in bundle
import style from '../client/style/main.css';

//this is the component that generates the body of the page
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: null,
      error: null,
      loaded: false,
      searchTerm: "",
      selectCategory: "All",
      spin: false
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

  makeItSpin = () => {
    this.setState({
      spin: !this.state.spin
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

  selectCategory = (event) => {
    this.setState({
      selectCategory: event.target.value
    })
  }

  categorizeArticles = (articles) => {
    let topCategories = ["Markets", "Mobile", "Politics", "Tech", "Business", "Life"]

    if (this.state.selectCategory === "All") return articles

    if (this.state.selectCategory === "Other") {
      return articles.filter(article => {
        return !topCategories.includes(article.category)
      })
    }

    return articles.filter(article => {
      return article.category === this.state.selectCategory
    })
  }

  render() {
    const {loaded, error, articles, showSummaries, searchTerm, spin} = this.state;
    if (error) {
      //render this when there's error getting data
      return <div>Sorry! Something went wrong</div>
    } else if (!loaded) {
      //render while content is loading
      return <div>Loading...</div>
    } else {
      //render articles
      let articleJSX = [];

      let categorizedArticles = this.categorizeArticles([...articles])
      let searchedArticles = this.searchArticles(categorizedArticles)

      searchedArticles.map((article, idx) => {
        articleJSX.push(
          <Article
            key={idx}
            article={article}
            spin={spin}
          />
        );
      });


      return (
        <div>
          <h1 className="wsjHeader"><img src='assets/wsj-logo.svg' /></h1>
          <div className="filterBar">
            <Categories className="categories" selectCategory={this.selectCategory}/>
            <div className="searchBar"><SearchBar getSearchTerm={this.getSearchTerm}/></div>
            <button className="shiftArticles" onClick={this.moveTopFourArticles}>Shift Articles</button>
            <button className="spinImages" onClick={this.makeItSpin}>Spin Articles</button>
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
