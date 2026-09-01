create index if not exists idx_avaliacoes_cliente_id on public.avaliacoes (cliente_id);
create index if not exists idx_fotos_solicitacoes_usuario_id on public.fotos_solicitacoes (usuario_id);
create index if not exists idx_mensagens_remetente_id on public.mensagens (remetente_id);
create index if not exists idx_solicitacoes_orcamento_aceito_id on public.solicitacoes (orcamento_aceito_id);
create index if not exists idx_solicitacoes_veiculo_id on public.solicitacoes (veiculo_id);
