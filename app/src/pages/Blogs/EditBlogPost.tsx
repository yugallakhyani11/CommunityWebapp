import React from 'react';
import PopupForm from './FormPopUp.tsx';
import { BlogPost } from '../../models/blogpost.ts';

// Props to pass edit flag and all the blog posts
type Props = {
    editBlog: boolean;
    blogposts: BlogPost[];
}

const UpdateBlog: React.FC<Props> = ({ editBlog, blogposts }) => {
    const [edit, setEdit] = React.useState(false);
    const handleClose = () => {
        setEdit(false);
    };

    return (
        <>
            <div>
                <PopupForm open={editBlog} onClose={handleClose} blogposts={blogposts} edit={editBlog} />
            </div>
        </>
    );
}

export default UpdateBlog;