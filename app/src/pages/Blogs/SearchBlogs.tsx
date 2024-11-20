import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { saveKeyword } from '../../store/slices/keyword';
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import '../../assets/styles/blogPost.css';
import { useTranslation } from "react-i18next";
export default function SearchBlogs() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation('common');

  const keywords = [
    { title: t('blogpost.malnutrition.label') },
    { title: t('blogpost.food.label') },
  ];

  const handleSearchClick = (value: string) => {
    // Dispatch the action with the current value of the input field
    const keyword = value;
    dispatch(saveKeyword(keyword)); //Save the keyword in redux store
  };

  return (
    <>
      <header>
        <div>
          <div>
            <br />
            <header className="navigation-header"><div><h1>{t('blogpost.heading.label')}</h1><p>{t('blogpost.subheading.label')}</p></div>
            </header>
            <div></div>
          </div>
        </div>
      </header>
      <br />
      <Stack spacing={2} sx={{ width: '100%' }} >
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={keywords.map((option) => option.title)}
          renderInput={(params) => <TextField
            {...params}
            label={t('blogpost.keyword.search.label')}
            onChange={(e) => handleSearchClick(e.target.value)}
          />
          }
        />
      </Stack>
      <br />
    </>
  );
}