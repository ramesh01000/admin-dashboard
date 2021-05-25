import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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
                      user: user,
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

  updateTemp(userID, postID, choice) {

    console.log(postID);

    if(choice == 4) {
          console.log(userID);
    this.setState({ users: this.state.users.filter(function(user) { 
      return user.id !== postID })});
    }

      if(choice == 1) {
        this.props.firebase.db.collection('posts').doc(userID)
                .collection('userPosts').doc(postID).set({
          status: 'Processing'
      }, { merge: true });
      }

    if(choice == 2) {
      this.props.firebase.db.collection('posts').doc(userID)
              .collection('userPosts').doc(postID).set({
        status: 'Assigned to Operator'
    }, { merge: true });
    }

  if(choice == 3) {
    this.props.firebase.db.collection('posts').doc(userID)
            .collection('userPosts').doc(postID).set({
      status: 'Work in Progress'
  }, { merge: true });
  }
}

  updateStatus(userID, postID) { 

    this.props.firebase.db.collection('posts').doc(userID)
                .collection('userPosts').doc(postID).get().then(document => {
                  const fetchedPost = {
                    id: document.id,
                    ...document.data()
                  };

                this.props.firebase.db.collection('posts').doc(userID)
               .collection('closedComplaints').doc(postID).set(fetchedPost);

               this.props.firebase.db.collection('posts').doc(userID)
               .collection('userPosts').doc(postID).delete(
                 console.log("Deleted")
               ).catch(error => 
                console.error("Error removing post: ", error));

              this.setState({ users: this.state.users.filter(function(user) { 
                return user.id !== postID })});

                });        
  }

  // handleChange = event => {
  //   //setAge(event.target.value);
  //   console.log(event.target.value);
  // };

  render() {
    const { users, loading } = this.state;
 
    return (
      <div>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Complaints
        </Typography>
 
        {loading && <div>Loading ...</div>}
 
        {/* <PostList users={users} /> */}

        <div>
          <Table size="small">
            <TableHead>
              <TableRow>
              <TableCell>Department</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Body</TableCell>
                <TableCell>Image Link</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.type[0]}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.body}</TableCell>
                  <TableCell>{row.image && <a href={row.image}>Image</a>}</TableCell>
                  <TableCell>

                  <FormControl className={useStyles.formControl}>
                  <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      displayEmpty
                      //value={row.status}
                      className={useStyles.selectEmpty}
                      onChange={(event) => { this.updateTemp(row.user, row.id, event.target.value) }}
                    >
                      <MenuItem value={1}>Processing</MenuItem>
                      <MenuItem value={2}>Assigned to Operator</MenuItem>
                      <MenuItem value={3}>Work in Progress</MenuItem>
                      <MenuItem value={4}>Completed</MenuItem>
                    </Select>
                    <FormHelperText>{row.status}</FormHelperText>
                  </FormControl>
                    
                    {/* {row.status}
                  <IconButton aria-label="done" 
                  className={useStyles.root}
                  onClick={() => { this.updateTemp(row.user, row.id) }}>
                    <DoneAllIcon />
                  </IconButton> */}

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// const PostList = ({ users }) => (
//   <div>
//   <h1>Title</h1>
//   <Table size="small">
//     <TableHead>
//       <TableRow>
//         <TableCell>Title</TableCell>
//         <TableCell>Location</TableCell>
//         <TableCell>Body</TableCell>
//         <TableCell>Image Link</TableCell>
//         <TableCell>Status</TableCell>
//       </TableRow>
//     </TableHead>
//     <TableBody>
//       {users.map((row) => (
//         <TableRow key={row.id}>
//           <TableCell>{row.title}</TableCell>
//           <TableCell>{row.location}</TableCell>
//           <TableCell>{row.body}</TableCell>
//           <TableCell>{row.image}</TableCell>
//           <TableCell>{row.status}
//               <Button
//             variant="contained"
//             color="primary"
//             className={useStyles.button}
//             onClick={() => { alert('clicked') }}
//             endIcon={<Icon>send</Icon>}
//           >
//             Update
//           </Button>
//           </TableCell>
//         </TableRow>
//       ))}
//     </TableBody>
//   </Table>
//   {/* <div className={useStyles.seeMore}>
//     <Link color="primary" href="#" onClick={preventDefault}>
//       See more orders
//     </Link>
//   </div> */}
//   </div>
// );

export default withFirebase(HomePage);