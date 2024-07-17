import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const fetchDerivativeData = async (symbol, timeFrame) => {
  // This is a mock function. In a real application, you would call an actual API.
  const mockData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    value: Math.random() * 100 + 50,
  }));
  return new Promise(resolve => setTimeout(() => resolve(mockData), 1000));
};

const DerivativeComparison = () => {
  const [symbol, setSymbol] = useState('');
  const [timeFrame, setTimeFrame] = useState('1M');

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['derivativeData', symbol, timeFrame],
    queryFn: () => fetchDerivativeData(symbol, timeFrame),
    enabled: false,
  });

  const handleFetchData = () => {
    if (symbol) {
      refetch();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Derivative Comparison</h1>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Select Stock and Time Frame</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              placeholder="Enter stock symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              className="w-40"
            />
            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time frame" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1D">1 Day</SelectItem>
                <SelectItem value="1W">1 Week</SelectItem>
                <SelectItem value="1M">1 Month</SelectItem>
                <SelectItem value="3M">3 Months</SelectItem>
                <SelectItem value="1Y">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleFetchData} disabled={isLoading || !symbol}>
              {isLoading ? 'Loading...' : 'Fetch Data'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="mb-4">
          <CardContent>
            <p className="text-red-500">Error: {error.message}</p>
          </CardContent>
        </Card>
      )}

      {data && (
        <Card>
          <CardHeader>
            <CardTitle>Derivative Data for {symbol}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DerivativeComparison;