import { CreateOutlined } from '@mui/icons-material';
import ShareIcon from '@mui/icons-material/Share';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import React from 'react';
import PopupForm from './FormPopUp.tsx';
import { BlogPost } from '../../models/blogpost.ts';
import { useTranslation } from 'react-i18next';

// Props to pass all the blogposts
type Props = {
  blogposts: BlogPost[];
}

const CreateBlog: React.FC<Props> = ({ blogposts }) => {
  const [open, setOpen] = React.useState(false);
  const [formOpen, setFormOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCreate = () => setFormOpen(true);
  const handleShare = () => setFormOpen(false);
  const handleCloseForm = () => setFormOpen(false);
  const { t } = useTranslation('common');
  const actions = [
    { icon: <CreateOutlined />, name: t('createblog.write.label') },
    { icon: <ShareIcon />, name: t('createblog.share.label')  },
  ];

  return (
    <>
      <div>
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{ position: 'fixed', mt: 11, top: '1px', right: 23 }}
          icon={<SpeedDialIcon />}
          direction='left'
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => { action.name == t('createblog.write.label') ? handleCreate() : handleShare() }}
            />
          ))}
        </SpeedDial>
        <PopupForm open={formOpen} onClose={handleCloseForm} blogposts={blogposts} />
      </div>
    </>
  );
}

export default CreateBlog;