import React, {useEffect} from 'react'

const Home = () => {
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
      });
  
    return (
        <div>
            this is the home page!
            
            
        </div>
    )
}

export default Home
