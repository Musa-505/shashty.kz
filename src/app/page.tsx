
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Contact, FileText, Landmark, Users, GitBranch, HeartHandshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";

const featureCards = [
  {
    title: "Тарих",
    description: "Қазақстанның ғасырлар қойнауына саяхат.",
    href: "/history",
    icon: <Landmark className="w-8 h-8 text-primary" />,
  },
  {
    title: "Тұлғалар",
    description: "Ұлт тағдырын айқындаған адамдар туралы біліңіз.",
    href: "/people",
    icon: <Users className="w-8 h-8 text-primary" />,
  },
  {
    title: "Шежіре",
    description: "Қазақ ру-тайпаларының тармақталған жүйесін зерттеңіз.",
    href: "/genealogy",
    icon: <GitBranch className="w-8 h-8 text-primary" />,
  },
  {
    title: "Жаңалықтар",
    description: "Соңғы мәдени жаңалықтардан хабардар болыңыз.",
    href: "/news",
    icon: <FileText className="w-8 h-8 text-primary" />,
  },
   {
    title: "Мақалалар",
    description: "Мәдениет пен құндылықтар туралы терең мақалалар.",
    href: "/articles",
    icon: <BookOpen className="w-8 h-8 text-primary" />,
  },
  {
    title: "Үлес қосу",
    description: "Мәдени мұраны сақтауға атсалысыңыз.",
    href: "/contribute",
    icon: <HeartHandshake className="w-8 h-8 text-primary" />,
  },
  {
    title: "Байланыс",
    description: "Өз ойларыңыз бен ұсыныстарыңызбен бөлісіңіз.",
    href: "/contact",
    icon: <Contact className="w-8 h-8 text-primary" />,
  },
];

export default function Home() {
  return (
    <MainLayout>
        <div className="flex flex-col min-h-screen">
        <main className="flex-1">
            <section className="relative w-full pt-12 md:pt-24 lg:pt-32">
            <div className="absolute inset-0 -z-10">
                <Image
                src="https://picsum.photos/1920/1080"
                alt="Hero background"
                fill
                quality={80}
                className="object-cover opacity-20"
                data-ai-hint="traditional Kazakh patterns"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
            </div>
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-foreground">
                    Қазақстанның жанын ашыңыз
                    </h1>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Қазақтың бай тарихын, мәдениетін және шежіресін зерттеңіз. Shashty.kz – ұлы даланың жүрегіне апаратын қақпаңыз.
                    </p>
                </div>
                <div className="space-x-4">
                    <Button asChild size="lg">
                    <Link href="/history">
                        Зерттеуді бастау <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    </Button>
                </div>
                </div>
            </div>
            </section>

            <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featureCards.map((feature) => (
                    <Link href={feature.href} key={feature.title} className="group">
                    <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center gap-4">
                        {feature.icon}
                        <div>
                            <CardTitle className="font-headline">{feature.title}</CardTitle>
                            <CardDescription>{feature.description}</CardDescription>
                        </div>
                        </CardHeader>
                    </Card>
                    </Link>
                ))}
                </div>
            </div>
            </section>
        </main>
        </div>
    </MainLayout>
  );
}
