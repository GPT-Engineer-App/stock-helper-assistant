import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import TodayTradeVolumes from '../components/TodayTradeVolumes';

const Index = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Portfolio Management Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Evaluate your risk tolerance and get personalized portfolio suggestions.</p>
            <Button asChild>
              <Link to="/risk-assessment">Start Assessment</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Track your portfolio performance in real-time.</p>
            <Button asChild>
              <Link to="/portfolio-dashboard">View Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Automated Rebalancing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Set up rules for automatic portfolio rebalancing.</p>
            <Button asChild>
              <Link to="/automated-rebalancing">Configure</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Market Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Analyze market trends and stock performance.</p>
            <Button asChild>
              <Link to="/market-analysis">Analyze Market</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <TodayTradeVolumes />
    </div>
  );
};

export default Index;