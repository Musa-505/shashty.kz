
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { articles } from "@/lib/placeholder-data";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export default function ArticlesPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Мақалалар</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Қазақ мәдениеті, дәстүрлері және ұлттық құндылықтары туралы тереңдетілген мақалалар.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.id} className="flex flex-col overflow-hidden group">
            <div className="relative h-56 w-full">
              <Link href={`/articles/${article.slug}`}>
                <Image
                  src={article.imageUrls[0]}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  data-ai-hint={article.imageHint}
                />
              </Link>
            </div>
            <CardHeader>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <CardTitle className="font-headline pt-2">
                 <Link href={`/articles/${article.slug}`}>
                    {article.title}
                </Link>
              </CardTitle>
              <CardDescription>{article.author} - {article.date}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground line-clamp-3">{article.summary}</p>
            </CardContent>
            <CardFooter>
               <Link href={`/articles/${article.slug}`} className="font-semibold text-primary group-hover:text-accent transition-colors">
                Толығырақ <ArrowRight className="inline-block w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"/>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
