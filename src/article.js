import React, { Component } from 'react';

//Basic Article Component
class Article extends Component {
  constructor(props) {
    super(props);

    //initial state
    this.state = {
      showImage: true
    };
  }

  //Component Lifecycle
  //https://reactjs.org/docs/react-component.html#the-component-lifecycle
  /* DEPRECATED LIFECYCLE METHODS BELOW
  UNSAFE_componentWillMount() {
    console.log('component will mount');
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('component will receive props');
  }
  UNSAFE_componentWillUpdate() {
    console.log('component will update');
  }
  */


  // static getDerivedStateFromProps(props, state) {
  //   console.log('get derived state from props');
  //   return null;
  // }
  //
  // componentDidMount() {
  //   console.log('component did mount');
  // }
  // shouldComponentUpdate() {
  //   return true;
  // }
  // getSnapshotBeforeUpdate(prevProps, prevState){
  //   console.log('get snapshot before update');
  //   return { foo: 'bar' };
  // }
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   console.log('component did update');
  // }
  // componentWillUnmount() {
  //   console.log('component will unmount');
  // }

  changeImageToSummary = () => {
    this.setState({
      showImage: !this.state.showImage
    })
  }

  openLink = () => {
    window.open(this.props.article.share_link)
  }

  render() {
    const { headline, image, summary } = this.props.article
    let newImage;
    if (!image) {
      newImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png'
    }
    let displayImage = <div className="articleImage" >
                        <img src={image ? image : newImage} alt="img" width="200px" height="200px"/>
                       </div>
    let displaySummary = <div className="articleSummary">
                          {summary}
                          <div className="moreInfoButton">
                            <button onClick={this.openLink}>More Info</button>
                          </div>
                        </div>
    return (
      <div className="individualArticle" onClick={this.changeImageToSummary}>
       <h3 className="articleHeader">{headline}</h3>
       {this.state.showImage ? displayImage : displaySummary}
     </div>
    )
  }
};

//set default props here, if any
Article.defaultProps = {};

//export so others can use
export default Article;
