
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const historySections = [
    {
        title: "Ancient Roots",
        era: "Before 5th Century",
        content: "The territory of modern Kazakhstan has been inhabited since the Paleolithic era. It served as a cradle for nomadic cultures like the Sakas and Scythians, who left behind a rich archaeological heritage, including the famous 'Golden Man'. These early tribes were known for their equestrian skills and sophisticated metalwork.",
        imageUrl: "https://picsum.photos/800/600?random=1",
        imageHint: "ancient artifacts"
    },
    {
        title: "The Great Turkic Khaganate",
        era: "6th - 8th Centuries",
        content: "The Turkic Khaganate was a vast empire that stretched across Central Asia, uniting various Turkic tribes. This period marked the consolidation of Turkic culture and language, laying the foundation for many modern Turkic nations, including the Kazakhs. The Silk Road flourished under their control, fostering trade and cultural exchange.",
        imageUrl: "https://picsum.photos/800/600?random=2",
        imageHint: "steppe landscape"
    },
    {
        title: "The Golden Horde and the Rise of the Kazakh Khanate",
        era: "13th - 15th Centuries",
        content: "Following the Mongol invasions, the territory became part of the Golden Horde. As the Horde weakened, local leaders Janibek and Kerei Khan founded the Kazakh Khanate in 1465. This event is considered the birth of Kazakh statehood, uniting the three main juzes (hordes) and establishing a distinct Kazakh identity.",
        imageUrl: "https://picsum.photos/800/600?random=3",
        imageHint: "historical monument"
    },
    {
        title: "Era of Trials and Russian Influence",
        era: "18th - 20th Centuries",
        content: "Facing threats from Dzungar invaders, the Kazakh khans sought protection from the Russian Empire. This led to a gradual absorption into the empire. The 20th century brought immense hardship, including the devastating famine of the 1930s (Asharshylyq) and political repression under Soviet rule, but also industrialization and modernization.",
        imageUrl: "https://picsum.photos/800/600?random=4",
        imageHint: "old city"
    },
    {
        title: "Independence and Modern Kazakhstan",
        era: "1991 - Present",
        content: "Kazakhstan declared independence on December 16, 1991, following the dissolution of the Soviet Union. Since then, the nation has navigated the complexities of post-Soviet transition, developing its vast natural resources, establishing a new capital in Astana (now Nur-Sultan), and forging its place on the global stage as a sovereign nation.",
        imageUrl: "https://picsum.photos/800/600?random=5",
        imageHint: "modern architecture"
    }
];

export default function HistoryPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="space-y-4 text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">A Journey Through Kazakh History</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    From ancient nomads to a modern sovereign state, explore the pivotal moments that have shaped Kazakhstan.
                </p>
            </div>

            <div className="relative pl-6 space-y-12 before:absolute before:top-0 before:left-8 before:h-full before:w-1 before:bg-border before:-translate-x-1/2">
                {historySections.map((section, index) => (
                    <div key={index} className="relative flex items-start gap-6">
                         <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg -translate-x-1/2 transform -left-1">
                            {index + 1}
                        </div>
                        <Card className="w-full">
                            <CardContent className="p-0">
                                <div className="grid md:grid-cols-2">
                                    <div className="p-6">
                                        <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">{section.era}</h3>
                                        <h2 className="text-2xl font-headline font-bold mt-1 mb-3">{section.title}</h2>
                                        <p className="text-muted-foreground">{section.content}</p>
                                    </div>
                                    <div className="relative min-h-[200px] md:min-h-0">
                                         <Image
                                            src={section.imageUrl}
                                            alt={section.title}
                                            fill
                                            className="object-cover rounded-r-lg"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            data-ai-hint={section.imageHint}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
