import React from 'react'

class SearchBar extends React.Component {
  render() {
    return (
      <div>
        <input type="text" placeholder="Search By Title" onChange={this.props.getSearchTerm}/>
      </div>
    )
  }
}

export default SearchBar
