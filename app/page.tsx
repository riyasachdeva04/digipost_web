"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveBar } from "@nivo/bar"
import { ResponsivePie } from "@nivo/pie"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trophy, Users, Zap } from 'lucide-react'
import { Appbar } from "./components/Appbar"



// import { error } from "console"
const postofficesdata=[
 {
      "Name": "Mumbai HPO",
      "AQI_Category": "Unhealthy",
      "G_C": 10,
      "Last_Month_Community_Engagement_Activities_(per_month)": 4,
      "Last_Month_Energy_Consumption_(kWhpermonth)": 3000,
      "Last_Month_Fuel_Usage_(literspermonth)": 200,
      "Last_Month_Paper_Waste_Threshold_(kgpermonth)": 250,
      "Last_Month_Water_Usage_(literspermonth)": 5000,
      "New_Month_Community_Engagement_Activities_(per_month)": 5,
      "New_Month_Energy_Consumption_(kWhpermonth)": 3200,
      "New_Month_Fuel_Usage_(literspermonth)": 180,
      "New_Month_Paper_Waste_Threshold_(kgpermonth)": 300,
      "New_Month_Water_Usage_(literspermonth)": 4800,
      "Post_Office_ID": 147001,
      "Rank": 1,
      "Region": "Urban",
      "Score": 17.2,
      "Suggested_Plants_for_Plantation": "Neem, Peepal, Tulsi",
      "T_C": 15,
      "Type_of_Post_Office": "Head Post Office (HPO)",
      "Typical_AQI_Range": "151–200"
    },
    {
      "Name": "Delhi SPO",
      "AQI_Category": "Moderate",
      "G_C": 11,
      "Last_Month_Community_Engagement_Activities_(per_month)": 4,
      "Last_Month_Energy_Consumption_(kWhpermonth)": 3000,
      "Last_Month_Fuel_Usage_(literspermonth)": 200,
      "Last_Month_Paper_Waste_Threshold_(kgpermonth)": 250,
      "Last_Month_Water_Usage_(literspermonth)": 5000,
      "New_Month_Community_Engagement_Activities_(per_month)": 3,
      "New_Month_Energy_Consumption_(kWhpermonth)": 2700,
      "New_Month_Fuel_Usage_(literspermonth)": 210,
      "New_Month_Paper_Waste_Threshold_(kgpermonth)": 280,
      "New_Month_Water_Usage_(literspermonth)": 5200,
      "Post_Office_ID": 147026,
      "Rank": 2,
      "Region": "Urban",
      "Score": -0.26666666666666955,
      "Suggested_Plants_for_Plantation": "Neem, Peepal, Tulsi",
      "T_C": 15,
      "Type_of_Post_Office": "Sub Post Office (SPO)",
      "Typical_AQI_Range": "101–150"
    },
    { "Name": "Kolkata BPO",
      "AQI_Category": "Satisfactory",
      "G_C": 12,
      "Last_Month_Community_Engagement_Activities_(per_month)": 4,
      "Last_Month_Energy_Consumption_(kWhpermonth)": 3000,
      "Last_Month_Fuel_Usage_(literspermonth)": 200,
      "Last_Month_Paper_Waste_Threshold_(kgpermonth)": 250,
      "Last_Month_Water_Usage_(literspermonth)": 5000,
      "New_Month_Community_Engagement_Activities_(per_month)": 5,
      "New_Month_Energy_Consumption_(kWhpermonth)": 3200,
      "New_Month_Fuel_Usage_(literspermonth)": 180,
      "New_Month_Paper_Waste_Threshold_(kgpermonth)": 300,
      "New_Month_Water_Usage_(literspermonth)": 4800,
      "Post_Office_ID": 147061,
      "Rank": 5,
      "Region": "Rural",
      "Score": -261.17777777777775,
      "Suggested_Plants_for_Plantation": "Neem, Peepal, Tulsi",
      "T_C": 15,
      "Type_of_Post_Office": "Branch Post Office (BPO)",
      "Typical_AQI_Range": "51–100"
    },
    { "Name": "Chennai BPO",
      "AQI_Category": "Satisfactory",
      "G_C": 13,
      "Last_Month_Community_Engagement_Activities_(per_month)": 3,
      "Last_Month_Energy_Consumption_(kWhpermonth)": 2800,
      "Last_Month_Fuel_Usage_(literspermonth)": 190,
      "Last_Month_Paper_Waste_Threshold_(kgpermonth)": 240,
      "Last_Month_Water_Usage_(literspermonth)": 4800,
      "New_Month_Community_Engagement_Activities_(per_month)": 5,
      "New_Month_Energy_Consumption_(kWhpermonth)": 3200,
      "New_Month_Fuel_Usage_(literspermonth)": 180,
      "New_Month_Paper_Waste_Threshold_(kgpermonth)": 200,
      "New_Month_Water_Usage_(literspermonth)": 4800,
      "Post_Office_ID": 147052,
      "Rank": 3,
      "Region": "Semi-Urban",
      "Score": -125.04594820384294,
      "Suggested_Plants_for_Plantation": "Spider Plant, Aloe Vera",
      "T_C": 15,
      "Type_of_Post_Office": "Branch Post Office (BPO)",
      "Typical_AQI_Range": "51–100"
    },
    {
      "Name": "Bengaluru BPO",
      "AQI_Category": "Satisfactory",
      "G_C": 9,
      "Last_Month_Community_Engagement_Activities_(per_month)": 4,
      "Last_Month_Energy_Consumption_(kWhpermonth)": 3000,
      "Last_Month_Fuel_Usage_(literspermonth)": 200,
      "Last_Month_Paper_Waste_Threshold_(kgpermonth)": 250,
      "Last_Month_Water_Usage_(literspermonth)": 5000,
      "New_Month_Community_Engagement_Activities_(per_month)": 5,
      "New_Month_Energy_Consumption_(kWhpermonth)": 3200,
      "New_Month_Fuel_Usage_(literspermonth)": 180,
      "New_Month_Paper_Waste_Threshold_(kgpermonth)": 300,
      "New_Month_Water_Usage_(literspermonth)": 4800,
      "Post_Office_ID": 147051,
      "Rank": 4,
      "Region": "Semi-Urban",
      "Score": -135.84444444444446,
      "Suggested_Plants_for_Plantation": "Neem, Peepal, Tulsi",
      "T_C": 10,
      "Type_of_Post_Office": "Branch Post Office (BPO)",
      "Typical_AQI_Range": "51–100"
    }
]


