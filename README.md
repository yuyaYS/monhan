- [x] move json to postgresql Supabase
- [x] search monster. using react query(it has weird behavior but fix later )
- [x] filter monster
- [] rate limit for api request.
- [] maybe create post for mission

## Getting Started

This is collection of Monster Hunter Dictionary. You can see monsters, quests, endemic monsters. Search is only available monster for now. You can filter monster clicking element of monster.
I have use [Monster hunter json data](https://github.com/CrimsonNynja/monster-hunter-DB) for creating database schema. Thank you for [CrimsonNynja](https://github.com/CrimsonNynja)

- Next.js: use of client and server component.
- Tailwind for styling.
- Drizzle ORM for database query
- Supabase for hosting database and image is pulling from public folder
- React-query: fetching and state management.
- Zod for form type validation and nodemailer for mail handling.
- Sentry.io : logging

モンスターハンターの辞書です。モンスター、クエスト、環境生物を見ることができます。検索は今のところモンスターのみです。モンスターページよりタイプ（炎）などをクリックすると、モンスターを絞り込むことができます。

データベーススキーマの作成には[Monster hunter json data](https://github.com/CrimsonNynja/monster-hunter-DB)を利用させていただきました。[CrimsonNynja](https://github.com/CrimsonNynja)ありがとうございました。

- Next.js：クライアントコンポーネントとサーバーコンポーネントを使用。

- スタイリングには Tailwind を使用。

- データベースクエリのための Drizzle ORM

- データベースのホスティングには Supabase を使用し、画像は public フォルダから取得しています。

- React-query：フェッチとステート管理。

- Zod: フォームタイプのバリデーション、nodemailer: メールハンドリング。

- Sentry.io : ロギング
