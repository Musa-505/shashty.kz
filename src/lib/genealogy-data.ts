
export interface FamilyMember {
  id: string;
  name: string;
  gender: 'male' | 'female';
  parents: string[];
}

// Мысал ретінде 10 атадан тұратын тізім
export const familyMembers: FamilyMember[] = [
  { id: '1', name: 'Бірінші Ата', gender: 'male', parents: [] },
  { id: '2', name: 'Екінші Ата', gender: 'male', parents: ['1'] },
  { id: '3', name: 'Үшінші Ата', gender: 'male', parents: ['2'] },
  { id: '4', name: 'Төртінші Ата', gender: 'male', parents: ['3'] },
  { id: '5', name: 'Бесінші Ата', gender: 'male', parents: ['4'] },
  { id: '6', name: 'Алтыншы Ата', gender: 'male', parents: ['5'] },
  { id: '7', name: 'Жетінші Ата', gender: 'male', parents: ['6'] },
  { id: '8', name: 'Сегізінші Ата', gender: 'male', parents: ['7'] },
  { id: '9', name: 'Тоғызыншы Ата', gender: 'male', parents: ['8'] },
  { id: '10', name: 'Оныншы Ата', gender: 'male', parents: ['9'] },
];
