export type PetCareType = 'VACINA' | 'CONSULTA' | 'VERMIFUGO' | 'BANHO' | 'TOSA';

export type PetCareItem = {
  id: string;
  type: PetCareType;
  date: string;          // "15/01/2025"
  description?: string;  // opcional
  icon: string;          // mat-icon
};

export const PET_CARE: Record<number, PetCareItem[]> = {
  1: [
    { id: 'c1-5', type: 'VACINA', date: '17/01/2025', description: 'V10 - 1ª dose', icon: 'vaccines' },
    { id: 'c1-4', type: 'VERMIFUGO', date: '16/01/2025', description: 'Dose registrada', icon: 'healing' },
    { id: 'c1-3', type: 'CONSULTA', date: '15/01/2025', description: 'Check-up inicial', icon: 'medical_services' },
    { id: 'c1-2', type: 'BANHO', date: '14/01/2025', description: 'Banho completo', icon: 'bathtub' },
    { id: 'c1-1', type: 'TOSA', date: '13/01/2025', description: 'Tosa higiênica', icon: 'content_cut' },
  ],
  2: [
    { id: 'c2-3', type: 'VACINA', date: '16/01/2025', description: 'V10 - 1ª dose', icon: 'vaccines' },
    { id: 'c2-2', type: 'VERMIFUGO', date: '14/01/2025', description: 'Dose registrada', icon: 'healing' },
    { id: 'c2-1', type: 'CONSULTA', date: '12/01/2025', description: 'Avaliação inicial', icon: 'medical_services' },
  ],
};

// fallback: se não tiver, retorna []
export function getCareByPetId(id: number): PetCareItem[] {
  if (PET_CARE[id]) return PET_CARE[id];

  // fallback automático pra não ficar vazio
  return [
    { id: `auto-${id}-3`, type: 'VACINA', date: '10/01/2025', description: 'Registro de vacina', icon: 'vaccines' },
    { id: `auto-${id}-2`, type: 'CONSULTA', date: '08/01/2025', description: 'Avaliação de rotina', icon: 'medical_services' },
    { id: `auto-${id}-1`, type: 'BANHO', date: '05/01/2025', description: 'Banho completo', icon: 'bathtub' },
  ];
}

