
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Info, Lightbulb, Handshake, ArrowRight } from "lucide-react";
import Link from "next/link";

const contributionOptions = [
    {
        icon: <DollarSign className="w-10 h-10 text-primary" />,
        title: "Қаржылай қолдау",
        description: "Қордың жобаларын жүзеге асыруға және дамытуға көмектесіңіз. Сіздің әрбір үлесіңіз маңызды.",
        details: "Банк: Halyk Bank\nБСН/ЖСН: 123456789012\nЕсеп-шот: KZ123456789012345678",
    },
    {
        icon: <Info className="w-10 h-10 text-primary" />,
        title: "Ақпаратпен бөлісу",
        description: "Тарихи деректер, шежіре немесе маңызды оқиғалар туралы білетін болсаңыз, бізбен бөлісіңіз.",
        button: {
            text: "Ақпарат ұсыну",
            note: "(FAB батырмасын басыңыз)"
        }
    },
    {
        icon: <Lightbulb className="w-10 h-10 text-primary" />,
        title: "Ұсыныс жасау",
        description: "Сайтты немесе қордың жұмысын жақсарту бойынша идеяларыңыз бен ұсыныстарыңызды білдіріңіз.",
         button: {
            text: "Байланыс бетіне өту",
            href: "/contact"
        }
    }
]

export default function ContributePage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="space-y-4 text-center mb-12">
            <Handshake className="w-16 h-16 mx-auto text-primary" />
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Қорға үлес қосыңыз</h1>
            <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl">
                Қазақ халқының тарихы мен мәдениетін сақтап, болашақ ұрпаққа жеткізу – ортақ парызымыз. Сіздің қолдауыңыз біз үшін өте маңызды.
            </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {contributionOptions.map((option, index) => (
                 <Card key={index} className="flex flex-col text-center items-center shadow-lg p-6">
                    <div className="mb-4">{option.icon}</div>
                    <CardHeader className="p-0">
                        <CardTitle className="font-headline text-2xl">{option.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow pt-4">
                        <p className="text-muted-foreground">{option.description}</p>
                        {option.details && (
                             <div className="mt-4 p-4 bg-muted/50 rounded-lg text-sm text-left">
                                <h4 className="font-semibold mb-2">Реквизиттер:</h4>
                                <pre className="whitespace-pre-wrap font-sans">{option.details}</pre>
                            </div>
                        )}
                    </CardContent>
                    {option.button && (
                        <div className="mt-auto w-full">
                            {option.button.href ? (
                                <Button asChild className="w-full">
                                    <Link href={option.button.href}>
                                        {option.button.text} <ArrowRight className="ml-2 w-4 h-4"/>
                                    </Link>
                                </Button>
                            ) : (
                                <div className="text-center">
                                    <p className="text-sm font-semibold">{option.button.text}</p>
                                    <p className="text-xs text-muted-foreground">{option.button.note}</p>
                                </div>
                            )}
                        </div>
                    )}
                </Card>
            ))}
        </div>
    </div>
  );
}
