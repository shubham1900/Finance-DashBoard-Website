import React, { useState } from 'react';
import SideNav from './SideNav';// Correct import statement for SideNav component
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { Typography, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import AddTransactionTable from '../addTransactions';
import Stack from '@mui/material/Stack';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import TransactionItem from './TransactionItem/TransactionItem';
import BarChart from '../charts/BarChart';
import PieChart from '../charts/pieChart';


export default function Home() {
  const [formData, setFormData] = useState({
    year: '',
    income: '0',
    expenses: '0'
  });

  const [latestTransactions, setLatestTransactions] = useState([]);
  const [chartData, setChartData] = useState([["Type", "Amount"]]);

  const [filterType, setFilterType] = useState('All');
  const [sortOption, setSortOption] = useState('date');

  const addTransaction = (transaction) => {
    const updatedTransactions = [...latestTransactions, transaction];
    setLatestTransactions(updatedTransactions);

    let newChartData = [...chartData];
    newChartData.push([transaction.description, parseFloat(transaction.amount)]);
    setChartData(newChartData);

    if (transaction.type === 'income') {
      setFormData(prevFormData => ({
        ...prevFormData,
        income: (parseFloat(prevFormData.income) + parseFloat(transaction.amount)).toFixed(2)
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        expenses: (parseFloat(prevFormData.expenses) + parseFloat(transaction.amount)).toFixed(2)
      }));
    }
  };

  const totalIncome = (parseFloat(formData.income) - parseFloat(formData.expenses)).toFixed(2);

  // Filtering and Sorting Functions
  const filteredAndSortedTransactions = latestTransactions
    .filter(transaction => filterType === 'All' || transaction.type === filterType)
    .sort((a, b) => {
      if (sortOption === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortOption === 'amount') {
        return parseFloat(b.amount) - parseFloat(a.amount);
      }
      return 0;
    });

  return (
    <>
      <div className='bgcolor'>
        <NavBar />
        <Box height={70} />
        <Box sx={{ display: 'flex' }}>
          <SideNav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Stack spacing={2} direction={"row"}>
                  <Card sx={{ minWidth: 49 + "%", height: 150 }} className='gradient'>
                    <CardContent>
                      <div className='iconstyle'>
                        <CreditCardIcon />
                      </div>
                      <Typography gutterBottom variant="h5" component="div" sx={{color:"#ccd1d1"}}>
                        {formData.income}
                      </Typography>
                      <Typography gutterBottom variant="body2" component="div" sx={{color:'white'}}>
                        Income
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ minWidth: 49 + "%", height: 150 }} className='gradientlight'>
                    <CardContent>
                      <div className='iconstyle'>
                        <ShoppingBagIcon />
                      </div>
                      <Typography gutterBottom variant="h5" component="div" sx={{color:'white'}}>
                        {formData.expenses}
                      </Typography>
                      <Typography gutterBottom variant="body2" component="div" sx={{color:"#ccd1d1"}}>
                        Expenses
                      </Typography>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={2}>
                  <Card className='gradient'>
                    <Stack spacing={2} direction={"row"}>
                      <div className='iconstyle'> 
                        <StorefrontIcon />
                      </div>
                      <div className='paddingAll'>
                        <span className='priceTitle'>{totalIncome}</span><br />
                        <span className='pricesubTitle'>Total Income</span>
                      </div>
                    </Stack>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
            <Box height={20} />
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Card sx={{ height: 60 + "vh" }}>
                  <CardContent>
                    <BarChart chartData={chartData} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card sx={{ height: 60 + "vh" }}>
                  <CardContent>
                    <PieChart chartData={chartData} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Box height={20} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
                  <InputLabel id="type-label">Filter by Type</InputLabel>
                  <Select
                    labelId="type-label"
                    id="type-select"
                    value={filterType}
                    label="Filter by Type"
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="income">Income</MenuItem>
                    <MenuItem value="expense">Expense</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel id="sort-label">Sort by</InputLabel>
                  <Select
                    labelId="sort-label"
                    id="sort-select"
                    value={sortOption}
                    label="Sort by"
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="amount">Amount</MenuItem>
                  </Select>
                </FormControl>
                <AddTransactionTable addTransaction={addTransaction} />
                <div>
                  <h2>Recent Transactions</h2>
                  {filteredAndSortedTransactions.map((transaction, index) => (
                    <TransactionItem key={index} transaction={transaction} />
                  ))}
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
}
