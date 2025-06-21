import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currentUser, posts } from "@/lib/data";
import { Calendar, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
    const userPosts = posts.filter(p => p.authorId === currentUser.id);

  return (
    <div className="container mx-auto max-w-4xl">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-28 h-28 border-4 border-primary">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold">{currentUser.name}</h1>
              <p className="text-lg text-muted-foreground">{currentUser.college}</p>
              <p className="mt-2">{currentUser.about}</p>
            </div>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">My Posts</h2>
      <Separator className="mb-6"/>
      <div className="space-y-6">
        {userPosts.length > 0 ? (
            userPosts.map(post => (
                <Card key={post.id} className="overflow-hidden">
                    <CardHeader>
                        {post.type === 'event' && post.eventName && (
                            <div className="mb-2">
                                <Badge variant="secondary" className="bg-accent/20 text-accent-foreground border-accent/50">
                                    <Calendar className="w-3 h-3 mr-1.5" />
                                    EVENT: {post.eventName} - {post.eventDate}
                                </Badge>
                            </div>
                        )}
                         <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                    </CardHeader>
                    <CardContent>
                        <p>{post.content}</p>
                         {post.image && (
                          <div className="relative aspect-video w-full overflow-hidden rounded-lg mt-4">
                            <Image src={post.image} alt="Post image" layout="fill" objectFit="cover" data-ai-hint="social media post"/>
                          </div>
                        )}
                    </CardContent>
                </Card>
            ))
        ) : (
            <p className="text-muted-foreground text-center py-8">You haven't posted anything yet.</p>
        )}
      </div>
    </div>
  );
}
