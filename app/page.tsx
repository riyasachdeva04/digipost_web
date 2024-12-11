"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveBar } from "@nivo/bar"
import { ResponsivePie } from "@nivo/pie"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trophy, Users, Zap, Bot, Phone } from 'lucide-react'
import { Appbar } from "./components/Appbar"
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";
import { db } from './firebase';
import { ref, get } from 'firebase/database';

const fetchData = async () => {
  const dbRef = ref(db, 'complaints');
  const snapshot = await get(dbRef);
  const data = snapshot.val();
  const complaints = Object.keys(data).map(key => ({
    id: key,
    ...data[key]
  }));
  // for (const complaint of complaints) {
  //   const { complaint: complaintText, id, timestamp, status } = complaint;
  //   console.log(complaintText, id, timestamp, status);
  // }
  return complaints;
};

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
// import { error } from "console"

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

// const leaderboardData = [
//   { name: "Mumbai Circle", score: 95 },
//   { name: "Delhi Circle", score: 92 },
//   { name: "Kerala Circle", score: 90 },
//   { name: "Gujarat Circle", score: 88 },
//   { name: "Tamil Nadu Circle", score: 87 },
// ]
interface Node {
  name: string
  count: number
  vehicles: {
    [key: string]: number
  }
}

const nodesData: Node[] = [
  { name: "Hyderabad-South", count: 748, vehicles: { Truck: 166, Plane: 150, Van: 136, Bike: 160, Train: 136 } },
  { name: "Kolkata-South", count: 740, vehicles: { Van: 160, Truck: 145, Bike: 141, Plane: 151, Train: 143 } },
  { name: "Bangalore-West", count: 723, vehicles: { Van: 135, Train: 147, Plane: 154, Bike: 154, Truck: 133 } },
  { name: "Hyderabad-North", count: 722, vehicles: { Train: 135, Truck: 135, Bike: 139, Plane: 145, Van: 168 } },
  { name: "Bangalore-Central", count: 714, vehicles: { Bike: 136, Truck: 142, Plane: 138, Van: 153, Train: 145 } },
  { name: "Kolkata-Central", count: 712, vehicles: { Bike: 130, Van: 153, Train: 133, Plane: 165, Truck: 131 } },
  { name: "Bangalore-East", count: 707, vehicles: { Truck: 134, Van: 134, Train: 148, Plane: 146, Bike: 145 } },
  { name: "Kolkata-North", count: 700, vehicles: { Plane: 125, Bike: 131, Van: 153, Train: 161, Truck: 130 } },
  { name: "Hyderabad-Central", count: 680, vehicles: { Plane: 135, Bike: 145, Truck: 135, Train: 138, Van: 127 } },
  { name: "Chennai-Central", count: 539, vehicles: { Plane: 103, Van: 113, Train: 102, Truck: 119, Bike: 102 } },
  { name: "Chennai-North", count: 527, vehicles: { Truck: 118, Train: 104, Bike: 110, Plane: 92, Van: 103 } },
  { name: "Chennai-Outer", count: 513, vehicles: { Bike: 103, Train: 100, Truck: 115, Van: 93, Plane: 102 } },
  { name: "Chennai-South", count: 498, vehicles: { Van: 99, Bike: 92, Plane: 103, Truck: 105, Train: 99 } },
  { name: "Delhi-East", count: 370, vehicles: { Van: 74, Plane: 71, Truck: 76, Train: 81, Bike: 68 } },
  { name: "Delhi-West", count: 357, vehicles: { Train: 68, Truck: 71, Van: 69, Bike: 72, Plane: 77 } },
  { name: "Delhi-Outer", count: 342, vehicles: { Plane: 62, Truck: 81, Train: 69, Van: 75, Bike: 55 } },
  { name: "Pune-West", count: 333, vehicles: { Bike: 70, Plane: 78, Truck: 73, Van: 60, Train: 52 } },
  { name: "Delhi-Central", count: 331, vehicles: { Truck: 63, Bike: 68, Train: 70, Van: 80, Plane: 50 } },
  { name: "Pune-Central", count: 331, vehicles: { Bike: 75, Truck: 68, Van: 64, Plane: 51, Train: 73 } },
  { name: "Delhi-Airport", count: 330, vehicles: { Truck: 64, Train: 76, Van: 66, Bike: 62, Plane: 62 } },
  { name: "Pune-East", count: 317, vehicles: { Bike: 68, Train: 73, Van: 68, Truck: 46, Plane: 62 } },
  { name: "Mumbai-Airport", count: 261, vehicles: { Plane: 55, Train: 56, Truck: 59, Bike: 42, Van: 49 } },
  { name: "Mumbai-International", count: 260, vehicles: { Bike: 61, Plane: 45, Van: 59, Truck: 65, Train: 30 } },
  { name: "Mumbai-Central", count: 249, vehicles: { Train: 61, Van: 48, Truck: 51, Plane: 55, Bike: 34 } },
  { name: "Mumbai-East", count: 240, vehicles: { Plane: 55, Truck: 47, Train: 37, Bike: 47, Van: 54 } },
  { name: "Mumbai-West", count: 231, vehicles: { Bike: 47, Train: 46, Van: 47, Truck: 54, Plane: 37 } },
  { name: "Ahmedabad-East", count: 212, vehicles: { Truck: 37, Plane: 53, Bike: 33, Train: 44, Van: 45 } },
  { name: "Ahmedabad-West", count: 197, vehicles: { Van: 39, Train: 37, Plane: 51, Bike: 40, Truck: 30 } },
  { name: "Ahmedabad-Central", count: 177, vehicles: { Plane: 34, Train: 31, Truck: 41, Bike: 30, Van: 41 } },
]


