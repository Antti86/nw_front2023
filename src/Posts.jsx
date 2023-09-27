
import React, {useState, useEffect} from "react";

import './App.css'

const Posts = (props) => 
{


    const [posts, setposts] = useState([])


    useEffect(() => 
    {
        fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setposts(data.slice(0, 10)))

    }, [])


    return(
        <div className="Posts">
            <h2>Typicode posts</h2>
            <p>{props.info}</p>
            <p>{props.tervehdys}</p>
            <p>{props.state.toString()}</p>

            {!props.state && posts && posts.map(p =>
                <div>
                    <h4>{p.title}</h4>
                    <p>{p.body}</p>
                </div>
                )}

            


        </div>
    )


};

export default Posts