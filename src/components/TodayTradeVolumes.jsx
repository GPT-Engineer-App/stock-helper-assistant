import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const fetchTodayTradeVolumes = async () => {
  // This is a mock function. In a real application, you would call an actual API.
  const mockData = [
    { symbol: 'AAPL', volume: 1000000 },
    { symbol: 'GOOGL', volume: 500000 },
    { symbol: 'MSFT', volume: 750000 },
    { symbol: 'AMZN', volume: 600000 },
    { symbol: 'FB', volume: 450000 },
  ];
  return new Promise(resolve => setTimeout(() => resolve(mockData), 1000));
};

const TodayTradeVolumes = () => {
  const { data: volumes, error, isLoading } = useQuery({
    queryKey: ['todayTradeVolumes'],
    queryFn: fetchTodayTradeVolumes,
  });

  if (isLoading) return <div>Loading trade volumes...</div>;
  if (error) return <div>Error fetching trade volumes: {error.message}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Trade Volumes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Volume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {volumes.map((item) => (
              <TableRow key={item.symbol}>
                <TableCell>{item.symbol}</TableCell>
                <TableCell>{item.volume.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TodayTradeVolumes;