import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { users, posts, Post } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, Share2, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PostCard = ({ post }: { post: Post }) => {
  const author = users.find((user) => user.id === post.authorId);

  return (
    <Card className="overflow-hidden animate-fade-in">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={author?.avatar} alt={author?.name} />
          <AvatarFallback>{author?.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-base">{author?.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{author?.college}</p>
          <p className="text-xs text-muted-foreground">{post.timestamp}</p>
        </div>
      </CardHeader>
      <CardContent>
        {post.type === 'event' && post.eventName && (
            <div className="mb-2">
                <Badge variant="secondary" className="bg-accent/20 text-accent-foreground border-accent/50">
                    <Calendar className="w-3 h-3 mr-1.5" />
                    EVENT: {post.eventName} - {post.eventDate}
                </Badge>
            </div>
        )}
        <p className="mb-4">{post.content}</p>
        {post.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image src={post.image} alt="Post image" layout="fill" objectFit="cover" data-ai-hint="social media post"/>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="ghost" size="sm">
          <Heart className="mr-2 h-4 w-4" /> Like
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle className="mr-2 h-4 w-4" /> Comment
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function FeedPage() {
  return (
    <div className="container mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Feed</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
