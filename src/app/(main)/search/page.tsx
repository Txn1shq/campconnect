import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { users, posts } from "@/lib/data";
import { MapPin, Plus } from "lucide-react";

export default function SearchPage() {
  const events = posts.filter(p => p.type === 'event');

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      <div className="relative mb-6">
        <Input placeholder="Search for people, events, or colleges..." className="text-base" />
      </div>

      <Tabs defaultValue="people" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-1/2">
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="colleges">Colleges</TabsTrigger>
        </TabsList>
        <TabsContent value="people" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {users.map((user) => (
              <Card key={user.id} className="p-4 flex flex-col items-center text-center">
                <Avatar className="w-20 h-20 mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.college}</p>
                <Button size="sm" className="mt-4 w-full">
                  <Plus className="mr-2 h-4 w-4" /> Connect
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="events" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => {
                    const author = users.find(u => u.id === event.authorId);
                    return (
                        <Card key={event.id}>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-bold">{event.eventName}</h3>
                                <div className="text-sm text-muted-foreground mt-1 mb-3">
                                    <p>Hosted by {author?.name}</p>
                                    <p>{event.eventDate}</p>
                                </div>
                                <p className="text-sm">{event.content}</p>
                                <Button className="w-full mt-4" variant="outline">View Event</Button>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </TabsContent>
        <TabsContent value="colleges" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...new Set(users.map(u => u.college))].map(college => (
                    <Card key={college}>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-bold">{college}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-2">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span>City, State</span>
                            </div>
                            <Button className="w-full mt-4" variant="outline">View College</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
