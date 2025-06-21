import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { marketItems, users } from "@/lib/data";

export default function MarketPage() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <Button>Sell an Item</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {marketItems.map((item) => {
          const seller = users.find((user) => user.id === item.sellerId);
          return (
            <Card key={item.id} className="overflow-hidden group">
              <CardHeader className="p-0">
                <div className="relative aspect-square w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={item['data-ai-hint']}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg truncate">{item.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Sold by {seller?.name}
                </p>
                <p className="text-lg font-bold mt-2 text-primary">${item.price}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full">View Item</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
