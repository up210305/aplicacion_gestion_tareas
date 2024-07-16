import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const ImportantTask = () => {
  return (
    <div>
      <Checkbox
        {...label}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
      />
    </div>
  );
}

export default ImportantTask;


