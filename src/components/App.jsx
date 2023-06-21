import { Component } from "react";
import SearchBar from "./SearchBar/SearchBAr";
import { searchPosts } from "services/api";
import css from '../components/SearchBar/css.module.css'
import Loader from "./Loader/Loader";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Modal from "./Modal/Modal";
export class App extends Component {

  state = {
    search: '',
    page: 1,
    loading: false,
    error: null,
    items: [],
    totalHits: 0,
    showModal: false,
    imgDetails:{},
  }
  
  componentDidUpdate(prevProps, prevState) {
    const { search,page } = this.state;
    if (search !== prevState.search|| page!==prevState.page) {
      this.fetchPost();
  }
  }
  async fetchPost() {
    try {
      const { search, page } = this.state;
      this.setState({ loading: true })
      const { data: { hits, totalHits } } = await searchPosts(search, page);
      if (totalHits === 0) {
        toast.warn(
          'За вашим запитом нічого не знайдено. Спробуйте ще раз'
        );
      }
      this.setState(({ items }) => ({
        items: [...items, ...hits],
        totalHits,
      }))
    }
    catch ({ response }) {
      this.setState({ error: response.data.message || 'Cannot fetch posts' })
      toast.error('Помилка!Спробуйте пізніше.')
    }
    finally {
      this.setState({ loading: false });
      
    }
  }

  updateSearch = ({search}) => {
    this.setState({ search, items: [], page: 1 })
  }
  
  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }))
  }
  showModal = ({tags, largeImageURL}) => {
    this.setState({
      showModal: true,
      imgDetails: {
        tags,
        largeImageURL
      }
    })
  }
  closeModal = () => {
    this.setState({
      showModal: false,
      imgDetails:{},
    })
  }

  render() {
    const { items,loading,error,totalHits,showModal,imgDetails } = this.state;
    console.log(items)
    const elements = items.map(({ id, webformatURL, tags, largeImageURL }) =>  (
      <li className={css.imageGalleryItem} onClick={()=>this.showModal({tags, largeImageURL})} key={id}><img className={css.imageGalleryItemImage} src={webformatURL} alt={tags} /></li>
    ))
    const allItems = items.length === totalHits;
    return (
      <div>
        <SearchBar onSubmit={this.updateSearch} />
        <ToastContainer/>
        {error && <p className={css.error}>{error}</p>}
        <ul className={css.imageGallery}>
          {elements}
        </ul>
        {loading && <Loader/>}
        {Boolean(items.length) && !allItems && <button onClick={this.loadMore} className={css.button}>Load More</button>}
        {showModal && <Modal close={this.closeModal}>
          <img src={imgDetails.largeImageURL} alt={imgDetails.tags} />
        </Modal>}
      </div>
    )
  }
  
};
