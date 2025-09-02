
import { newsItems } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { Metadata } from 'next';
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = newsItems.find(n => n.slug === params.slug);

  if (!item) {
    return {
      title: 'Жаңалық табылмады',
    };
  }

  return {
    title: `${item.title} | Shashty.kz`,
    description: item.summary,
  };
}

export default function NewsItemPage({ params }: { params: { slug: string } }) {
  const item = newsItems.find(n => n.slug === params.slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-4">
              <Badge variant="outline">{item.category}</Badge>
              <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{item.date}</span>
              </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">{item.title}</h1>
        </header>

        <Card className="mb-8 overflow-hidden">
            <Carousel className="w-full">
            <CarouselContent>
                {item.imageUrls.map((url, index) => (
                <CarouselItem key={index}>
                    <div className="relative aspect-video w-full">
                    <Image
                        src={url}
                        alt={`${item.title} суреті ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        data-ai-hint={item.imageHint}
                    />
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            {item.imageUrls.length > 1 && (
                <>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
                </>
            )}
            </Carousel>
        </Card>

        <div className="prose prose-lg dark:prose-invert max-w-none">
            {item.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
        </div>
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return newsItems.map(item => ({
    slug: item.slug,
  }));
}
