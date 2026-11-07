# Emotion Galaxy

Запуск: `cd emotion-galaxy && python3 -m http.server 8000` → http://localhost:8000 (или `npx serve`). Деплой: Netlify / Vercel / GitHub Pages — папку можно загрузить как есть.

## Как хранятся подарки
- **Без настройки** (по умолчанию): подарок кодируется в саму ссылку `#/g/…`. Ссылка работает на любом устройстве без регистрации, без сервера. Фото сжимаются до 520px, лимит 4 шт. Для мессенджеров ссылка с фото получается длинной.
- **С Supabase** (короткие ссылки `#/e/id`, ответы для автора): заполни `js/config.js` и выполни SQL:
```sql
create table emotions(id text primary key, data jsonb, created timestamptz default now());
create table replies(id bigserial primary key, emotion_id text, sender text, text text, created timestamptz default now());
alter table emotions enable row level security; alter table replies enable row level security;
create policy "r" on emotions for select using (true); create policy "i" on emotions for insert with check (true);
create policy "ri" on replies for insert with check (true); create policy "rs" on replies for select using (true);
```
## Файлы
`js/data.js` категории и темы · `storage.js` сохранение/ссылки/ответы · `galaxy.js` Three.js + звёзды · `viewer.js` открытие подарка (GSAP) · `builder.js` конструктор · `music.js` синтез-музыка · `app.js` роутер.
