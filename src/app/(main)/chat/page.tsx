import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chats, users, currentUser } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SendHorizonal } from "lucide-react";

export default function ChatPage() {
  const currentChat = chats[0];
  const recipient = users.find(
    (user) => user.id === currentChat.participantIds.find((id) => id !== currentUser.id)
  );

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Chat</h1>
      <Card className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-full">
        <div className="md:col-span-1 lg:col-span-1 border-r">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <ScrollArea className="h-[calc(100%-80px)]">
            <div className="p-2 space-y-1">
              {chats.map((chat, index) => {
                const otherUser = users.find(u => u.id === chat.participantIds.find(id => id !== currentUser.id));
                return (
                  <Button
                    key={chat.id}
                    variant="ghost"
                    className={cn("w-full justify-start h-16 p-2", index === 0 ? "bg-accent" : "")}
                  >
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src={otherUser?.avatar} alt={otherUser?.name} />
                      <AvatarFallback>{otherUser?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-left w-full overflow-hidden">
                      <p className="font-semibold truncate">{otherUser?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{chat.messages[chat.messages.length - 1].text}</p>
                    </div>
                  </Button>
                )
              })}
            </div>
          </ScrollArea>
        </div>
        <div className="md:col-span-2 lg:col-span-3 flex flex-col h-full">
          <CardHeader className="flex flex-row items-center gap-4 border-b">
            <Avatar>
              <AvatarImage src={recipient?.avatar} alt={recipient?.name} />
              <AvatarFallback>{recipient?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{recipient?.name}</p>
              <p className="text-sm text-muted-foreground">{recipient?.college}</p>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-6 space-y-4 overflow-y-auto">
            {currentChat.messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-end gap-2",
                  message.senderId === currentUser.id ? "justify-end" : "justify-start"
                )}
              >
                {message.senderId !== currentUser.id && (
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={recipient?.avatar} />
                        <AvatarFallback>{recipient?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-xs rounded-lg p-3",
                    message.senderId === currentUser.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p>{message.text}</p>
                  <p className="text-xs opacity-70 mt-1 text-right">{message.timestamp}</p>
                </div>
                 {message.senderId === currentUser.id && (
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={currentUser?.avatar} />
                        <AvatarFallback>{currentUser?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                )}
              </div>
            ))}
          </CardContent>
          <div className="p-4 border-t">
            <div className="relative">
              <Input placeholder="Type a message..." className="pr-12" />
              <Button size="icon" variant="ghost" className="absolute top-1/2 right-1 -translate-y-1/2">
                <SendHorizonal className="h-5 w-5 text-primary" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
