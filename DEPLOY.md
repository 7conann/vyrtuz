# Publicação

## Deploy mais recente — 16/10/2026, revisão 2

Fonte `/opt/vyrtuz/releases/20261016-update2`, imagem `vyrtuz:20261016-update2`, contêiner `vyrtuz-update2-20261016`, porta `3009`. Ambos os domínios atendem essa versão diretamente. Backup em `/opt/vyrtuz/backups/20261016-before-update2`; versão anterior preservada em `vyrtuz-update-20261016`, porta `3007`. Reversão: restaurar os dois arquivos Nginx desse backup, validar a configuração e recarregar Nginx.

## Deploy atual — 16/10/2026

Código local publicado em `/opt/vyrtuz/releases/20261016-update`, imagem `vyrtuz:20261016-update`, contêiner `vyrtuz-update-20261016`, porta local `3007`. Os Nginx `vyrtuz` e `vyrtuz-com` atendem `.com.br` e `.com` diretamente, com HTTPS. Backup anterior em `/opt/vyrtuz/backups/20261016-before-update` (código, configurações e inspeção do contêiner). Imagem e contêiner `vyrtuz-favicon` preservados na porta `3006`. Para reverter, restaure `vyrtuz.conf` e `vyrtuz-com.conf` desse backup nos respectivos arquivos em `/etc/nginx/sites-available/`, execute `nginx -t` e `systemctl reload nginx`.

## Nova estrutura — 27/09/2026

Implementação em `components/vyrtuz-home.tsx` e `app/home.css`, baseada na organização da referência Yelly, com textos e imagens da Vyrtuz. Prévia local: `http://127.0.0.1:3100` (`npm run dev -- --hostname 127.0.0.1 --port 3100`). Capturas em `artifacts/`.

O WhatsApp comercial ainda precisa ser informado. Configure `NEXT_PUBLIC_WHATSAPP_NUMBER` com país, DDD e número, apenas dígitos. Em Docker, passe `--build-arg NEXT_PUBLIC_WHATSAPP_NUMBER=NUMERO_CONFIRMADO`. Os links incluem a solução escolhida na mensagem, sem enviar mensagens automaticamente.

Versão publicada em 27/09/2026 e validada em desktop e celular. Sem número comercial configurado, os botões levam à seção de contato existente.

## Versão pública atual

- Domínios: https://vyrtuz.com.br e https://www.vyrtuz.com.br
- Servidor: `79.137.203.30`
- Código no servidor: `/opt/vyrtuz/releases/20260927-cinematic`
- Imagem Docker: `vyrtuz:20260927-cinematic`
- Contêiner: `vyrtuz-cinematic`, com reinício automático (`unless-stopped`).
- Aplicação: `127.0.0.1:3005`, acessível publicamente pelo Nginx.
- Configuração Nginx: `/etc/nginx/sites-available/vyrtuz`
- HTTPS: Certbot/Let's Encrypt, renovação pelo `certbot.timer`.

## Atualização de favicon — 2026-10-13

Produção agora usa `vyrtuz-favicon`, imagem `vyrtuz:20261013-favicon`, porta local `3006`, fonte `/opt/vyrtuz/releases/20261013-favicon`. O favicon `/images/vyrtuz-favicon-v2.png` usa o mesmo símbolo do CRM. A versão anterior permanece no contêiner `vyrtuz-cinematic`, porta `3005`; configuração Nginx e inspeção anteriores estão em `/opt/vyrtuz/backups/20261013-before-favicon`. Para reverter, restaure o `nginx.conf` desse backup em `/etc/nginx/sites-available/vyrtuz`, valide com `nginx -t` e recarregue o Nginx.

## Nova home (referência Sterling) — 2026-10-16

Imagem `vyrtuz:20261016-sterling`, contêiner `vyrtuz-sterling`, porta local `3008` (a `3007` já estava ocupada), fonte em `/opt/vyrtuz/releases/20261016-sterling`. Otimização de imagens do Next ligada (AVIF/WebP via Sharp); o vídeo da marca só toca no desktop. Para publicar: copiar `/etc/nginx/sites-available/vyrtuz` para `/opt/vyrtuz/backups/20261016-before-sterling/nginx.conf`, trocar `proxy_pass http://127.0.0.1:3006;` por `3008`, `nginx -t` e `systemctl reload nginx`. Para reverter, voltar o `proxy_pass` para `3006`.

## Verificação no servidor

```sh
docker logs --tail 100 vyrtuz-cinematic
docker ps --filter name=vyrtuz
nginx -t
systemctl status certbot.timer
curl -I https://vyrtuz.com.br
```

## Construção

```sh
docker build -t vyrtuz:NOVA_VERSAO .
```

O Dockerfile instala as versões do `pnpm-lock.yaml`, compila o Next.js e executa o resultado standalone como usuário sem privilégios. Para uma atualização, valide a nova imagem em outra porta local antes de substituir o contêiner ativo e preserve a imagem anterior para reversão.

## Cache e reversão

Imagens em `/images/` e o vídeo `/vyrtuz-motion.mp4` usam cache de 24 horas, com revalidação após esse prazo. Ao substituir um desses arquivos e precisar de atualização imediata, altere também seu nome ou URL. Os arquivos versionados do Next.js mantêm seu cache imutável de um ano.

A versão anterior está preservada no contêiner `vyrtuz-home-preview`, porta local `3004`, com a imagem `vyrtuz:20260927-home`. O backup completo está em `/opt/vyrtuz/backups/20260927-before-cinematic`: código (`source.tar.gz`), imagem Docker (`image.tar.gz`), configuração Nginx, dados do contêiner e checksums. Os arquivos comprimidos foram verificados antes da publicação. O backup mais antigo em `20260927-before-home` também foi mantido.

Para restaurar a versão anterior no servidor:

```sh
sh /opt/vyrtuz/backups/20260927-before-cinematic/restore.sh
```

## Imagens e movimento

A imagem principal agora usa `public/images/maquininha-hd-v2.webp`, e o cartão “Onde a vida acontece” usa `public/images/comercio-cafe-v2.webp`. Prompts e origem registrados em `artifacts/image-prompts-20260927.md`.

`components/home-motion.tsx` controla as entradas por IntersectionObserver e Web Animations API. Os efeitos rodam uma vez por elemento, com entradas simplificadas no celular. Preferência de movimento reduzido desativa os efeitos; foco de teclado revela conteúdo imediatamente. A rolagem permanece nativa e a imagem da máquina não é ampliada.
