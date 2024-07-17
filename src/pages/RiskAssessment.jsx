import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const questions = [
  {
    id: 1,
    question: "How would you react if your investment lost 20% in a year?",
    options: [
      { value: "1", label: "Sell all remaining investments" },
      { value: "2", label: "Sell some" },
      { value: "3", label: "Hold steady and wait it out" },
      { value: "4", label: "Buy more at the lower price" }
    ]
  },
  {
    id: 2,
    question: "What's your primary investment goal?",
    options: [
      { value: "1", label: "Preserving my wealth" },
      { value: "2", label: "Generating income" },
      { value: "3", label: "Growing my wealth over time" },
      { value: "4", label: "Aggressively maximizing my returns" }
    ]
  },
  // Add more questions as needed
];

const RiskAssessment = () => {
  const [answers, setAnswers] = useState({});
  const [riskScore, setRiskScore] = useState(null);

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: parseInt(value) }));
  };

  const calculateRiskScore = () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    const averageScore = totalScore / questions.length;
    setRiskScore(averageScore);
  };

  const getRiskProfile = (score) => {
    if (score <= 1.5) return "Conservative";
    if (score <= 2.5) return "Moderate";
    if (score <= 3.5) return "Growth";
    return "Aggressive";
  };

  const getSuggestedPortfolio = (profile) => {
    switch (profile) {
      case "Conservative":
        return "70% Bonds, 30% Stocks";
      case "Moderate":
        return "50% Bonds, 50% Stocks";
      case "Growth":
        return "30% Bonds, 70% Stocks";
      case "Aggressive":
        return "10% Bonds, 90% Stocks";
      default:
        return "Unable to determine";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Risk Tolerance Assessment</h1>
      {questions.map((q) => (
        <Card key={q.id} className="mb-4">
          <CardHeader>
            <CardTitle>{q.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup onValueChange={(value) => handleAnswer(q.id, value)}>
              {q.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`q${q.id}-${option.value}`} />
                  <Label htmlFor={`q${q.id}-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}
      <Button onClick={calculateRiskScore} className="mt-4">Calculate Risk Profile</Button>
      
      {riskScore !== null && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Your Risk Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Risk Score: {riskScore.toFixed(2)}</p>
            <p>Risk Profile: {getRiskProfile(riskScore)}</p>
            <p>Suggested Portfolio: {getSuggestedPortfolio(getRiskProfile(riskScore))}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RiskAssessment;