# ビジネスホテル向けの予約管理システム（フロント側）

## サービスの URL

https://my-booking-app-gilt.vercel.app/<br/>
Vercel の無料プランで試作品としてデプロイしています。

  <br/>

## 使用技術

- フロントエンド:TypeScript, React
- バックエンド：Python, Django
- サーバー：Vercel, Render
- データベース：PostgreSQL

<br/>

## 機能概要

| トップ画面                          | 　予約画面 ①                                                                                      |
| ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| ![Top画面](/docs/img/home_1_1.jpeg) | ![予約画面](/docs/img/Reservation_1_1.jpeg)                                                       |
| 部屋情報の一覧が表示されます。      | 予約カレンダーで日毎の空き部屋数が表示されます。<br>日付をクリックすると予約画面 ② に遷移します。 |

<br>

| 予約画面 ②                                                            | 　予約画面 ③                                                               |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| ![Top画面](/docs/img/Reservation_1_2.jpeg)                            | ![予約画面](/docs/img/Reservation_1_3.jpeg)                                |
| 部屋の一覧が表示されます。<br>クリックすると予約画面 ③ に遷移します。 | 予約情報を入力します。<br>入力値に誤りがあるとエラーメッセージを表示します |

<br>

| 管理者メニュー\_ログイン                                                                                                         | 　管理者メニュー\_予約一覧                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| ![Top画面](/docs/img/Login_1_1.jpeg)                                                                                             | ![予約画面](/docs/img/Reservation_1_4.jpeg)                                                                            |
| ログインに成功すると管理者ページへ遷移します。<br>ログイン前に管理者ページにアクセスすると、ログインページへリダイレクトされます | 予約一覧が表示されます。<br>予約の編集・削除・追加が可能です。<br>検索機能で名前等でフィルターをかけることができます。 |

<br>

| 受付帳票                                          | 　管理者メニュー\_客室管理                                              |
| ------------------------------------------------- | ----------------------------------------------------------------------- |
| ![Top画面](/docs/img/Report_1_1.jpeg)             | ![予約画面](/docs/img/Room_1_1.jpeg)                                    |
| 予約を受付すると Excel 形式の帳票が出力されます。 | 客室情報の一覧が表示されます<br> 客室情報の編集・削除・追加が可能です。 |

<br>

| 管理者メニュー\_客室管理                                   | 　管理者メニュー\_ログアウト ①                                                         |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| ![Top画面](/docs/img/Room_1_2.jpeg)                        | ![予約画面](/docs/img/Login_1_1.jpeg)                                                  |
| 部屋情報の編集画面です。<br>画像のアップロードも可能です。 | ナビゲーションバーのログアウトをクリックするとログアウトし、ログイン画面へ遷移します。 |

<br>
