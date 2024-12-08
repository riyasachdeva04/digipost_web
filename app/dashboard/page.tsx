import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">DoP BRSR Dashboard</h1>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Tabs defaultValue="input" className="w-full">
          <TabsList>
            <TabsTrigger value="input">Data Input</TabsTrigger>
            <TabsTrigger value="view">View Data</TabsTrigger>
          </TabsList>
          <TabsContent value="input">
            <Card>
              <CardHeader>
                <CardTitle>Input Sustainability Data</CardTitle>
                <CardDescription>Record your office sustainability metrics for the current period.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="energy">Energy Consumption (kWh)</Label>
                      <Input id="energy" type="number" placeholder="Enter energy consumption" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="water">Water Usage (Liters)</Label>
                      <Input id="water" type="number" placeholder="Enter water usage" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="waste">Waste Generated (kg)</Label>
                      <Input id="waste" type="number" placeholder="Enter waste generated" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="community">Community Engagement Hours</Label>
                      <Input id="community" type="number" placeholder="Enter community engagement hours" />
                    </div>
                  </div>
                  <Button type="submit">Submit Data</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="view">
            <Card>
              <CardHeader>
                <CardTitle>Sustainability Performance</CardTitle>
                <CardDescription>View your office sustainability metrics and trends.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Detailed charts and analytics will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-muted py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Department of Posts. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

