import { Appbar } from '../components/Appbar'
import Avatar3D from '../components/Avatar3d'
import StreakGraph from '../components/StreakGraph'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import coin from './coin.png'

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
    <div className="bg-gray-900 min-h-screen text-white">
      <Appbar />
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-8">My Profile</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gray-800 rounded-lg shadow-lg">
            
              <CardHeader>
              <text className="text-lg mt-2">Name:</text>
                <CardTitle className="text-2xl font-medium">{user.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mt-2">Points:</p>
                <text className="text-8xl mt-2">{user.points}</text>
                {/* <img src={require('@/app/Profile/coin.png')} alt="" width="20" height="20"/> */}
              </CardContent>
            </Card>
            <Card className="bg-gray-800 rounded-lg shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Activity Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <StreakGraph data={user.streakData} />
              </CardContent>
            </Card>
            <Card className="bg-gray-800 rounded-lg shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.badges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="bg-gray-700 text-gray-300 py-1 px-3 rounded-full text-sm">{badge}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 rounded-lg shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Bookmarked Postal Offices</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-400">
                  {user.bookmarkedOffices.map((office) => (
                    <li key={office}>{office}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* <div className="w-full md:w-1/3 h-full flex justify-center items-center p-4">
          <div className="w-full h-full rounded-lg shadow-inner flex justify-center items-center">
            <Avatar3D />
          </div>
        </div> */}
        <div className="w-full md:w-1/3 h-screen">
          <Avatar3D/>
        </div>
      </div>
    </div>
  )
}
