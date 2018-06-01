import React from 'react'

class Categories extends React.Component {

  state = {
    currentCategory: "All"
  }

  changeCategory = (event) => {
    this.setState({
      currentCategory: event.target.value
    })
  }

  render() {
    const { currentCategory } = this.state
    let topCategories = ["All", "Markets", "Mobile", "Politics", "Tech", "Business", "Life", "Other"]
    let final = topCategories.map(category => {
      return  (
        <label className="categoryLabel" key={category}>
          <input type="radio" value={category} onChange={this.props.selectCategory}  checked={currentCategory === category ? true : false} />
            {category}
        </label>)
    })

    return (
      <form onClick={this.changeCategory}>
        {final}
      </form>
    )
  }
}

export default Categories
