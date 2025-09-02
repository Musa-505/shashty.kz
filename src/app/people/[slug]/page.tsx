
import { notableFigures } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const person = notableFigures.find(p => p.slug === params.slug);

  if (!person) {
    return {
      title: 'Тұлға табылмады',
    };
  }

  return {
    title: `${person.name} | Shashty.kz`,
    description: person.biography.substring(0, 160),
  };
}


export default function PersonProfilePage({ params }: { params: { slug: string } }) {
  const person = notableFigures.find(p => p.slug === params.slug);

  if (!person) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-1">
          <Card className="sticky top-24">
             <Carousel className="w-full">
              <CarouselContent>
                {person.imageUrls.map((url, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-w-1 aspect-h-1 w-full">
                      <Image
                        src={url}
                        alt={`${person.name} суреті ${index + 1}`}
                        width={400}
                        height={400}
                        className="rounded-t-lg object-cover w-full"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {person.imageUrls.length > 1 && (
                <>
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
                </>
              )}
            </Carousel>
            <CardHeader>
              <CardTitle className="font-headline text-3xl text-center">{person.name}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Өмірбаяны</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg dark:prose-invert max-w-none">
              <p>{person.biography}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return notableFigures.map(person => ({
    slug: person.slug,
  }));
}