const energyData = [
  { postOffice: "Mumbai GPO", consumption: 1200 },
  { postOffice: "Delhi GPO", consumption: 1100 },
  { postOffice: "Kolkata GPO", consumption: 950 },
  { postOffice: "Chennai GPO", consumption: 1000 },
  { postOffice: "Bengaluru GPO", consumption: 1050 },
]

const wasteData = [
  { id: "Paper", value: 45 },
  { id: "Plastic", value: 25 },
  { id: "E-waste", value: 15 },
  { id: "Others", value: 15 },
]

const leaderboardData = [
  { name: "Mumbai Circle", score: 95 },
  { name: "Delhi Circle", score: 92 },
  { name: "Kerala Circle", score: 90 },
  { name: "Gujarat Circle", score: 88 },
  { name: "Tamil Nadu Circle", score: 87 },
]

export default function DashboardPage() {
  const [energyReading, setEnergyReading] = useState("")
  const [wasteAmount, setWasteAmount] = useState("")
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);


  // const downloadReport = (fileId: string) => {
  //   const link = document.createElement("a");
  //   link.href = `https://drive.google.com/uc?export=download&id=${fileId}`;
  //   link.target = "_blank"; // Opens in a new tab
  //   link.rel = "noopener noreferrer"; // Security feature
  //   link.click();
  // };


  const downloadReport = (fileName: string) => {
    const link = document.createElement("a");
    link.href = `/${fileName}`; // Path to the report in your public folder or backend endpoint
    link.download = fileName; // Sets the downloaded file's name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  
  

    const handleExecuteGame1 = async () => {
        setIsLoading1(true);
        try {
            const response = await fetch('/api/execute-game1');
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Script execution failed');
            }

            console.log('Script Output:', result.output);
            alert('Script executed successfully: ' + result.output);
        } catch (err) {
            console.error('Execution error:', err);
            alert('Error: ' );
        } finally {
            setIsLoading1(false);
        }
    };
    const handleExecuteGame2 = async () => {
      setIsLoading2(true);
      try {
          const response = await fetch('/api/execute-game2');
          const result = await response.json();

          if (!response.ok) {
              throw new Error(result.error || 'Script execution failed');
          }

          console.log('Script Output:', result.output);
          alert('Script executed successfully: ' + result.output);
      } catch (err) {
          console.error('Execution error:', err);
          alert('Error: ' );
      } finally {
          setIsLoading2(false);
      }
  };
  const handleExecuteGame3 = async () => {
    setIsLoading3(true);
    try {
        const response = await fetch('/api/execute-game3');
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Script execution failed');
        }

        console.log('Script Output:', result.output);
        alert('Script executed successfully: ' + result.output);
    } catch (err) {
        console.error('Execution error:', err);
        alert('Error: ' );
    } finally {
        setIsLoading3(false);
    }
};
  return (
    <div className="container mx-auto py-10">
        <Appbar></Appbar>
      <h1 className="text-4xl font-bold mb-8">DoP BRSR Dashboard</h1>
      <div style={{ height: '600px', width: '100%' }}>
      <iframe
        title="Postal Divisions Map"
        src="/india_postal_divisions_map_with_heatmap.html"  // The path to the map file in your public folder
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
      />
    </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="data-entry">Data Entry</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="game">Games</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Energy Consumption
                </CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,231 kWh</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Waste Recycled
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,350 kg</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Community Initiatives
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Overall BRSR Score
                </CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87/100</div>
                <p className="text-xs text-muted-foreground">
                  +5.1% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Energy Consumption by Post Office</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveBar
                    data={energyData}
                    keys={["consumption"]}
                    indexBy="postOffice"
                    margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                    padding={0.3}
                    valueScale={{ type: "linear" }}
                    colors={{ scheme: "nivo" }}
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: -45,
                      legend: "Post Office",
                      legendPosition: "middle",
                      legendOffset: 40
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "Consumption (kWh)",
                      legendPosition: "middle",
                      legendOffset: -40
                    }}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Waste Composition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsivePie
                    data={wasteData}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    colors={{ scheme: "nivo" }}
                    borderWidth={1}
                    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: "color" }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data-entry">
          <Card>
            <CardHeader>
              <CardTitle>Data Entry</CardTitle>
              <CardDescription>
                Record your daily sustainability metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="energy-reading">Energy Consumption (kWh)</Label>
                  <Input
                    id="energy-reading"
                    placeholder="Enter today's energy reading"
                    value={energyReading}
                    onChange={(e) => setEnergyReading(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waste-amount">Waste Generated (kg)</Label>
                  <Input
                    id="waste-amount"
                    placeholder="Enter amount of waste generated"
                    value={wasteAmount}
                    onChange={(e) => setWasteAmount(e.target.value)}
                  />
                </div>
                <Button>Submit Data</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* <TabsContent value="reports">
  <Card>
    <CardHeader>
      <CardTitle>Sustainability Reports</CardTitle>
      <CardDescription>
        View and download your BRSR reports
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>2024 BRSR Report</span>
          <Button onClick={() => downloadReport("1XXCeMbxUW0SFZQA0hVxQGxeNrzki4KitbvlodX7D8zU")}>
            Download
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <span>April 2023 BRSR Report</span>
          <Button onClick={() => downloadReport("April_2023_BRSR_Report.pdf")}>
            Download
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <span>March 2023 BRSR Report</span>
          <Button onClick={() => downloadReport("March_2023_BRSR_Report.pdf")}>
            Download
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</TabsContent> */}

          <TabsContent value="reports">
  <Card>
    <CardHeader>
      <CardTitle>Sustainability Reports</CardTitle>
      <CardDescription>
        View and download your BRSR reports
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>2024 BRSR Report</span>
          <Button onClick={() => downloadReport("BRSR_REPORT_2024.pdf")}>
            Download
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <span>2023 BRSR Report</span>
          <Button onClick={() => downloadReport("BRSR_REPORT_2024.pdf")}>
            Download
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <span>2022 BRSR Report</span>
          <Button onClick={() => downloadReport("BRSR_REPORT_2024.pdf")}>
            Download
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</TabsContent>


<TabsContent value="leaderboard">
  <Card>
    <CardHeader>
      <CardTitle>Sustainability Leaderboard</CardTitle>
      <CardDescription>
        Top performing postal circles in sustainability
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {postofficesdata
          .sort((a, b) => a.Rank - b.Rank)
          .map((circle) => (
            <div key={circle.Post_Office_ID} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{circle.Rank}</Badge>
                <span>{circle.Name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={circle.Score} className="w-[100px]" />
                <span className="font-bold">{circle.Score}</span>
              </div>
            </div>
          ))}
      </div>
    </CardContent>
  </Card>
</TabsContent>

        <TabsContent value="game">
        <Card>
          <CardHeader>
            <CardTitle>Learning Games</CardTitle>
            <CardDescription>
            Play fun games and earn points
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
            <Button 
              onClick={handleExecuteGame1} 
              disabled={isLoading1}>
              {isLoading1 ? 'Executing...' : 'Game 1'}
          </Button>
            <Button 
              onClick={handleExecuteGame2} 
              disabled={isLoading2}>
              {isLoading2 ? 'Executing...' : 'Game 2'}
          </Button>
            <Button 
              onClick={handleExecuteGame3} 
              disabled={isLoading3}>
              {isLoading3 ? 'Executing...' : 'Game 3'}
          </Button>
          </div>
          </CardContent>
          </Card>
        </TabsContent>
          

      </Tabs>
    </div>
  )
}

