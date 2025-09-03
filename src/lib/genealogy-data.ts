
export interface Person {
  id: string;
  name: string;
  children?: Person[];
}

export const genealogyData: Person = {
  id: "alash",
  name: "Алаш",
  children: [
    {
      id: "orta-juz",
      name: "Орта жүз",
      children: [
        { id: "oshakty", name: "Ошақты" },
        { id: "alban", name: "Албан" },
        { id: "suan", name: "Суан" },
        { id: "dulat", name: "Дулат" },
      ],
    },
    {
      id: "kishi-juz",
      name: "Кіші жүз",
      children: [
        { id: "kayirbay-karakosek", name: "Қайырбай-Қаракөсек" },
        {
          id: "bayuly",
          name: "Байұлы",
          children: [
            { id: "sherkesh", name: "Шеркеш" },
            { id: "ysyk", name: "Ысық" },
            { id: "maskar", name: "Масқар" },
            { id: "baybakty", name: "Байбақты" },
            { id: "alasha", name: "Алаша" },
            { id: "kyzylkurt", name: "Қызылқұрт" },
            { id: "tana", name: "Тана" },
            { id: "berish", name: "Беріш" },
            { id: "esentemir", name: "Есентемір" },
            { id: "taz", name: "Таз" },
            { id: "jappas", name: "Жаппас" },
            { id: "altyn", name: "Алтын" },
            { id: "aday", name: "Адай" },
          ],
        },
        {
          id: "jetiru",
          name: "Жетіру",
        },
      ],
    },
    {
      id: "juzden-tys",
      name: "Жүзден тыс",
    },
  ],
};
