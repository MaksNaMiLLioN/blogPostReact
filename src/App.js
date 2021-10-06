import React, {useMemo, useState} from 'react'
//import ClassCounter from './components/ClassCounter';
import Counter from './components/Counter';
import './styles/App.css'
//import PostItem from './components/PostItem';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import MyInput from './components/UI/input/MyInput';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from './components/UI/button/MyButton';

function App() {

  const [posts, setPosts] = useState(
    [
      {id: 1, title: 'JavaScript', body: 'Description'},
      {id: 2, title: 'Python 2', body: 'Description'},
      {id: 3, title: 'JavaScript 3', body: 'Description'},
      {id: 4, title: 'TyptScript 4', body: 'Description'}
    ]
  )
    
    
  const [filter, setFilter] = useState( {
    sort: '', query: ''
  })
  const [modal, setModal] = useState(false)


    const sortedPosts = useMemo(()=> {
      if(filter.sort) {
        return [...posts].sort((a,b)=>a[filter.sort].localeCompare(b[filter.sort]))
      }
      return posts
    }, [filter.sort, posts])


    const sortedAndSearchedPosts = useMemo( ()=> {
        return sortedPosts.filter(post=> post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedPosts])

    const createPost = (newPost) => {
      setPosts([...posts, newPost])
      setModal(false)
    }

    const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id))
    }


  return (
    <div className="App">

        <MyButton onClick={()=>setModal(true)}>
          Open Modal windwo
        </MyButton>


        <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={createPost}/>
        </MyModal>

        <hr style={{margin: '15px 0'}}/>
 
        <PostFilter 
          filter={filter}
          setFilter={setFilter}
        />
        
        
        <PostList remove={removePost} posts = {sortedAndSearchedPosts} title = "JS Posts"/>
 
    </div>
  );
}


export default App;
