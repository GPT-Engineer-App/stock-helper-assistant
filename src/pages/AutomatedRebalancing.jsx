import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const AutomatedRebalancing = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [threshold, setThreshold] = useState(5);
  const [frequency, setFrequency] = useState('Monthly');

  const handleSaveSettings = () => {
    // Here you would typically save these settings to a backend
    console.log('Saving settings:', { isEnabled, threshold, frequency });
    // You could also show a success message to the user
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Automated Rebalancing</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Rebalancing Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="automated-rebalancing"
                checked={isEnabled}
                onCheckedChange={setIsEnabled}
              />
              <Label htmlFor="automated-rebalancing">Enable Automated Rebalancing</Label>
            </div>
            
            <div>
              <Label htmlFor="threshold">Rebalancing Threshold (%)</Label>
              <Input
                id="threshold"
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                min={1}
                max={20}
              />
            </div>
            
            <div>
              <Label htmlFor="frequency">Rebalancing Frequency</Label>
              <select
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Annually</option>
              </select>
            </div>
            
            <Button onClick={handleSaveSettings}>Save Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomatedRebalancing;