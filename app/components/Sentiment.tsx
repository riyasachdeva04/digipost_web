import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription 
} from '@/components/ui/card';
import { 
  AlertTriangle, 
  Smile, 
  Frown, 
  Meh 
} from 'lucide-react';

const sentimentColors = {
  'Positive': '#10B981',
  'Negative': '#EF4444',
  'Neutral': '#6B7280'
};

const sentimentIcons = {
  'Positive': Smile,
  'Negative': Frown,
  'Neutral': Meh
};

export default function SentimentAnalysisDashboard() {
  const sentiments = [
    {
      type: "Anger/Negative Sentiment",
      percentage: "44%",
      description: `In this sentiment, customers express frustration, disappointment, and surprise at the poor service, delayed or lost packages, and lack of response from customer support.`,
      examples: [
        "My parcel has not been delivered even after 10 days... the tracking system shows no update",
        "The package was delivered to the wrong address and has not been recovered yet",
        "I have sent multiple emails but have not received any reply from customer support",
      ],
    },
    {
      type: "Frustration/Disappointment",
      percentage: "15%",
      description: `In this sentiment, customers express disappointment and frustration at the inconvenience caused by the issue.`,
      examples: [
        "I was charged more than what was quoted for postage. Please review the billing",
        "The delivery took longer than expected. I was told it would arrive in 3 days, but it came after 7",
        "The pickup for my return parcel was delayed by two days, causing inconvenience",
      ],
    },
    {
      type: "Helplessness/Desperation",
      percentage: "10%",
      description: `In this sentiment, customers feel helpless and desperate for a solution to their problem.`,
      examples: [
        "I have called the customer service multiple times, but they have not responded yet",
        "I need a refund for the incorrect item I received",
        "I would like to request a replacement for the wrong item I received",
      ],
    },
    {
      type: "Positive Sentiment",
      percentage: "6%",
      description: `In this sentiment, customers express satisfaction and relief at the resolution of their issue or the response from customer support.`,
      examples: [
        "The customer support team was very helpful and responsive",
        "The issue was resolved quickly, and I'm happy with the outcome",
        "The packaging was well-done, and the contents were protected",
      ],
    },
  ];

  // Transform sentiment data for chart
  const chartData = sentiments.map(s => ({
    type: s.type,
    percentage: parseFloat(s.percentage),
    description: s.description
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Sentiment Distribution Chart */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="text-yellow-500" />
            Sentiment Analysis Overview
          </CardTitle>
          <CardDescription>
            Comprehensive breakdown of conversational sentiment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="type" />
              <YAxis 
                label={{ 
                  value: 'Percentage', 
                  angle: -90, 
                  position: 'insideLeft' 
                }} 
              />
              <Tooltip 
                content={({ payload }) => {
                  if (payload && payload.length) {
                    const data = payload[0].payload;
                    const icon = data.type.includes('Positive') ? Smile : 
                                 data.type.includes('Negative') || data.type.includes('Anger') ? Frown : 
                                 Meh;
                    return (
                      <div className="bg-white p-4 shadow-lg rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className='w-6 h-6 text-gray-600'>
                            {React.createElement(icon)}
                          </div>
                          <span className="font-bold">{data.type} Sentiment</span>
                        </div>
                        <p>{data.description}</p>
                        <p className="text-lg font-semibold">
                          {data.percentage}% of interactions
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="percentage">
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={
                      entry.type.includes('Positive') ? '#10B981' : 
                      entry.type.includes('Negative') || entry.type.includes('Anger') ? '#EF4444' : 
                      '#6B7280'
                    } 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Sentiment Cards */}
      {sentiments.map((sentiment, index) => {
        const icon = sentiment.type.includes('Positive') ? Smile : 
                     sentiment.type.includes('Negative') || sentiment.type.includes('Anger') ? Frown : 
                     Meh;
        return (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className='w-8 h-8 text-gray-600'>
                  {React.createElement(icon)}
                </div>
                <div>
                  <CardTitle>{sentiment.type} Sentiment</CardTitle>
                  <CardDescription>
                    {sentiment.percentage}% of total interactions
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{sentiment.description}</p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Example Interactions:
                </h4>
                <ul className="space-y-2">
                  {sentiment.examples.map((example, i) => (
                    <li 
                      key={i} 
                      className="text-sm text-gray-600 pl-3 relative before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-gray-400"
                    >
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};