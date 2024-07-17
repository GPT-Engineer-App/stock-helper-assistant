import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { subscribeToPushNotifications, requestNotificationPermission } from '../utils/pushNotifications';

const fetchMarketData = async (symbol) => {
  const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${import.meta.env.VITE_ALPHA_VANTAGE_API_KEY}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const MarketAnalysis = () => {
  const [symbol, setSymbol] = useState('AAPL');
  const [chartData, setChartData] = useState([]);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['marketData', symbol],
    queryFn: () => fetchMarketData(symbol),
    enabled: false,
  });

  useEffect(() => {
    if (data && data['Time Series (Daily)']) {
      const formattedData = Object.entries(data['Time Series (Daily)'])
        .slice(0, 30)
        .map(([date, values]) => ({
          date,
          close: parseFloat(values['4. close']),
        }))
        .reverse();
      setChartData(formattedData);
    }
  }, [data]);

  useEffect(() => {
    requestNotificationPermission()
      .then(() => subscribeToPushNotifications())
      .catch(console.error);
  }, []);

  const handleSymbolChange = (e) => {
    setSymbol(e.target.value.toUpperCase());
  };

  const handleFetchData = () => {
    refetch();
  };

  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Market Analysis</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Stock Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              value={symbol}
              onChange={handleSymbolChange}
              placeholder="Enter stock symbol"
              className="w-40"
            />
            <Button onClick={handleFetchData} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Fetch Data'}
            </Button>
          </div>
          {chartData.length > 0 && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="close" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketAnalysis;