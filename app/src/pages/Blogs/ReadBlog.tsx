import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../../assets/styles/blogPost.css';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import CommentIcon from '@mui/icons-material/Comment';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Modal from '@mui/material/Modal';
import { Comment } from '../../models/comment';
import { AccountCircle } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import ShareIcon from '@mui/icons-material/Share';
import blogpostService from '../../services/blogpost-service';
import { loadBlog } from '../../store/slices/blog-slice';
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReadBlog() {
  const [open, setOpen] = React.useState(false);
  const [openComment, setOpenComment] = React.useState(false); //State to open or close the comment box
  const handleOpenComment = () => setOpenComment(true);
  const handleCloseComment = () => setOpenComment(false);
  const [comment, setComment] = React.useState(''); //State to track the comment posted
  const [blog, setBlogPost] = React.useState(useSelector((state: any) => state.blog_post));

  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
    window.history.back();
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 10,
    p: 4,
    overflow: 'auto',
    maxHeight: '60vh'
  };

  // API call to save the comment
  const handleCommentPost = () => {
    blogpostService
      .addBlogPostComment(blog, comment)
      .then((blogPost) => {
        dispatch(loadBlog(blogPost)) //save the blogpost in redux store
        setBlogPost(blogPost)
      });
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <br />
        <Container>
          <div className="blogimg-container">
            <img className="blog-image" src={blog.image}></img>
          </div>
          <br /><br />
          <div className="blog-container">
            <Box sx={{ bgcolor: '#FFFFFF', height: '40vh', paddingLeft: '5vw', paddingTop: '20px' }} >
              <Typography variant="body2" className='avatar-img'>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 150, height: 150 }}></Avatar>
                <h3 className="author-text">Author, {blog.author.name}  </h3>
              </Typography>
              <Toolbar>
                <IconButton className="comment-icon" color="primary" aria-label="like" onClick={() => handleOpenComment()}>
                  <CommentIcon />
                </IconButton>
                <IconButton color="primary" aria-label="like" onClick={() => handleOpenComment()}>
                  <ShareIcon />
                </IconButton>
              </Toolbar>
            </Box>
            <div className="gap"></div>
            <div className="blog">
              <div>
                <header>
                  <h1 className="navigation-header">{blog.title}</h1>
                </header>
                <article className="navigation-header">{blog.content}</article>
              </div>
            </div>
          </div>
          <Modal
            open={openComment}
            onClose={handleCloseComment}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h2>Comments</h2>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {blog.comments.map((comment: Comment) => (
                  <React.Fragment>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt={comment.createdBy.name} src={comment.createdBy.name} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={comment.createdBy.name}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {comment.content}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
              <br />
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5, Width: '500px' }} />
                <TextField id="input-with-sx" label="Write your comment" variant="outlined" fullWidth
                  onChange={(e) => { setComment(e.target.value) }} /> &nbsp;&nbsp;&nbsp;
                <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={handleCommentPost}>
                  Post
                </Button>
              </Box>
            </Box>
          </Modal>
        </Container>
        <br /><br />
      </Dialog>
    </React.Fragment>
  );
}