# Vyrtuz CRM

Instalado em 07/10/2026: https://crm.vyrtuz.com

- Servidor: `79.137.203.30`
- Diretório: `/opt/vyrtuz-crm`
- Código oficial clonado: `/opt/vyrtuz-crm/source`, tag `v4.18.0`
- Base: `chatwoot/chatwoot:v4.18.0-ce` (Community Edition)
- Imagem personalizada: `vyrtuz-chatwoot:4.18.0`
- Serviços Docker Compose: Rails, Sidekiq, PostgreSQL 16/pgvector e Redis 7.
- Porta da aplicação: `127.0.0.1:3010`, banco e Redis sem portas públicas.
- Domínio: registro A `crm` → `79.137.203.30`, na zona `vyrtuz.com`.
- Nginx: `/etc/nginx/sites-available/vyrtuz-crm`
- Certificado Let's Encrypt, renovação automática pelo Certbot.
- Administrador: `contatobrenomllo@gmail.com` (conta Vyrtuz, idioma pt_BR).
- Cadastro público desativado. Credenciais iniciais fora do repositório: `C:\Users\Windows\.codex\private\vyrtuz\ACESSO-CRM.txt`.

## Personalização

Nome Vyrtuz CRM, logos claro/escuro e cores azuis. Os arquivos estão em `branding/` no servidor e são incorporados pelo Dockerfile. Os valores de marca estão nas configurações da instalação. O código e os avisos de licença do Chatwoot foram preservados. Esta instalação não habilita recursos comerciais da Enterprise Edition.

## Operação

```sh
cd /opt/vyrtuz-crm
docker compose ps
docker compose logs --tail 100 rails sidekiq
./backup.sh
```

Backup inicial realizado. Agendamento diário às 03:15 no horário do servidor em `/etc/cron.d/vyrtuz-crm-backup`. Salva banco, anexos e configurações em `/opt/vyrtuz-crm/backups/`, com permissões restritas. Backups são locais: precisam ser copiados para outro destino e ter retenção definida conforme o volume de anexos crescer.

Para restaurar, interrompa Rails/Sidekiq, preserve um backup do estado atual, restaure o dump no PostgreSQL e os anexos no volume `storage`, recoloque as configurações do mesmo backup e inicie novamente. Não restaure banco de uma versão diferente sem verificar a compatibilidade de migrations.

## Pendências externas

- SMTP ainda não configurado: convites, recuperação de senha e notificações por e-mail dependem de credenciais de envio.
- WhatsApp, Instagram e outros canais dependem de conexão das respectivas contas e credenciais. Nenhum canal foi conectado automaticamente.
- VPS compartilhada com 4 GB de RAM e 2 CPUs: configuração inicial conservadora, 0 workers Puma adicionais, 3 threads Rails e 2 workers concorrentes Sidekiq. Avaliar aumento de recursos para uso intenso.

## Atualizações

Fazer backup antes de atualizar. Selecionar uma tag Community compatível, revisar as notas oficiais, atualizar a imagem base e as personalizações, executar `docker compose run --rm rails bundle exec rails db:chatwoot_prepare` e validar antes de retomar o atendimento. Não usar atualização automática de tag `latest`.
