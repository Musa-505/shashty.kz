
import { articles } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { Metadata } from 'next';
import { Badge } from "@/components/ui/badge";
import { User, Calendar } from "lucide-react";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articles.find(a => a.slug === params.slug);

  if (!article) {
    return {
      title: 'Мақала табылмады',
    };
  }

  return {
    title: `${article.title} | Shashty.kz`,
    description: article.summary,
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find(a => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <div className="flex justify-center flex-wrap gap-2 mb-4">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline mb-4">{article.title}</h1>
          <div className="flex justify-center items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
          </div>
        </header>

        <Card className="mb-8 overflow-hidden">
            <Carousel className="w-full">
            <CarouselContent>
                {article.imageUrls.map((url, index) => (
                <CarouselItem key={index}>
                    <div className="relative aspect-video w-full">
                    <Image
                        src={url}
                        alt={`${article.title} суреті ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        data-ai-hint={article.imageHint}
                    />
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            {article.imageUrls.length > 1 && (
                <>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
                </>
            )}
            </Carousel>
        </Card>

        <div className="prose prose-lg dark:prose-invert max-w-none">
            {article.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
        </div>
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return articles.map(article => ({
    slug: article.slug,
  }));
}
