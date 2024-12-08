import { Appbar } from '../components/Appbar'
import Avatar3D from '../components/Avatar3d'
import StreakGraph from '../components/StreakGraph'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProfilePage() {
  const user = {
    name: "Jane Doe",
    points: 1250,
    badges: ["Speedy Delivery", "Stamp Collector", "Parcel Pro"],
    bookmarkedOffices: [
      "Central Post Office",
      "Harbor Mail Center",
      "Westside Postal Hub"
    ],
    streakData: [4, 2, 7, 5, 10, 3, 6, 8, 4, 9, 5, 7]
  }

  return (
    <div>
      <Appbar></Appbar>
    <div className="container mx-auto p-4 flex flex-col md:flex-row ">
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-8">My Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold mt-4">Points: {user.points}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Activity Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <StreakGraph data={user.streakData} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.badges.map((badge) => (
                  <Badge key={badge} variant="secondary">{badge}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Bookmarked Postal Offices</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {user.bookmarkedOffices.map((office) => (
                  <li key={office}>{office}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="w-full md:w-1/3 h-screen">
        <Avatar3D />
      </div>
      </div>
    </div>
  )
}
