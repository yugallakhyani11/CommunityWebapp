// SearchBar.tsx
import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

// Define props interface for SearchBar component
interface SearchBarProps {
  onSearch: (params: { [key: string]: string }) => Promise<void>;
  onClear: () => void;
}

// Functional component for SearchBar
const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear }) => {


  const { t } = useTranslation(); // Initialize the translation hook
  
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Function to handle search
  const handleSearch = () => {
 
    

    const params = {
      keyword: searchTerm,
      startDate,
      endDate
    };

    // Log the search term and dates
    console.log('Search Term:', searchTerm);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);

    // Call the onSearch function with the search parameters
    onSearch(params);
  };

  const handleClear = () => {
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
    onClear();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '10px', boxSizing: 'border-box', background: '#f0f2f5', borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <TextField
        label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="standard"
        size="small"
        fullWidth
        style={{ marginRight: '-475px', background: '#f0f2f5' }}
        InputProps={{ style: { background: '#f0f2f5' } }}
      />
      <TextField
        label="Start Date"
        type="datetime-local"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        variant="standard"
        size="small"
        style={{ marginRight: '10px', background: '#f0f2f5' }}
        InputProps={{ style: { background: '#f0f2f5' } }}
      />
      <TextField
        label="End Date"
        type="datetime-local"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        variant="standard"
        size="small"
        style={{ marginRight: '10px', background: '#f0f2f5' }}
        InputProps={{ style: { background: '#f0f2f5' } }}
      />
      <Button onClick={handleSearch} variant="contained" color="primary">
      {t('searchBar.search')}
      </Button>
      <Button onClick={handleClear} variant="outlined" color="secondary" style={{ marginLeft: '10px' }}>
      {t('searchBar.clear')}
      </Button>
    </div>
  );
};

// Export SearchBar component
export default SearchBar;


