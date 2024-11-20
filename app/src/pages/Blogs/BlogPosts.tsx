import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ArrowIcon from '@mui/icons-material/ArrowForwardRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Header } from "../Header";
import Grid from "@mui/material/Grid";
import CardActionArea from "@mui/material/CardActionArea";
import blogpostService from "../../services/blogpost-service";
import { BlogPost } from '../../models/blogpost';
import Button from "@mui/material/Button";
import { format } from 'date-fns';
import * as React from 'react';
import Box from '@mui/material/Box';
import CreateBlog from "./CreateBlogPost";
import '../../assets/styles/blogPost.css';
import SearchBlogs from "./SearchBlogs";
import { useSelector } from "react-redux";
import { loadBlog } from '../../store/slices/blog-slice';
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpdateBlog from "./EditBlogPost";
import { useTranslation } from "react-i18next";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// Function to display limited blog content on card followed by ...
function limitWords(content: string): string {
  const words: string[] = content.split(' ');
  if (words.length > 10) {
    const shortCont: string = words.slice(0, 10).join(' ');
    return shortCont + '...';
  }
  else
    return content;
}

// Function to format Date
const formatDate = (createdDate: any) => {
  const dateString = new Date(createdDate).toISOString().split('T')[0];
  return format(dateString, 'do MMM yyyy');
}

