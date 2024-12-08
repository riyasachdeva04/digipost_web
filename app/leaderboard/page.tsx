import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const leaderboardData = [
  { rank: 1, circle: "Delhi", score: 95 },
  { rank: 2, circle: "Mumbai", score: 92 },
  { rank: 3, circle: "Kolkata", score: 88 },
  { rank: 4, circle: "Chennai", score: 85 },
  { rank: 5, circle: "Bengaluru", score: 82 },
]

export default function Leaderboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">DoP BRSR Leaderboard</h1>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Sustainability Performance Leaderboard</CardTitle>
            <CardDescription>Top performing postal circles based on their sustainability efforts</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>Postal Circle</TableHead>
                  <TableHead className="text-right">Sustainability Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((item) => (
                  <TableRow key={item.rank}>
                    <TableCell className="font-medium">{item.rank}</TableCell>
                    <TableCell>{item.circle}</TableCell>
                    <TableCell className="text-right">{item.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      
      <footer className="bg-muted py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Department of Posts. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

