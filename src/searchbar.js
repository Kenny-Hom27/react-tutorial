import React from 'react'

class SearchBar extends React.Component {
  render() {
    return (
      <div>
        <input type="text" placeholder="Search Title" onChange={this.props.getSearchTerm}/>
      </div>
    )
  }
}

export default SearchBar
