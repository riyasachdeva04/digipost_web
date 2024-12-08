'use client'

import { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveLine } from "@nivo/line"
import { Leaf, Award, Target, Zap } from 'lucide-react'
import Avatar3D from '../components/Avatar3d2'

// Mock data for the employee
const employeeData = {
  name: "Priya Sharma",
  position: "Senior Postal Officer",
  avatar: "/avatar-placeholder.png",
  sustainabilityScore: 85,
  badges: ["Energy Saver", "Waste Reducer", "Community Leader"],
  recentActivities: [
    { date: "2023-05-15", activity: "Conducted sustainability workshop" },
    { date: "2023-05-10", activity: "Implemented paper-saving initiative" },
    { date: "2023-05-05", activity: "Organized community clean-up drive" },
  ],
  performanceData: [
    { x: "Jan", y: 70 },
    { x: "Feb", y: 75 },
    { x: "Mar", y: 78 },
    { x: "Apr", y: 82 },
    { x: "May", y: 85 },
  ],
}

export default function EmployeeProfilePage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmitReport = async () => {
    setIsLoading(true)
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    alert("Monthly BRSR report submitted successfully!")
  }

  return (
    <div className="container mx-auto py-10 px-4 flex">
      <div className="w-1/4 h-screen flex flex-col items-center bg-gray-700 p-4">
        <div className='h-full'>
        <Avatar3D /></div>
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold">{employeeData.name}</h2>
          <p className="text-gray-600">{employeeData.position}</p>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Leaf className="text-green-500" />
          <span className="font-semibold">Sustainability Score:</span>
          <Progress value={employeeData.sustainabilityScore} className="w-1/2" />
          <span>{employeeData.sustainabilityScore}%</span>
        </div>
        <div className="mt-4">
          <span className="font-semibold">Badges:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {employeeData.badges.map((badge) => (
              <Badge key={badge} variant="secondary">{badge}</Badge>
            ))}
          </div>
        </div>
        <Button onClick={handleSubmitReport} disabled={isLoading} className="w-full mt-4">
          {isLoading ? "Generating..." : "Generate Monthly BRSR Report"}
        </Button>
      </div>
      <div className="w-3/4 p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Employee Profile</h1>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Sustainability Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveLine
                data={[
                  {
                    id: "Performance",
                    color: "hsl(120, 70%, 50%)",
                    data: employeeData.performanceData
                  }
                ]}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Month',
                  legendOffset: 36,
                  legendPosition: 'middle'
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Score',
                  legendOffset: -40,
                  legendPosition: 'middle'
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemBackground: 'rgba(0, 0, 0, .03)',
                          itemOpacity: 1
                        }
                      }
                    ]
                  }
                ]}
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="activities" className="mt-6">
          <TabsList className="flex justify-center">
            <TabsTrigger value="activities">Recent Activities</TabsTrigger>
            <TabsTrigger value="goals">Sustainability Goals</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>Recent Sustainability Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {employeeData.recentActivities.map((activity, index) => (
                    <li key={index} className="flex items-center gap-4">
                      <Badge variant="outline">{activity.date}</Badge>
                      <span>{activity.activity}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="goals">
            <Card>
              <CardHeader>
                <CardTitle>Sustainability Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4">
                    <Target className="text-blue-500" />
                    <span>Reduce energy consumption by 15% this quarter</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <Zap className="text-yellow-500" />
                    <span>Implement 3 new waste reduction initiatives</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <Award className="text-purple-500" />
                    <span>Achieve Sustainability Champion badge</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Sustainability Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="text-blue-500 hover:underline">BRSR Reporting Guidelines</a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-500 hover:underline">DoP Sustainability Best Practices</a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-500 hover:underline">Environmental Impact Assessment Tools</a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}