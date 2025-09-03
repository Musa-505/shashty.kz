
export interface FamilyMember {
  id: string;
  name: string;
  surname: string;
  birthYear: number;
  gender: 'male' | 'female';
  parents: string[];
}

// Деректерден қыздар алынып тасталды, тек ұрпақ жалғастыратын аналар қалды.
export const familyMembers: FamilyMember[] = [
  // Негізгі ата-бабалар
  { id: '1', name: 'Бектілеу', surname: 'Ата', birthYear: 1650, gender: 'male', parents: [] },
  { id: '2', name: 'Бәйбіше', surname: 'Ана', birthYear: 1655, gender: 'female', parents: [] },

  // Бірінші ұрпақ (ұлдар)
  { id: '3', name: 'Ержігіт', surname: 'Бектілеуұлы', birthYear: 1680, gender: 'male', parents: ['1', '2'] },
  { id: '4', name: 'Келіншек', surname: 'Әйелі', birthYear: 1685, gender: 'female', parents: [] },
  { id: '5', name: 'Қармыс', surname: 'Бектілеуұлы', birthYear: 1682, gender: 'male', parents: ['1', '2'] },
  { id: '6', name: 'Жаңыл', surname: 'Әйелі', birthYear: 1688, gender: 'female', parents: [] },

  // Екінші ұрпақ (ұлдар)
  { id: '7', name: 'Нарбота', surname: 'Ержігітұлы', birthYear: 1710, gender: 'male', parents: ['3', '4'] },
  { id: '9', name: 'Дәулет', surname: 'Қармысұлы', birthYear: 1715, gender: 'male', parents: ['5', '6'] },
  { id: '10', name: 'Жұбайы', surname: 'Дәулеттің', birthYear: 1720, gender: 'female', parents: [] },

  // Үшінші ұрпақ (ұлдар)
  { id: '11', name: 'Батыр', surname: 'Дәулетұлы', birthYear: 1745, gender: 'male', parents: ['9', '10'] },
];