export default function DashboardPage() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const getColorForCount = (count: number) => {
    const maxCount = Math.max(...nodesData.map(node => node.count))
    const percentage = count / maxCount
    if (percentage > 0.8) return "bg-red-500"
    if (percentage > 0.6) return "bg-orange-500"
    if (percentage > 0.4) return "bg-yellow-500"
    if (percentage > 0.2) return "bg-green-500"
    return "bg-blue-500"
  }
  const [energyReading, setEnergyReading] = useState("")
  const [wasteAmount, setWasteAmount] = useState("")
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  // const [chatBox, setchatBox] = useState(false);
  const [chatBoxVisible, setChatBoxVisible] = useState(false);
  const [Counter, setCounter] = useState(0);
  const [complaints, setComplaints] = useState([]);
  const[quizOutput, setQuizOutput] = useState(null);
  const[divLoad, setDivLoad] = useState(false);
  let quizData = {};
  if(quizOutput){quizData = JSON.parse(quizOutput)
    console.log(quizData["word_of_the_day"]);
  };
  let word_of_the_day = quizData["word_of_the_day"];
  let mcqs = quizData["mcqs"];
  useEffect(() => {
    const fetchDataAsync = async () => {
      const complaintsData = await fetchData();
      setComplaints(complaintsData);
    };
    fetchDataAsync();
  }, []);
    

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
        await setQuizOutput(result.output);
        console.log('Quiz Output:', quizOutput);
        setDivLoad(true);
    } catch (err) {
        console.error('Execution error:', err);
        alert('Error: ' );
    } finally {
        setIsLoading3(false);
    }
};
const handleChat = async () => {
  setIsLoading1(true);
  try {
      const response = await fetch('/api/chat-bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: chatMessage }),
      });
      const result = await response.json();
      setChatResponse(result.response);
      
      if (!response.ok) {
          
          throw new Error(result.error || 'Script execution failed');
      }

      console.log('Script Output:', result.response);
      alert('Script executed successfully: ' + result.output);
  } catch (err) {
      console.log('hi')
      console.error('Execution error:', err);
      alert('Error: ' );
  } finally {
      setIsLoading1(false);
  }
};
  return (
    <div className="">
        <Appbar></Appbar>
      {/* <h1 className="text-4xl font-bold mx-10 my-8">DoP BRSR Dashboard</h1> */}
      <div className="container mx-auto py-10" style={{ height: '600px', width: '100%' }}>
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
          <TabsTrigger value="damage">Damage Prone Routes</TabsTrigger>
          <TabsTrigger value="bot">Bot Logs</TabsTrigger>
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
            {divLoad && (
            <div className="quiz-container p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Quiz of the Day</h2>
          
            {/* Word of the Day Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Word of the Day</h3>
              <p className="text-gray-600 text-lg italic">{word_of_the_day}</p>
            </div>
          
            {/* MCQs Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">MCQs</h3>
              <div className="space-y-4">
                {mcqs.split('\n\n').map((block, index) => (
                  <div key={index} className="p-4 bg-gray-100 rounded-md">
                    {block.split('\n').map((line, idx) => (
                      idx === 0 ? (
                        <p key={idx} className="font-semibold text-black mb-2">{line}</p>
                      ) : (
                        line.startsWith("Answer:") ? (
                          <p key={idx} className="text-sm italic text-gray-500">{line}</p>
                        ) : (
                          <button key={idx} className="block w-full text-left p-2 bg-white border border-gray-300 rounded-md hover:bg-gray-200">{line}</button>
                        )
                      )
                    ))}
                  </div>
                ))}
              </div>
            </div>
        
          </div>
          
            )}
          </CardContent>
          </Card>
        </TabsContent>
          
        <TabsContent value="damage">
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Postal Service Nodes and Vehicle Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {nodesData.map((node) => (
                  <button
                    key={node.name}
                    className={`p-2 rounded ${getColorForCount(node.count)} text-white text-xs`}
                    onClick={() => setSelectedNode(node)}
                  >
                    {node.name}
                  </button>
                ))}
              </div>
              {selectedNode && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">{selectedNode.name}</h3>
                  <p className="mb-2">Damage Count: {selectedNode.count}</p>
                  <h4 className="font-semibold mb-1">Vehicle Distribution:</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {Object.entries(selectedNode.vehicles).map(([vehicle, count]) => (
                      <li key={vehicle} className="flex justify-between">
                        <span>{vehicle}:</span>
                        <span>{count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {!selectedNode && (
                <div className="text-center text-gray-500">
                  Click on a node to view its details and vehicle distribution
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bot">
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Bot Logs</CardTitle>
            </CardHeader>
            <CardContent>
            <Table aria-label="Complaints Table">
              <TableHeader>
                <TableColumn>User Enquiry ID</TableColumn>
                <TableColumn>Complaint</TableColumn>
                <TableColumn>TimeStamp</TableColumn>
                <TableColumn>Status</TableColumn>
              </TableHeader>
              <TableBody>
                {complaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell>{complaint.id}</TableCell>
                    <TableCell>{complaint.complaint}</TableCell>
                    <TableCell>{complaint.timestamp}</TableCell>
                    <TableCell>{complaint.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <button 
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg flex items-center " 
        onClick={() => setChatBoxVisible(true)}
      >
        Chat
        <Bot className=" ml-2 h-15 w-15 mr-2" />
      </button>
      {chatBoxVisible && (
        <div className="fixed bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg w-80">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Chatbox</h2>
            <button onClick={() => setChatBoxVisible(false)} className="text-red-500">X</button>
          </div>
          <div className="h-64 overflow-y-scroll border p-2 mb-2">
            {/* Chat messages will go here */}
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-grow border rounded-l-lg p-2"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
            />
            <button className="bg-blue-500 text-white p-2 rounded-r-lg" onClick={async () => {
              await handleChat();
            
              const chatBox = document.querySelector(".h-64.overflow-y-scroll.border.p-2.mb-2");
              if (chatBox) {
                
                setCounter(Counter+1);
                const userMessage = document.createElement("div");
                chatBox.appendChild(userMessage);
                userMessage.className = "p-2 bg-blue-200 rounded mb-2 self-end";
                userMessage.textContent = chatMessage;

                const botMessage = document.createElement("div");
                botMessage.className = "p-2 bg-gray-200 rounded mb-2";
                botMessage.textContent = chatResponse;
                chatBox.appendChild(botMessage);

                chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
                
              }
            }} disabled={isLoading1}>{isLoading1 ? 'Sending...' : 'Send'}</button>
          </div>
        </div>
      )}
      <button 
        className="fixed bottom-24 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg flex items-center " 
        onClick={() => window.location.href = 'tel:+17755936425'}
      >
        Call
        <Phone className=" ml-2 h-15 w-15 mr-2" />
      </button>
    </div>
  )
}

