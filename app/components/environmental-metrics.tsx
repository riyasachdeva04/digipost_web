"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const data = [
  { month: 'Jan', fuelConsumption: 4000, wasteCollected: 2400, waterUsage: 2400, electricityUsage: 3000, paperWastage: 1000, aqiLevel: 80 },
  { month: 'Feb', fuelConsumption: 3000, wasteCollected: 1398, waterUsage: 2210, electricityUsage: 3200, paperWastage: 900, aqiLevel: 75 },
  { month: 'Mar', fuelConsumption: 2000, wasteCollected: 9800, waterUsage: 2290, electricityUsage: 3400, paperWastage: 1200, aqiLevel: 90 },
  { month: 'Apr', fuelConsumption: 2780, wasteCollected: 3908, waterUsage: 2000, electricityUsage: 3100, paperWastage: 800, aqiLevel: 85 },
  { month: 'May', fuelConsumption: 1890, wasteCollected: 4800, waterUsage: 2181, electricityUsage: 3500, paperWastage: 1100, aqiLevel: 95 },
  { month: 'Jun', fuelConsumption: 2390, wasteCollected: 3800, waterUsage: 2500, electricityUsage: 3300, paperWastage: 950, aqiLevel: 88 },
  { month: 'Jul', fuelConsumption: 3490, wasteCollected: 4300, waterUsage: 2800, electricityUsage: 3600, paperWastage: 1300, aqiLevel: 100 },
]

export function EnvironmentalMetrics() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="fuel">Fuel</TabsTrigger>
        <TabsTrigger value="waste">Waste</TabsTrigger>
        <TabsTrigger value="water">Water</TabsTrigger>
        <TabsTrigger value="electricity">Electricity</TabsTrigger>
        <TabsTrigger value="paper">Paper</TabsTrigger>
        <TabsTrigger value="aqi">AQI</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Environmental Metrics Overview</CardTitle>
            <CardDescription>A comprehensive view of all environmental metrics</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer
              config={{
                fuelConsumption: {
                  label: "Fuel Consumption",
                  color: "hsl(var(--chart-1))",
                },
                wasteCollected: {
                  label: "Waste Collected",
                  color: "hsl(var(--chart-2))",
                },
                waterUsage: {
                  label: "Water Usage",
                  color: "hsl(var(--chart-3))",
                },
                electricityUsage: {
                  label: "Electricity Usage",
                  color: "hsl(var(--chart-4))",
                },
                paperWastage: {
                  label: "Paper Wastage",
                  color: "hsl(var(--chart-5))",
                },
                aqiLevel: {
                  label: "AQI Level",
                  color: "hsl(var(--chart-6))",
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="fuelConsumption" stroke="var(--color-fuelConsumption)" />
                  <Line type="monotone" dataKey="wasteCollected" stroke="var(--color-wasteCollected)" />
                  <Line type="monotone" dataKey="waterUsage" stroke="var(--color-waterUsage)" />
                  <Line type="monotone" dataKey="electricityUsage" stroke="var(--color-electricityUsage)" />
                  <Line type="monotone" dataKey="paperWastage" stroke="var(--color-paperWastage)" />
                  <Line type="monotone" dataKey="aqiLevel" stroke="var(--color-aqiLevel)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="fuel" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Fuel Consumption</CardTitle>
            <CardDescription>Monthly fuel consumption in liters</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer
              config={{
                fuelConsumption: {
                  label: "Fuel Consumption",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="fuelConsumption" fill="var(--color-fuelConsumption)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="waste" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Waste Collection</CardTitle>
            <CardDescription>Monthly waste collected in kilograms</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer
              config={{
                wasteCollected: {
                  label: "Waste Collected",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="wasteCollected" fill="var(--color-wasteCollected)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="water" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Water Usage</CardTitle>
            <CardDescription>Monthly water usage in cubic meters</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer
              config={{
                waterUsage: {
                  label: "Water Usage",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="waterUsage" fill="var(--color-waterUsage)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="electricity" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Electricity Usage</CardTitle>
            <CardDescription>Monthly electricity consumption in kilowatt-hours</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer
              config={{
                electricityUsage: {
                  label: "Electricity Usage",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="electricityUsage" fill="var(--color-electricityUsage)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="paper" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Paper Wastage</CardTitle>
            <CardDescription>Monthly paper wastage in kilograms</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer
              config={{
                paperWastage: {
                  label: "Paper Wastage",
                  color: "hsl(var(--chart-5))",
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="paperWastage" fill="var(--color-paperWastage)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="aqi" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Air Quality Index (AQI)</CardTitle>
            <CardDescription>Monthly average AQI levels</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer
              config={{
                aqiLevel: {
                  label: "AQI Level",
                  color: "hsl(var(--chart-6))",
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="aqiLevel" fill="var(--color-aqiLevel)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