export default function BlogPosts() {
  const [expanded, setExpanded] = useState(false);
  const [blogPosts, setblogPosts] = useState([] as BlogPost[]);
  const keyword = useSelector((state: any) => state.keyword); //Fetch keyword from redux store
  const [value, setValue] = React.useState(0); // State to track the tab clicked
  const [noPostsFound, setNoPostsFound] = useState(false); // State to track if no posts are found
  const [noMyPostsFound, setNoMyPostsFound] = useState(false); // State to track if no posts are found
  const [open, setOpen] = useState(false); // State to track if no posts are found
  const [edit, setEdit] = useState(false); // State to track if blog to be edited
  const [myBlogPosts, setMyblogPosts] = useState([] as BlogPost[]); // Store my blogs
  const [user, setUser] = React.useState(useSelector((state: any) => state.user));
  const { t } = useTranslation('common');

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //Get all the blog posts
  useEffect(() => {
    // Used local storage to store user details
    if (localStorage.getItem('user') == null) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUser(user);
    }

    if (keyword == '' && value === 0) {
      blogpostService
        .getBlogs()
        .then((blogPosts) => setblogPosts(blogPosts));
    }

    //Get all the blog posts that match with search keyword
    else if (keyword != '' && value === 0) {
      blogpostService
        .searchBlogByKeyword(keyword)
        .then((blogPosts) => {
          if (blogPosts.message == "Matching blog posts not found") { setNoPostsFound(true) }
          else {
            setNoPostsFound(false);
            setblogPosts(blogPosts)
          }
        });
    }

    //Get all the blog posts of the logged in user
    else if (keyword == '' && value === 1 && user != undefined) { // Check if "My Blogs" tab is active
      blogpostService.getBlogPostsByAuthor(user._id)
        .then((blogs) => {
          if (blogs.message == "Matching blog posts not found") {
            setNoMyPostsFound(true); // Set state if no posts are found
          } else {
            setNoMyPostsFound(false); // Reset state if posts are found
            setMyblogPosts(blogs);
          }
        })
        .catch((error) => {
          setNoMyPostsFound(true); // Set state if error occurs
        });
    }
  }, [value, keyword]);

  // Function to increment the likes on a blog
  function incrementLikes(blog: BlogPost) {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    blogpostService
      .updateBlogPostById(updatedBlog)
      .then((updatedBlogPost) => {
        // Update the list of blog posts with the updated blog post
        const updatedBlogPosts = blogPosts.map((post) => {
          if (post._id === updatedBlogPost._id) {
            return updatedBlogPost;
          } else {
            return post;
          }
        });
        // Update the state with the new list of blog posts
        setblogPosts(updatedBlogPosts);
      });
  }

  // Function to increment the dislikes on a blog
  function decrementLikes(blog: BlogPost) {
    const updatedBlog = { ...blog, dislikes: blog.dislikes + 1 }
    blogpostService
      .updateBlogPostById(updatedBlog)
      .then((updatedBlogPost) => {
        // Update the list of blog posts with the updated blog post
        const updatedBlogPosts = blogPosts.map((post) => {
          if (post._id === updatedBlogPost._id) {
            return updatedBlogPost;
          } else {
            return post;
          }
        });
        // Update the state with the new list of blog posts
        setblogPosts(updatedBlogPosts);
      });
  }

  // Function to read a blog
  function handleReadBlog(blog: BlogPost) {
    const readblog = blog;
    dispatch(loadBlog(readblog)); //Store blog state in redux store
  }

  // Function to delete a post
  const handleDeletePost = async (blogId: string) => {
    try {
      blogpostService
        .deleteBlogPostById(blogId);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };

  // Function to edit a post
  const handleEditPost = async (blog: BlogPost) => {
    setEdit(true);
    setOpen(true);
    const updateblog = blog;
    dispatch(loadBlog(updateblog));
  }

  return (
    <div>
      <Header />
      <SearchBlogs />
      <CreateBlog blogposts={blogPosts}></CreateBlog>
      <br />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">

            <Tab label={t('blogpost.explore.label')} {...a11yProps(0)} />
            {user && <Tab label={t('blogpost.myblogs.label')} {...a11yProps(1)} />}

          </Tabs>
        </Box>
        {blogPosts && <CustomTabPanel value={value} index={0}>
          <Box sx={{ height: '50vw', transform: 'translateZ(0px)', flexGrow: 1 }}>
            {noPostsFound ? (
              <Typography variant="body1" align="center">{t('blogpost.noblogs.label')}</Typography>
            ) : (
              <Grid container justifyContent="center" spacing={1} >
                {blogPosts.map((blog) => (<Grid style={{ paddingLeft: '10px', paddingBottom: '20px' }} spacing={5}>
                  <Card sx={{ width: 380, height: 400, borderRadius: 5 }} variant="elevation" elevation={20} >
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: blue[400] }} aria-label="blog">
                          {blog.author.name.charAt(0)}
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={blog.title}
                      subheader={formatDate(blog.createdDate) + "  |  " + `${blog.author.name}`}
                    />
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="194"
                        image={blog.image}
                        alt="Blog"
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {limitWords(blog.content)}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <IconButton aria-label="thumbsup" onClick={() => { incrementLikes(blog) }}>
                        <ThumbUpIcon />
                      </IconButton>
                      {blog.likes}
                      <IconButton aria-label="thumbsdown" onClick={() => { decrementLikes(blog) }}>
                        <ThumbDownIcon />
                      </IconButton>
                      {blog.dislikes}
                      <Button size="small" onClick={() => {
                        navigate(`/blogposts/${blog._id}`)
                        handleReadBlog(blog)
                      }}><IconButton aria-label="add to favorites">
                        </IconButton>{t('blogpost.readmore.label')}<ArrowIcon /></Button>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                    </Collapse>
                  </Card>
                </Grid>))
                }
              </Grid>
            )}
          </Box>
        </CustomTabPanel>}
        <CustomTabPanel value={value} index={1}>
          <Box sx={{ height: '50vw', transform: 'translateZ(0px)', flexGrow: 1 }}>
            {noMyPostsFound ? (
              <Typography variant="body1" align="center">{t('blogpost.noblogs.label')}</Typography>
            ) : (
              <Grid container spacing={3}>
                {myBlogPosts.map((blog) => (<Grid item xs={12} sm={4} md={4}>
                  <Card sx={{ maxWidth: 380, borderRadius: 5 }} variant="elevation" elevation={20} >
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: blue[400] }} aria-label="blog">
                          {blog.author.name.charAt(0)}
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={blog.title}
                      subheader={formatDate(blog.createdDate) + "  |  " + `${blog.author.name}`}
                    />
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="194"
                        image={blog.image}
                        alt="Blog"
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {limitWords(blog.content)}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <IconButton aria-label="edit" onClick={() => { handleEditPost(blog) }}>
                        <EditIcon />
                      </IconButton>
                      <UpdateBlog editBlog={edit} blogposts={blogPosts}></UpdateBlog>
                      <IconButton aria-label="delete" onClick={() => handleDeletePost(`${blog._id}`)}>
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                    </Collapse>
                  </Card>
                </Grid>))
                }
              </Grid>
            )}
          </Box>
        </CustomTabPanel>
      </Box>
    </div>
  );
}