import React, { useEffect, useState } from 'react'
import {Button, Select, TextInput} from 'flowbite-react'
import {useLocation, useNavigate} from 'react-router-dom'
import PostCard from '../components/PostCard'

const Search = () =>{
    const [sideBarData, setSideBarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized',
    });
    const [posts, getPosts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [showMore, setshowMore] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();

 console.log(posts);
     

    useEffect(()=> {
      
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category');
        if(searchTermFromUrl || sortFromUrl || categoryFromUrl) {
            setSideBarData( {
                ...sideBarData,
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl,
            });
        }
    
          const fetchPosts = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`http://localhost:3000/server/post/getposts?${searchQuery}`);
            
             if(!res.ok) {
                setLoading(false);
                return;
             }
             if(res.ok) {
                const data = await res.json();
                console.log(data.posts);
                getPosts(data.posts);
                setLoading(false);
                if(data.posts.length === 9) {
                    setshowMore(true)
                } else {
                    setshowMore(false)
                }
             }

          }
        
          fetchPosts();
    },[location.search]);

    const handleChange = (e) => {
        if(e.target.id === 'searchTerm') {
            setSideBarData({...sideBarData, searchTerm: e.target.value});
        }
        if(e.target.id === 'sort') {
            const order = e.target.value || 'desc';
            setSideBarData({...sideBarData, sort: order});
        }
        if(e.target.id === 'category') {
            const category =  e.target.value || ' uncategorized'
            setSideBarData({...sideBarData, category});
        }
    }

    const handleSubmit = (e) => {
       e.preventDefault();
      
       const urlParams = new URLSearchParams(location.search);
       urlParams.set('searchTerm', sideBarData.searchTerm);
       urlParams.set('sort', sideBarData.sort);
       urlParams.set('category', sideBarData.category);
       const searchQuery = urlParams.toString();
       navigate(`/search?${searchQuery}`);

    }
    
    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
       const startIndex = numberOfPosts;
       const urlParams = new URLSearchParams(location.search);
       urlParams.set('startIndex', startIndex);
       const searchQuery = urlParams.toString();
       const res = await fetch(`http://localhost:3000/server/post/getposts?${searchQuery}`);
       if(!res.ok){
        return;
       }
       if(res.ok){
        const data = await res.json();
        getPosts([...posts,...data.posts]);
        if(data.posts.length === 9) {
            setshowMore(true);
        } else {
            setshowMore(false)
        }
       }
    }
  return (
    <div className='flex flex-col md:flex-row'>
        <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
            <form  className="flex flex-col gap-8 "
            onSubmit={handleSubmit}>
                <div className="flex items-center gap-4">
                    <label  className='whitespace-nowrap font-semibold'>search term</label>
                    <TextInput placeholder='search'
                    id='searchTerm' 
                    onChange={handleChange}
                    value={sideBarData.searchTerm}/>
                </div>
               
                <div className="flex items-center gap-2">
                    <label   className=' font-semibold'>Sort</label>
                    <Select onChange={handleChange} value={sideBarData.sort}  id='sort'>                      
                        <option value='desc'>Latest</option>
                        <option value='asce'>Oldest</option>
                        
                    </Select>
                   
                </div>
                <div className="flex items-center gap-2">
                    <label   className=' font-semibold'>Category</label>
                    <Select onChange={handleChange} value={sideBarData.category}  id='category'>                      
                        <option value='uncategorized'>Uncategorized</option>
                        <option value='reactjs'>React.js</option>
                        <option value='Nextjs'>Next.js</option>
                        <option value='javascript'>javascript</option>
                        
                    </Select>
                   
                </div>
                <Button type='submit' gradientDuoTone='purpleToPink'>
                    Apply Filters
                </Button>
            </form>
        </div>
        <div className="w-full">
            <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>
                Post Result</h1>
                <div className="p-7 flex flex-wrap gap-4">
                    {
                        !loading && posts.length === 0 && (
                        <p
                        className='text-xl text-gray-500'>No Posts Found</p>
                    )}
                  {
                    loading && (
                        <p className="text-xl text-gray-500'">loading...</p>
                    )
                  }
                  {
                    !loading && posts && posts.map((post)=>(
                        <PostCard key={post._id} post={post}/>
                    ))
                  }

                  {
                    showMore && (
                        <button className='text-teal-500 text-lg hover:underline p-7 w-full'
                         onClick={handleShowMore}>Show more</button>
                    )
                  }
                </div>
        </div>
    </div>
  )
}

export default Search