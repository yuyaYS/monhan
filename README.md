- [x] move json to postgresql Supabase
- [x] search monster. using react query(it has weird behavior but fix later )
- [x] filter monster
- [] rate limit for api request.
- [] maybe create post for mission

## Monster Hunter Dictionary

This is collection of Monster Hunter Dictionary. You can see monsters, quests, endemic monsters. Search is only available monster for now. You can filter monster clicking element of monster.
I have use [Monster hunter json data](https://github.com/CrimsonNynja/monster-hunter-DB) for creating database schema. Thank you for [CrimsonNynja](https://github.com/CrimsonNynja)

- Next.js: use of client and server component. Also, the use of searchparams to get shareable url and modal with parallel routes.
- Tailwind for styling.
- Drizzle ORM for database query
- Supabase for hosting database and image is pulling from public folder
- React-query: fetching and state management.
- Zod for form type validation and nodemailer for mail handling.
- Sentry.io : logging

## モンスターハンター辞書アプリ

モンスターハンター辞書へようこそ！このアプリでは、モンスター、クエスト、環境生物を網羅的に見ることができます。現在、検索機能はモンスターのみ利用可能です。モンスターページでは、タイプ（炎など）をクリックすることで、モンスターを絞り込むことができます。

### 機能
- **検索機能**: モンスターを迅速に見つけることができます。
- **タイプフィルタリング**: タイプによってモンスターを簡単に絞り込むことができます。

### 技術スタック
- **Next.js**: クライアントコンポーネントとサーバーコンポーネントを利用。Modalの使用、またsearchparamなどによるシェア可能なURL。
- **Tailwind CSS**: スタイリングに使用。
- **Drizzle ORM**: データベースクエリを円滑に処理。
- **Supabase**: データベースのホスティング、画像は public フォルダから取得。
- **React Query**: データのフェッチとステート管理を効率的に行う。
- **Zod**: フォームの型バリデーションを提供。
- **Nodemailer**: メールのハンドリングを行う。
- **Sentry.io**: アプリケーションのロギングを監視。

### データソース
このプロジェクトは、[Monster Hunter JSON Database](https://github.com/CrimsonNynja/monster-hunter-DB)のデータを基に構築されています。貴重なリソースを提供してくださった[CrimsonNynja](https://github.com/CrimsonNynja)に感謝します！
