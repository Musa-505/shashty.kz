
export interface FamilyMember {
  id: string;
  name: string;
  parents: string[];
}

// Мысал ретінде тармақталған шежіре
export const familyMembers: FamilyMember[] = [
  // 1-ші буын
  { id: '1', name: 'Негізгі Ата', parents: [] },

  // 2-ші буын - Негізгі Атаның балалары
  { id: '2', name: 'Бірінші Ұлы', parents: ['1'] },
  { id: '3', name: 'Екінші Ұлы', parents: ['1'] },
  { id: '4', name: 'Үшінші Ұлы', parents: ['1'] },

  // 3-ші буын - Немерелері
  { id: '5', name: 'Біріншінің жалғыз ұлы', parents: ['2'] },
  { id: '6', name: 'Екіншінің бірінші ұлы', parents: ['3'] },
  { id: '7', name: 'Екіншінің екінші ұлы', parents: ['3'] },
  { id: '8', name: 'Үшіншінің бірінші ұлы', parents: ['4'] },
  { id: '9', name: 'Үшіншінің екінші ұлы', parents: ['4'] },
  { id: '10', name: 'Үшіншінің үшінші ұлы', parents: ['4'] },
  
  // 4-ші буын - Шөберелері
  { id: '11', name: 'Екінші немеренің ұлы', parents: ['7'] },
  { id: '12', name: 'Төртінші немеренің ұлы', parents: ['9'] },
];
