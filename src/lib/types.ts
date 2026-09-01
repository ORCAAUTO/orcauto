export type Role = 'cliente' | 'oficina'
export type RequestStatus = 'aberta' | 'recebendo_orcamentos' | 'orcamento_aceito' | 'em_servico' | 'concluida' | 'cancelada'
export type BudgetStatus = 'enviado' | 'aceito' | 'recusado' | 'cancelado'
export type ServiceStatus = 'aguardando' | 'agendado' | 'em_andamento' | 'aguardando_peca' | 'concluido' | 'cancelado'

export type Profile = { id: string; nome: string; telefone: string | null; role: Role; avatar_url: string | null }
export type Vehicle = { id: string; usuario_id: string; marca: string; modelo: string; ano: number; placa: string | null; cor: string | null; quilometragem: number | null; observacoes: string | null }
export type Workshop = { id: string; usuario_id: string; nome_fantasia: string; descricao: string | null; cidade: string; estado: string; telefone: string | null; whatsapp: string | null; ativa: boolean; verificada: boolean; logo_url: string | null }
export type Request = { id: string; usuario_id: string; veiculo_id: string; titulo: string; descricao: string; categoria: string | null; urgencia: string; cidade: string; estado: string; status: RequestStatus; created_at: string }
export type Budget = { id: string; solicitacao_id: string; oficina_id: string; valor_mao_obra: number; valor_pecas: number; valor_total: number | null; prazo_dias: number | null; descricao: string | null; status: BudgetStatus; created_at: string }
export type Service = { id: string; solicitacao_id: string; orcamento_id: string; oficina_id: string; status: ServiceStatus; data_agendada: string | null; data_inicio: string | null; data_conclusao: string | null; observacoes: string | null }
export type Message = { id: string; solicitacao_id: string; remetente_id: string; tipo: 'texto' | 'sistema'; conteudo: string; lida_em: string | null; created_at: string }
