
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone, User } from "lucide-react";
import Image from "next/image";

const contactPeople = [
  {
    name: "Асқарбеков Нұрлан",
    role: "Қор төрағасы",
    phone: "+7 (701) 123-45-67",
  },
  {
    name: "Серікұлы Арман",
    role: "Бас редактор",
    phone: "+7 (707) 987-65-43",
  },
];

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Бізбен байланыс</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Сұрақтарыңыз немесе ұсыныстарыңыз болса, бізге хабарласыңыз.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Байланыс ақпараты</CardTitle>
              <CardDescription>
                Төмендегі тұлғалармен немесе электрондық пошта арқылы хабарласа аласыз.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {contactPeople.map((person) => (
                <div key={person.name} className="flex items-start gap-4">
                  <User className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">{person.name}</h3>
                    <p className="text-sm text-muted-foreground">{person.role}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${person.phone}`} className="text-sm hover:underline">
                        {person.phone}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Электрондық пошта</h3>
                  <a href="mailto:info@shashty.kz" className="text-sm hover:underline">
                    info@shashty.kz
                  </a>
                </div>
              </div>
               <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Мекенжай</h3>
                  <p className="text-sm text-muted-foreground">
                    Алматы қаласы, Абай даңғылы, 123-үй
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="shadow-lg overflow-hidden h-full">
            <div className="relative h-full min-h-[400px]">
              <Image
                src="https://picsum.photos/800/600?random=42"
                alt="Карта"
                fill
                className="object-cover"
                data-ai-hint="city map"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
