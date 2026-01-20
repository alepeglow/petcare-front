export type PetHistoryCategory = 'Saúde' | 'Adoção' | 'Admin' | 'Sistema' | 'Clínica';

export type PetHistoryEvent = {
  id: string;
  title: string;
  description: string;
  dateTime: string; // "20/01/2025 15:30"
  category: PetHistoryCategory;
  icon: string; // nome do mat-icon
};

export const PET_HISTORY: Record<number, PetHistoryEvent[]> = {
  1: [
    { id: 'p1-6', title: 'Atualização de Cadastro', description: 'Peso e características revisadas durante check-up.', dateTime: '17/01/2025 14:30', category: 'Admin', icon: 'edit' },
    { id: 'p1-5', title: 'Vacina V10 - 1ª Dose', description: 'Aplicada conforme calendário de vacinação.', dateTime: '17/01/2025 09:40', category: 'Clínica', icon: 'vaccines' },
    { id: 'p1-4', title: 'Vermifugação', description: 'Dose administrada e registrada no sistema.', dateTime: '16/01/2025 10:20', category: 'Saúde', icon: 'medication' },
    { id: 'p1-3', title: 'Consulta Veterinária Inicial', description: 'Exame clínico geral realizado. Pet apresenta boa saúde.', dateTime: '15/01/2025 16:00', category: 'Clínica', icon: 'medical_services' },
    { id: 'p1-2', title: 'Triagem Inicial', description: 'Avaliação inicial e identificação de necessidades imediatas.', dateTime: '15/01/2025 15:10', category: 'Sistema', icon: 'task_alt' },
    { id: 'p1-1', title: 'Entrada no Abrigo', description: 'Pet chegou do resgate e foi acolhido pelo abrigo.', dateTime: '15/01/2025 14:30', category: 'Admin', icon: 'home' },
  ],

  2: [
    { id: 'p2-6', title: 'Contato Pós-Adoção', description: 'Check-in realizado com o tutor. Adaptação indo bem.', dateTime: '20/01/2025 09:10', category: 'Adoção', icon: 'phone' },
    { id: 'p2-5', title: 'Adoção Concluída', description: 'Adoção registrada e termo assinado.', dateTime: '19/01/2025 17:30', category: 'Adoção', icon: 'favorite' },
    { id: 'p2-4', title: 'Atualização de Cadastro', description: 'Revisão de dados e orientação pré-adoção.', dateTime: '18/01/2025 11:50', category: 'Admin', icon: 'edit' },
    { id: 'p2-3', title: 'Vacina V10 - 1ª Dose', description: 'Aplicada conforme calendário.', dateTime: '16/01/2025 09:40', category: 'Clínica', icon: 'vaccines' },
    { id: 'p2-2', title: 'Vermifugação', description: 'Dose aplicada e registrada.', dateTime: '14/01/2025 10:20', category: 'Saúde', icon: 'medication' },
    { id: 'p2-1', title: 'Entrada no Abrigo', description: 'Pet acolhido e cadastrado no sistema.', dateTime: '03/11/2024 14:30', category: 'Admin', icon: 'home' },
  ],

  3: [
    { id: 'p3-6', title: 'Atualização de Cadastro', description: 'Peso e cor confirmados em revisão.', dateTime: '18/01/2025 16:20', category: 'Admin', icon: 'edit' },
    { id: 'p3-5', title: 'Vacina V10 - 1ª Dose', description: 'Aplicada conforme calendário.', dateTime: '17/01/2025 09:10', category: 'Clínica', icon: 'vaccines' },
    { id: 'p3-4', title: 'Vermifugação', description: 'Dose administrada e registrada.', dateTime: '16/01/2025 10:20', category: 'Saúde', icon: 'medication' },
    { id: 'p3-3', title: 'Consulta Veterinária Inicial', description: 'Avaliação geral. Sem alterações clínicas.', dateTime: '15/01/2025 16:00', category: 'Clínica', icon: 'medical_services' },
    { id: 'p3-2', title: 'Triagem Inicial', description: 'Check-list de saúde e comportamento.', dateTime: '15/01/2025 15:10', category: 'Sistema', icon: 'task_alt' },
    { id: 'p3-1', title: 'Entrada no Abrigo', description: 'Pet acolhido e cadastrado.', dateTime: '10/01/2025 14:30', category: 'Admin', icon: 'home' },
  ],

  4: [
    { id: 'p4-6', title: 'Atualização de Cadastro', description: 'Ajustes em características e observações.', dateTime: '13/02/2025 11:00', category: 'Admin', icon: 'edit' },
    { id: 'p4-5', title: 'Vacina V10 - 1ª Dose', description: 'Aplicada conforme calendário.', dateTime: '12/02/2025 09:30', category: 'Clínica', icon: 'vaccines' },
    { id: 'p4-4', title: 'Vermifugação', description: 'Dose aplicada e registrada.', dateTime: '11/02/2025 10:20', category: 'Saúde', icon: 'medication' },
    { id: 'p4-3', title: 'Consulta Veterinária Inicial', description: 'Exame clínico geral realizado.', dateTime: '10/02/2025 16:00', category: 'Clínica', icon: 'medical_services' },
    { id: 'p4-2', title: 'Triagem Inicial', description: 'Avaliação inicial e cuidados recomendados.', dateTime: '09/02/2025 15:10', category: 'Sistema', icon: 'task_alt' },
    { id: 'p4-1', title: 'Entrada no Abrigo', description: 'Pet acolhido e cadastrado.', dateTime: '08/02/2025 14:30', category: 'Admin', icon: 'home' },
  ],

  5: [
    { id: 'p5-6', title: 'Atualização de Cadastro', description: 'Observações de comportamento e treino revisadas.', dateTime: '17/01/2025 10:45', category: 'Admin', icon: 'edit' },
    { id: 'p5-5', title: 'Vacina V10 - Reforço', description: 'Reforço aplicado conforme calendário.', dateTime: '16/01/2025 09:15', category: 'Clínica', icon: 'vaccines' },
    { id: 'p5-4', title: 'Vermifugação', description: 'Dose registrada no sistema.', dateTime: '15/01/2025 10:20', category: 'Saúde', icon: 'medication' },
    { id: 'p5-3', title: 'Consulta Veterinária Inicial', description: 'Avaliação geral. Pet ativo e saudável.', dateTime: '14/01/2025 16:00', category: 'Clínica', icon: 'medical_services' },
    { id: 'p5-2', title: 'Triagem Inicial', description: 'Check-list e plano de rotina.', dateTime: '14/01/2025 15:10', category: 'Sistema', icon: 'task_alt' },
    { id: 'p5-1', title: 'Entrada no Abrigo', description: 'Pet acolhido e cadastrado.', dateTime: '12/12/2024 14:30', category: 'Admin', icon: 'home' },
  ],

  6: [
    { id: 'p6-6', title: 'Contato Pós-Adoção', description: 'Retorno do tutor: adaptação tranquila.', dateTime: '16/01/2025 08:30', category: 'Adoção', icon: 'phone' },
    { id: 'p6-5', title: 'Adoção Concluída', description: 'Adoção registrada e termo assinado.', dateTime: '15/01/2025 18:10', category: 'Adoção', icon: 'favorite' },
    { id: 'p6-4', title: 'Atualização de Cadastro', description: 'Orientações finais e revisão de dados.', dateTime: '14/01/2025 12:10', category: 'Admin', icon: 'edit' },
    { id: 'p6-3', title: 'Vacina V10 - 1ª Dose', description: 'Aplicada conforme calendário.', dateTime: '12/01/2025 09:40', category: 'Clínica', icon: 'vaccines' },
    { id: 'p6-2', title: 'Vermifugação', description: 'Dose registrada no sistema.', dateTime: '10/01/2025 10:20', category: 'Saúde', icon: 'medication' },
    { id: 'p6-1', title: 'Entrada no Abrigo', description: 'Pet acolhida e cadastrada.', dateTime: '25/09/2024 14:30', category: 'Admin', icon: 'home' },
  ],

  7: [
    { id: 'p7-6', title: 'Atualização de Cadastro', description: 'Peso e características revisadas.', dateTime: '18/01/2025 13:15', category: 'Admin', icon: 'edit' },
    { id: 'p7-5', title: 'Vacina V4 - 1ª Dose', description: 'Aplicada conforme calendário felino.', dateTime: '17/01/2025 09:40', category: 'Clínica', icon: 'vaccines' },
    { id: 'p7-4', title: 'Vermifugação', description: 'Dose administrada e registrada.', dateTime: '16/01/2025 10:20', category: 'Saúde', icon: 'medication' },
    { id: 'p7-3', title: 'Consulta Veterinária Inicial', description: 'Avaliação clínica geral realizada.', dateTime: '15/01/2025 16:00', category: 'Clínica', icon: 'medical_services' },
    { id: 'p7-2', title: 'Triagem Inicial', description: 'Observação de comportamento e rotina.', dateTime: '15/01/2025 15:10', category: 'Sistema', icon: 'task_alt' },
    { id: 'p7-1', title: 'Entrada no Abrigo', description: 'Pet acolhida e cadastrada.', dateTime: '05/01/2025 14:30', category: 'Admin', icon: 'home' },
  ],

  8: [
    { id: 'p8-6', title: 'Atualização de Cadastro', description: 'Revisão de porte e peso.', dateTime: '17/01/2025 15:05', category: 'Admin', icon: 'edit' },
    { id: 'p8-5', title: 'Vacina V4 - Reforço', description: 'Reforço aplicado conforme calendário.', dateTime: '16/01/2025 09:30', category: 'Clínica', icon: 'vaccines' },
    { id: 'p8-4', title: 'Vermifugação', description: 'Dose registrada no sistema.', dateTime: '15/01/2025 10:20', category: 'Saúde', icon: 'medication' },
    { id: 'p8-3', title: 'Consulta Veterinária Inicial', description: 'Avaliação geral. Pet saudável.', dateTime: '14/01/2025 16:00', category: 'Clínica', icon: 'medical_services' },
    { id: 'p8-2', title: 'Triagem Inicial', description: 'Check-list e observação.', dateTime: '14/01/2025 15:10', category: 'Sistema', icon: 'task_alt' },
    { id: 'p8-1', title: 'Entrada no Abrigo', description: 'Pet acolhido e cadastrado.', dateTime: '18/08/2024 14:30', category: 'Admin', icon: 'home' },
  ],

  9: [
    { id: 'p9-6', title: 'Atualização de Cadastro', description: 'Revisão de comportamento e rotina.', dateTime: '26/02/2025 09:40', category: 'Admin', icon: 'edit' },
    { id: 'p9-5', title: 'Vacina V4 - 1ª Dose', description: 'Aplicada conforme calendário felino.', dateTime: '25/02/2025 09:35', category: 'Clínica', icon: 'vaccines' },
    { id: 'p9-4', title: 'Vermifugação', description: 'Dose registrada no sistema.', dateTime: '24/02/2025 10:20', category: 'Saúde', icon: 'medication' },
    { id: 'p9-3', title: 'Consulta Veterinária Inicial', description: 'Exame clínico geral realizado.', dateTime: '16/01/2025 16:00', category: 'Clínica', icon: 'medical_services' },
    { id: 'p9-2', title: 'Triagem Inicial', description: 'Check-list e observação.', dateTime: '23/02/2025 15:10', category: 'Sistema', icon: 'task_alt' },
    { id: 'p9-1', title: 'Entrada no Abrigo', description: 'Pet acolhida e cadastrada.', dateTime: '22/02/2025 14:30', category: 'Admin', icon: 'home' },
  ],

  10: [
    { id: 'p10-6', title: 'Atualização de Cadastro', description: 'Revisão de dados e observações.', dateTime: '16/01/2025 17:00', category: 'Admin', icon: 'edit' },
    { id: 'p10-5', title: 'Vacina V4 - Reforço', description: 'Reforço aplicado conforme calendário.', dateTime: '15/01/2025 09:30', category: 'Clínica', icon: 'vaccines' },
    { id: 'p10-4', title: 'Vermifugação', description: 'Dose registrada no sistema.', dateTime: '14/01/2025 10:20', category: 'Saúde', icon: 'medication' },
    { id: 'p10-3', title: 'Consulta Veterinária Inicial', description: 'Avaliação clínica geral realizada.', dateTime: '13/01/2025 16:00', category: 'Clínica', icon: 'medical_services' },
    { id: 'p10-2', title: 'Triagem Inicial', description: 'Check-list e observação.', dateTime: '13/01/2025 15:10', category: 'Sistema', icon: 'task_alt' },
    { id: 'p10-1', title: 'Entrada no Abrigo', description: 'Pet acolhido e cadastrado.', dateTime: '10/07/2024 14:30', category: 'Admin', icon: 'home' },
  ],

  11: [
    { id: 'p11-6', title: 'Contato Pós-Adoção', description: 'Tutor informou boa adaptação e rotina definida.', dateTime: '19/03/2025 12:10', category: 'Adoção', icon: 'phone' },
    { id: 'p11-5', title: 'Adoção Concluída', description: 'Adoção registrada e termo assinado.', dateTime: '18/03/2025 18:00', category: 'Adoção', icon: 'favorite' },
    { id: 'p11-4', title: 'Atualização de Cadastro', description: 'Revisão final antes da adoção.', dateTime: '17/03/2025 11:40', category: 'Admin', icon: 'edit' },
    { id: 'p11-3', title: 'Vacina V4 - 1ª Dose', description: 'Aplicada conforme calendário felino.', dateTime: '16/03/2025 09:30', category: 'Clínica', icon: 'vaccines' },
    { id: 'p11-2', title: 'Vermifugação', description: 'Dose registrada no sistema.', dateTime: '15/03/2025 10:20', category: 'Saúde', icon: 'medication' },
    { id: 'p11-1', title: 'Entrada no Abrigo', description: 'Pet acolhida e cadastrada.', dateTime: '14/03/2025 14:30', category: 'Admin', icon: 'home' },
  ],

  12: [
    { id: 'p12-6', title: 'Atualização de Cadastro', description: 'Revisão de temperamento e hábitos.', dateTime: '17/01/2025 14:55', category: 'Admin', icon: 'edit' },
    { id: 'p12-5', title: 'Vacina V4 - Reforço', description: 'Reforço aplicado conforme calendário.', dateTime: '16/01/2025 09:30', category: 'Clínica', icon: 'vaccines' },
    { id: 'p12-4', title: 'Vermifugação', description: 'Dose registrada no sistema.', dateTime: '15/01/2025 10:20', category: 'Saúde', icon: 'medication' },
    { id: 'p12-3', title: 'Consulta Veterinária Inicial', description: 'Avaliação geral realizada. Sem alterações.', dateTime: '14/01/2025 16:00', category: 'Clínica', icon: 'medical_services' },
    { id: 'p12-2', title: 'Triagem Inicial', description: 'Check-list e observação.', dateTime: '14/01/2025 15:10', category: 'Sistema', icon: 'task_alt' },
    { id: 'p12-1', title: 'Entrada no Abrigo', description: 'Pet acolhido e cadastrado.', dateTime: '29/10/2024 14:30', category: 'Admin', icon: 'home' },
  ],
};

export function getHistoryByPetId(id: number): PetHistoryEvent[] {
  return PET_HISTORY[id] ?? [];
}
