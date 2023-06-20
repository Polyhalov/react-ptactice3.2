import { Component } from "react";
import css from './css.module.css';
class SearchBar extends Component {

    state = {
        search:''
    }
    handleChange = ({target}) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    })
  }


  handleSubmit = (e) => {
      e.preventDefault();
      const { onSubmit } = this.props;
      onSubmit({ ...this.state });
      this.reset();
    }
    reset() {
        this.setState({ search:'' });
    }

    render() {
        const { search } = this.state;
    return (
        <div>
            <header className={css.searchBar}>
  <form onSubmit={this.handleSubmit} className={css.searchForm}>
    <button type="submit"  className={css.searchFormBtn}>
      <span className={css.searchFormBtnLabel}>Search</span>
    </button>

        <input
        onChange={this.handleChange}
      className={css.searchFormInput}
      type="text"
      autoComplete="off"
      autoFocus
    placeholder="Search images and photos"
    name="search"
     value={search}                   
    />
  </form>
</header>
      </div>
    )
  }
}

export default SearchBar;