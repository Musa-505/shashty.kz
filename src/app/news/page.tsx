
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { newsItems } from "@/lib/placeholder-data";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">News & Updates</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          The latest news and updates on Kazakh culture, heritage events, and historical discoveries.
        </p>
      </div>

      <div className="space-y-8">
        {newsItems.map((item) => (
          <Card key={item.id} className="w-full overflow-hidden transition-shadow hover:shadow-lg">
            <div className="grid md:grid-cols-3">
              <div className="md:col-span-1 relative h-64 md:h-full min-h-[200px]">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  data-ai-hint={item.imageHint}
                />
              </div>
              <div className="md:col-span-2 flex flex-col">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{item.title}</CardTitle>
                  <CardDescription>{item.date}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-4">{item.summary}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Link href="#" className="font-semibold text-primary hover:text-accent transition-colors">
                    Read More
                  </Link>
                  <Badge variant="outline">{item.category}</Badge>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
