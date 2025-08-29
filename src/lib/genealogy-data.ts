
export interface Person {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
  children?: Person[];
}

export const genealogyData: Person = {
  id: "janybek-khan",
  name: "Жәнібек хан",
  title: "Қазақ хандығының негізін қалаушы",
  imageUrl: "https://picsum.photos/150/150?random=10",
  children: [
    {
      id: "kasym-khan",
      name: "Қасым хан",
      title: "Жәнібектің ұлы",
      imageUrl: "https://picsum.photos/150/150?random=11",
      children: [
        {
          id: "khaknazar-khan",
          name: "Хақназар хан",
          title: "Қасымның ұлы",
          imageUrl: "https://picsum.photos/150/150?random=12",
          children: [
            {
              id: "shyghay-khan",
              name: "Шығай хан",
              title: "Хақназардың ұлы",
              imageUrl: "https://picsum.photos/150/150?random=13",
            },
          ],
        },
        {
          id: "mamash-khan",
          name: "Мамаш хан",
          title: "Қасымның ұлы",
          imageUrl: "https://picsum.photos/150/150?random=14",
        },
      ],
    },
    {
      id: "adik-sultan",
      name: "Әдік сұлтан",
      title: "Жәнібектің ұлы",
      imageUrl: "https://picsum.photos/150/150?random=15",
       children: [
        {
          id: "tahyr-khan",
          name: "Тахир хан",
          title: "Әдіктің ұлы",
          imageUrl: "https://picsum.photos/150/150?random=16",
        },
      ],
    },
  ],
};