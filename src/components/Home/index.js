import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

class HomePage extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    const posts = [];
    const firstUserList = [];

    this.props.firebase.db.collection('users').get().
    then(response => {
      response.forEach(document => {
              const fetchedUser = {
                id: document.id,
                ...document.data()
              };
              firstUserList.push(Object.values(fetchedUser)[0]);
            })

            firstUserList.forEach(user => {
              this.props.firebase.db.collection('posts').doc(user).
              collection('userPosts').get()
                .then(response => {
                  response.forEach(document => {
                    const fetchedPost = {
                      id: document.id,
                      ...document.data()
                    };
                    posts.push(fetchedPost);
                    this.setState({
                      users: posts,
                      loading: false,
                    });
                  });
                  console.log(posts.length);
                }).catch(error => {
                  console.log(error);
                });
              });
            }).catch(error => {
              console.log(error);
            });            

    // this.setState({
    //   users: posts,
    //   loading: false,
    // });
  }

  render() {
    const { users, loading } = this.state;
 
    return (
      <div>
        <h1>Home Page</h1>
 
        {loading && <div>Loading ...</div>}
 
        <PostList users={users} />

        {console.log(users.length)}
      </div>
    );
  }
}

const PostList = ({ users }) => (
  <ul>   
    {users.map(user => (
      <li key={user.id}>
        <span>
          <strong>ID:</strong> {user.image}
        </span>
        <span>
          <strong>Title:</strong> {user.title}
        </span>
        <span>
          <strong>Body:</strong> {user.body}
        </span>
      </li>
    ))}
  </ul>
);

export default withFirebase(HomePage);