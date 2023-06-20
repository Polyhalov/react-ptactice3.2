import { Component } from "react";
import SearchBar from "./SearchBar/SearchBAr";
import { searchPosts } from "services/api";
import css from '../components/SearchBar/css.module.css'
export class App extends Component {

  state = {
    search: '',
    loading: false,
    error: null,
    items:[],
  }
  
  componentDidUpdate(prevProps, prevState) {
    const { search } = this.state;
    if (search !== prevState.search) {
      this.fetchPost();
  }
  }
  async fetchPost() {
    try {
      const { search } = this.state;
      this.setState({ loading: true })
      const { data:{hits} } = await searchPosts(search);
      this.setState({items:hits})
    }
    catch ({response}) {
      this.setState({error: response.data.message || 'Cannot fetch posts'})
    }
    finally {
      this.setState({ loading: false });
    }
  }

  updateSearch = ({search}) => {
    this.setState({search, items:[]})
}

  render() {
    const { items,loading,error } = this.state;
    console.log(items)
    const elements = items.map(({ id, webformatURL, tags }) =>  (
      <li className={css.imageGalleryItem} key={id}><img className={css.imageGalleryItemImage} src={webformatURL} alt={tags} /></li>
    ))
    return (
      <div>
        <SearchBar onSubmit={this.updateSearch} />
        {loading && <p>Loading...</p>}
        {error && <p className={css.error}>{error}</p>}
        <ul className={css.imageGallery}>
          {elements}
        </ul>
        {Boolean(items.length) && <button className={css.button}>Load More</button>}
      </div>
    )
  }
  
};
