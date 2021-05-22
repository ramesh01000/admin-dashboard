import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
              collection('userPosts').orderBy("creation", "desc").get()
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
                  console.log(posts);
                }).catch(error => {
                  console.log(error);
                });
              });
            }).catch(error => {
              console.log(error);
            });            
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

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const PostList = ({ users }) => (
  <div>
  <h1>Title</h1>
  <Table size="small">
    <TableHead>
      <TableRow>
        <TableCell>Title</TableCell>
        <TableCell>Location</TableCell>
        <TableCell>Body</TableCell>
        <TableCell>Image Link</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {users.map((row) => (
        <TableRow key={row.id}>
          <TableCell>{row.title}</TableCell>
          <TableCell>{row.location}</TableCell>
          <TableCell>{row.body}</TableCell>
          <TableCell>{row.image}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  {/* <div className={classes.seeMore}>
    <Link color="primary" href="#" onClick={preventDefault}>
      See more orders
    </Link>
  </div> */}
  </div>
);

export default withFirebase(HomePage);