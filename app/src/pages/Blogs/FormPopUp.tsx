import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import blogpostService from "../../services/blogpost-service";
import { BlogPost } from '../../models/blogpost.ts';
import SimpleSnackbar from './BlogSnackBar';
import { useSelector } from 'react-redux';
import { BaseUser } from '../../models/user';
import { useTranslation } from 'react-i18next';

type Props = {
  open: boolean,
  onClose: () => void;
  blogposts: BlogPost[];
  edit?: boolean;
};

const PopupForm: React.FC<Props> = ({ open, onClose, blogposts, edit }) => {
  const [blogPosts, setblogPosts] = useState(blogposts);
  const [blogPost, setblogPost] = useState<BlogPost>();
  const [opensnack, setOpenSnack] = useState(false);
  const [image, setImage] = useState<string>('https://images.pexels.com/photos/10682999/pexels-photo-10682999.jpeg');
  const data = useSelector((state: any) => state.blog_post); //assign value of blog data from redux store
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [user, setUser] = React.useState<BaseUser>();
  const { t } = useTranslation('common');


  useEffect(() => {
    // Update the blog post state when the component receives new props
    setblogPost(data);
  }, [data]);

  useEffect(() => {
    // Update the input fields when the blog post state changes
    if (blogPost) {
      setTitle(blogPost.title);
      setContent(blogPost.content);
    }
  }, [blogPost]);

  // Get user data from browser local storage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUser(user);
    }
  })

  function handleSubmit(): void {
    if (!edit && user != undefined) {
      blogpostService
        .createBlogPost(title, content, image, user._id)
        .then((blogPost) => {
          setblogPosts(blogPosts => [...blogPosts, blogPost]);
          window.location.reload();
          onClose();
          setOpenSnack(true);
        });
    }
    else if (edit) {
      const updatedBlog = {
        ...blogPost,
        title: title,
        content: content,
        likes: blogPost?.likes,
        dislikes: blogPost?.dislikes
      }

      blogpostService
        .updateBlogPostById(updatedBlog);
      window.location.reload();
    }
  }

  // Function for "upload image" feature
  const onUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
    } else {
      setImage('https://images.pexels.com/photos/10682999/pexels-photo-10682999.jpeg');
    }
  };

  return (
    <>
      <Dialog open={open} onClose={() => onClose()}>
        <DialogTitle>{edit ?  t('createblogform.edit.label') : t('createblogform.heading.label')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('createblogform.title.label')}
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label={t('createblogform.content.label')}
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <br /><br />
          <input
            type="file"
            onChange={onUploadImage} // Update image state with the selected file
          />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={onClose} color="primary">
           {t('createblogform.cancel.label')}
          </Button>
          <Button variant='contained' onClick={handleSubmit} color="primary">
            {t('createblogform.submit.label')}
          </Button>
        </DialogActions>
      </Dialog>
      <SimpleSnackbar opensnack={opensnack}></SimpleSnackbar>
    </>
  );
}

export default PopupForm;