import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';
import { useEffect, useState } from 'react';

export default function Home() {
  const id = 4;
  const { user } = useUserContext();
  const [content, setContent] = useState('');

  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPosts] = useState([]);

  const handleSubmit = () => {
    axios
      .post(`/api/createPost/${user.id}`, { content: content })
      .then((res) => {
        console.log(res);
      });
  };

  const fetchAllPosts = async () => {
    try {
      const res = await axios.get('/api/getAllPosts');
      if (res) {
        setAllPosts(res.data);
        console.log(res.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllPosts();
    console.log('useEffect in home');
  }, []);

  return (
    <div style={{ flexDirection: 'column' }}>
      <h1>Home</h1>
      {user && (
        <div>
          <h1>{user.username}</h1>
        </div>
      )}
      <Link to={`/post/${id}`}>POST - {id}</Link>

      <div className="testingCreatePost" style={{ flexDirection: 'row' }}>
        <input
          type="text"
          placeholder="content"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <button onClick={handleSubmit}>CREATE POST</button>
      </div>

      <div className="testingGetPost" style={{ flexDirection: 'column' }}>
        <ul>
          {loading
            ? 'LOADING'
            : allPosts.map((post) => <li key={post.id}>{post.content}</li>)}
        </ul>
      </div>
    </div>
  );
}
