import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for demonstration
const portfolioPerformance = [
  { date: '2023-01-01', value: 10000 },
  { date: '2023-02-01', value: 10500 },
  { date: '2023-03-01', value: 11000 },
  { date: '2023-04-01', value: 10800 },
  { date: '2023-05-01', value: 11200 },
  { date: '2023-06-01', value: 11500 },
];

const assetAllocation = [
  { name: 'Stocks', value: 60 },
  { name: 'Bonds', value: 30 },
  { name: 'Cash', value: 10 },
];

const mockHoldings = [
  { id: 1, symbol: 'AAPL', name: 'Apple Inc.', quantity: 100, currentPrice: 150, totalValue: 15000 },
  { id: 2, symbol: 'GOOGL', name: 'Alphabet Inc.', quantity: 50, currentPrice: 2800, totalValue: 140000 },
  { id: 3, symbol: 'MSFT', name: 'Microsoft Corporation', quantity: 75, currentPrice: 300, totalValue: 22500 },
  { id: 4, symbol: 'AMZN', name: 'Amazon.com Inc.', quantity: 30, currentPrice: 3300, totalValue: 99000 },
  { id: 5, symbol: 'FB', name: 'Meta Platforms Inc.', quantity: 60, currentPrice: 330, totalValue: 19800 },
];

const PortfolioDashboard = () => {
  const [holdings, setHoldings] = useState(mockHoldings);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterSymbol, setFilterSymbol] = useState('');

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedHoldings = React.useMemo(() => {
    let sortableItems = [...holdings];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [holdings, sortConfig]);

  const filteredHoldings = sortedHoldings.filter(holding =>
    holding.symbol.toLowerCase().includes(filterSymbol.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Portfolio Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={portfolioPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={assetAllocation}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Input
              placeholder="Filter by symbol"
              value={filterSymbol}
              onChange={(e) => setFilterSymbol(e.target.value)}
              className="max-w-sm"
            />
            <Select onValueChange={(value) => handleSort(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="symbol">Symbol</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="quantity">Quantity</SelectItem>
                <SelectItem value="currentPrice">Current Price</SelectItem>
                <SelectItem value="totalValue">Total Value</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Total Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHoldings.map((holding) => (
                <TableRow key={holding.id}>
                  <TableCell>{holding.symbol}</TableCell>
                  <TableCell>{holding.name}</TableCell>
                  <TableCell>{holding.quantity}</TableCell>
                  <TableCell>${holding.currentPrice.toFixed(2)}</TableCell>
                  <TableCell>${holding.totalValue.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioDashboard;