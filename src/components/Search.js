import React from 'react';
import axios from 'axios';
import {
  Button, TextField, MenuItem, Checkbox, FormControlLabel, Grid, Typography, Select,
  FormControl, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Pagination, CircularProgress, Tooltip, Box, TableSortLabel
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './Search.css';

function Search() {
  const [formValues, setFormValues] = React.useState({
    project_id: '',
    description: '',
    floor: '',
    unit: '',
    area: '',
    minPrice: '',
    maxPrice: '',
    type: '',
    balcony: false,
    lanai: false,
    location: '',
  });

  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [sortField, setSortField] = React.useState('');
  const [sortOrder, setSortOrder] = React.useState('asc');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/search`, {
        params: formValues,
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    const isAsc = sortField === field && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortField(field);

    const sortedData = [...results].sort((a, b) => {
      if (a[field] < b[field]) return isAsc ? -1 : 1;
      if (a[field] > b[field]) return isAsc ? 1 : -1;
      return 0;
    });
    setResults(sortedData);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const currentRows = results.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="search-container">
      <Paper elevation={3} className="search-card">
        <Typography variant="h4" gutterBottom>
          Search Available Units
        </Typography>
        <form onSubmit={handleSearch}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField label="Project ID" name="project_id" value={formValues.project_id} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField label="Description" name="description" value={formValues.description} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField label="Floor" name="floor" type="number" value={formValues.floor} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField label="Unit" name="unit" value={formValues.unit} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField label="Area" name="area" type="number" value={formValues.area} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField label="Location" name="location" value={formValues.location} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select name="type" value={formValues.type} onChange={handleInputChange}>
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="Studio">Studio</MenuItem>
                  <MenuItem value="1 Bedroom">1 Bedroom</MenuItem>
                  <MenuItem value="2 Bedrooms">2 Bedrooms</MenuItem>
                  <MenuItem value="3 Bedrooms">3 Bedrooms</MenuItem>
                  <MenuItem value="Executive">Executive</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField label="Min Price" name="minPrice" type="number" value={formValues.minPrice} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField label="Max Price" name="maxPrice" type="number" value={formValues.maxPrice} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControlLabel control={<Checkbox name="balcony" checked={formValues.balcony} onChange={handleInputChange} />} label="Has Balcony?" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControlLabel control={<Checkbox name="lanai" checked={formValues.lanai} onChange={handleInputChange} />} label="Has Lanai?" />
            </Grid>
          </Grid>
          <Box mt={3} display="flex" justifyContent="center">
            <Tooltip title="Click to search available units" arrow>
              <Button variant="contained" color="primary" type="submit" startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />} disabled={loading}>
                {loading ? "Searching..." : "Search"}
              </Button>
            </Tooltip>
          </Box>
        </form>
      </Paper>

      <Box mt={4}>
        {results.length > 0 ? (
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel active={sortField === 'Floor'} direction={sortField === 'Floor' ? sortOrder : 'asc'} onClick={() => handleSort('Floor')}>Floor</TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel active={sortField === 'Unit'} direction={sortField === 'Unit' ? sortOrder : 'asc'} onClick={() => handleSort('Unit')}>Unit</TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel active={sortField === 'Description'} direction={sortField === 'Description' ? sortOrder : 'asc'} onClick={() => handleSort('Description')}>Description</TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel active={sortField === 'Area'} direction={sortField === 'Area' ? sortOrder : 'asc'} onClick={() => handleSort('Area')}>Area</TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel active={sortField === 'Price'} direction={sortField === 'Price' ? sortOrder : 'asc'} onClick={() => handleSort('Price')}>Price</TableSortLabel>
                  </TableCell>
                  <TableCell>Project ID</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Balcony</TableCell>
                  <TableCell>Lanai</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRows.map((item, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{item.Floor}</TableCell>
                    <TableCell>{item.Unit}</TableCell>
                    <TableCell>{item.Description}</TableCell>
                    <TableCell>{item.Area}</TableCell>
                    <TableCell>{item.Price}</TableCell>
                    <TableCell>{item.project_id}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.Type}</TableCell>
                    <TableCell>{item.Balcony ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{item.Lanai ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{item.Status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          !loading && <Box mt={3} textAlign="center"><Typography variant="h6">No results found</Typography></Box>
        )}
      </Box>

      <Box mt={3} display="flex" justifyContent="center">
        <Pagination count={Math.ceil(results.length / rowsPerPage)} page={currentPage} onChange={handlePageChange} color="primary" />
      </Box>
    </div>
  );
}

export default Search;
