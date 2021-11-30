import {useEffect, useState} from 'react';
import { dbService } from '../firebase';

const Home = () => {
  const [twitter, setTwitter] = useState('');
  const [allTwitts,setAllTweets]=useState([])
  const handleSubmit = async(e) => {
    e.preventDefault();
    await dbService.collection("Tweets").add({
        twitter,
        createdAt:Date.now()
    })    
    setTwitter("")
  };
  const handleChange = (e) => {
    const {value} = e.target;
    setTwitter(value);
  };

  const getAllTweets=async()=>{
    const response = await dbService.collection("Tweets").get();
    response.forEach(item=>{
        const newObj = {
            ...item.data(),
            id:item.id
        }
        setAllTweets(prev=>[...prev,newObj])
    });
  }

  useEffect(()=>{
    getAllTweets();
  },[])
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={twitter}
          onChange={handleChange}
          placeholder="what's on your mind ?"
          maxLength={20}
        />
        <input type="submit" value="twitter" />
      </form>
      <section>
        {allTwitts.map(item=>{
            const {id,twitter}=item;
            return <div key={id}>
                <h4>{twitter}</h4>
            </div>
        })}
      </section>
    </>
  );
};
export default Home;