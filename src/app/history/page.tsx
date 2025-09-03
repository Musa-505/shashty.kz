
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { MainLayout } from "@/components/layout/main-layout";

const historySections = [
    {
        title: "Ежелгі тамырлар",
        era: "V ғасырға дейін",
        content: "Қазіргі Қазақстан аумағы палеолит дәуірінен бері мекенделген. Ол «Алтын адам» сияқты бай археологиялық мұра қалдырған сақтар мен скифтер сияқты көшпелі мәдениеттердің бесігі болды. Бұл ертедегі тайпалар атқа міну шеберлігімен және күрделі металл өңдеуімен танымал болған.",
        imageUrl: "https://picsum.photos/800/600?random=1",
        imageHint: "ancient artifacts"
    },
    {
        title: "Ұлы Түрік қағанаты",
        era: "VI - VIII ғасырлар",
        content: "Түрік қағанаты Орталық Азияны алып жатқан, түркі тайпаларын біріктірген кең байтақ империя болды. Бұл кезең түркі мәдениеті мен тілінің шоғырлануымен ерекшеленді, бұл көптеген қазіргі түркі халықтарының, соның ішінде қазақтардың негізін қалады. Олардың бақылауында Ұлы Жібек жолы гүлденіп, сауда мен мәдени алмасуға ықпал етті.",
        imageUrl: "https://picsum.photos/800/600?random=2",
        imageHint: "steppe landscape"
    },
    {
        title: "Алтын Орда және Қазақ хандығының көтерілуі",
        era: "XIII - XV ғасырлар",
        content: "Моңғол шапқыншылығынан кейін бұл аумақ Алтын Орданың құрамына кірді. Орда әлсіреген кезде, жергілікті көшбасшылар Жәнібек пен Керей хан 1465 жылы Қазақ хандығын құрды. Бұл оқиға қазақ мемлекеттілігінің дүниеге келуі болып саналады, ол үш негізгі жүзді біріктіріп, ерекше қазақ бірегейлігін орнатты.",
        imageUrl: "https://picsum.photos/800/600?random=3",
        imageHint: "historical monument"
    },
    {
        title: "Сынақтар дәуірі және Ресей ықпалы",
        era: "XVIII - XX ғасырлар",
        content: "Жоңғар басқыншыларының қаупіне тап болған қазақ хандары Ресей империясынан қорғаныс іздеді. Бұл империяға біртіндеп қосылуға әкелді. 20 ғасыр 1930 жылдардағы ашаршылық пен Кеңес өкіметі тұсындағы саяси қуғын-сүргінді қоса алғанда, сонымен бірге индустрияландыру мен жаңғыртуды да алып келді.",
        imageUrl: "https://picsum.photos/800/600?random=4",
        imageHint: "old city"
    },
    {
        title: "Тәуелсіздік және қазіргі Қазақстан",
        era: "1991 - қазіргі уақыт",
        content: "Қазақстан 1991 жылы 16 желтоқсанда Кеңес Одағының ыдырауынан кейін тәуелсіздігін жариялады. Содан бері ұлт посткеңестік кезеңнің күрделіліктерін еңсеріп, өзінің бай табиғи ресурстарын дамытып, Астанада (қазіргі Нұр-Сұлтан) жаңа астана құрып, жаһандық аренада егеменді ұлт ретінде өз орнын алды.",
        imageUrl: "https://picsum.photos/800/600?random=5",
        imageHint: "modern architecture"
    }
];

export default function HistoryPage() {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12 md:px-6">
                <div className="space-y-4 text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Қазақ тарихына саяхат</h1>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                        Ежелгі көшпенділерден қазіргі егеменді мемлекетке дейін – Қазақстанды қалыптастырған шешуші сәттерді зерттеңіз.
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
        </MainLayout>
    );
}
