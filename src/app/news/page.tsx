
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { newsItems } from "@/lib/placeholder-data";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Жаңалықтар мен хабарландырулар</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Қазақ мәдениеті, мұра оқиғалары және тарихи жаңалықтар туралы соңғы жаңалықтар.
        </p>
      </div>

      <div className="space-y-8">
        {newsItems.map((item) => (
          <Card key={item.id} className="w-full overflow-hidden transition-shadow hover:shadow-lg">
             <Link href={`/news/${item.slug}`} className="grid md:grid-cols-3 group">
                <div className="md:col-span-1 relative h-64 md:h-full min-h-[200px]">
                    <Image
                    src={item.imageUrls[0]}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    data-ai-hint={item.imageHint}
                    />
                </div>
                <div className="md:col-span-2 flex flex-col">
                    <CardHeader>
                    <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{item.title}</CardTitle>
                    <CardDescription>{item.date}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                    <p className="text-muted-foreground line-clamp-4">{item.summary}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                    <span className="font-semibold text-primary group-hover:text-accent transition-colors">
                        Толығырақ
                    </span>
                    <Badge variant="outline">{item.category}</Badge>
                    </CardFooter>
                </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
