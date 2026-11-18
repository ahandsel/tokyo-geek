# SoftBank to Y!mobile guide - fact check (2026-11-18)

Fact check of `contents/en/local/softbank-ymobile-switch.md` and `contents/ja/local/softbank-ymobile-switch.md` against official Y!mobile, SoftBank, and PayPay Card pages as of 2026-11-18.
A research subagent checked 46 claims and every link.
I then re-fetched the decisive pages independently and confirmed the quotes below.
All verified fixes, the link recommendations, and the three optional additions were applied to both files on 2026-11-18.
Unverified claims were removed, or kept with an "unverified" label.

Two lint side effects:

* AutoCorrect converts the half-width commas after Japanese words in the JA `keywords` value back to full-width (`番号移行，mnp`), so that fix does not stick without an `.autocorrectrc` change.
* AutoCorrect converts `基本料初月０円特典` to `基本料初月0円特典` in link labels, so both files use the half-width `0` everywhere for consistency.


## Summary

* 46 claims checked: 26 confirmed, 7 outdated, 8 wrong, 5 unverified.
* The JA file states the same facts as EN; every error is in both files.
* All 14 link URLs return HTTP 200, but 3 labels point at the wrong page.


## Highest-impact errors (independently confirmed)

| Topic                           | Guide says                                                   | Official page says (2026-11-18)                                                                                                                                                         | Source                                                      |
| ------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| eSIM PayPay point offer         | Up to JPY 15,000 in points for eSIM                          | "ソフトバンク/LINEMO/LINEモバイル（ソフトバンク回線）及びソフトバンク回線MVNOからののりかえは対象外"; also requires "データ増量オプション（550円/月）"                                  | <https://www.ymobile.jp/store/sp/sim/>                      |
| Benefit that does apply         | Not mentioned                                                | `基本料初月０円特典（ワイモバイル）`: SoftBank number transfers, SIM-only included ("SIM単体契約…を含みます"), get the basic fee and eligible option fees free for the first month      | <https://www.ymobile.jp/cp/sblm_tesuryomuryo/>              |
| Switching-month cost and timing | Pay SoftBank full month plus Y!mobile; switch near month-end | With the first-month benefit, the Y!mobile basic fee is JPY 0 in month 1, so the day of the month matters little                                                                        | same as above                                               |
| PayPay Card Gold discount       | JPY 550/month                                                | "PayPayカード割（ゴールド）‐550円 PayPayカード割増額特典（ゴールド）‐220円", total JPY 770                                                                                              | <https://www.ymobile.jp/cp/cho-otokuwari/>                  |
| `おうち割 光セット（A）` amount | JPY 1,100 for S, or JPY 1,650 in a simulation                | "シンプル3 S/M/Lの場合 ひとりあたり 1,650 円/月 割引"                                                                                                                                   | <https://www.ymobile.jp/plan/discount/ouchiwari/>           |
| Hikari set via online store     | Store guide explains how to add it                           | "以下の方はオンラインストアにて同時にお申し込みいただけません。回線のご契約後にMy Y!mobileよりお申し込みください。…ソフトバンクからのりかえの方"                                        | <https://www.ymobile.jp/store/to_beginner/ouchiwari/>       |
| Line-switch hours               | 9:00-21:00                                                   | 9:00-21:00 is the other-carrier tab; the SoftBank and LINEMO tab shows "受付時間：4:00~23:15（年中無休）" (tilde normalized)                                                            | <https://www.ymobile.jp/store/to_beginner/flow_esim/>       |
| SoftBank cancellation fee basis | Exempt since 2022-02-01                                      | New 12-month fee (up to JPY 1,100) for lines opened from 2026-07-01, but none for "ソフトバンクからワイモバイルまたはLINEMOにのりかえ（番号移行）を行う場合"; the answer is still JPY 0 | <https://www.softbank.jp/support/faq/view/10617>            |
| SIM lock                        | Many recent devices have no SIM lock                         | "ソフトバンクをご利用中の方 初期設定前にSIMロック解除が必要です。My SoftBankより…"; devices released in or before April 2015 cannot be unlocked                                         | <https://www.ymobile.jp/store/to_beginner/esim_app/unlock/> |


## Other corrections

* **Application flow for SoftBank switchers.**
  The guide lists an identity verification step.
  The SoftBank tab of the eSIM flow page has no such step and requires a `My SoftBank` login instead.
* **Selector labels.**
  The site's application selector currently reads `今の電話番号をそのまま使用する`, `ワイモバイル以外`, `ソフトバンクやLINEMOからののりかえですか？` `はい`, then `いいえ（SIMのみ申し込む）`.
* **Unsupported payment sentence.**
  No Y!mobile page says the transfer "cannot be completed if payment confirmation cannot be made".
  Y!mobile does say the application is canceled if the SoftBank address is old or lacks the prefecture.
* **Checklist item "Apply from the campaign-eligible page".**
  The SoftBank-eligible benefit has no entry-page condition, and the eSIM point offer excludes SoftBank anyway.
* **Point rate wording.**
  "Appears to be up to 1%" can become "is up to 1%", because the PayPay Card page states it.
* **Overview wording.**
  SoftBank cancels the old line when the Y!mobile switch completes, not when the application completes.


## Link labels

| Link reference                                   | Current target    | Problem                                      | Fix                                                                                                     |
| ------------------------------------------------ | ----------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| "supported devices page" (`[ymobile-sim-esim]`)  | `/store/sp/sim/`  | SIM and eSIM sales page, not the device list | New `[ymobile-devices]`: <https://www.ymobile.jp/store/lineup/sim_devices/> ("SIM動作確認済み機種検索") |
| "official online store" (`[ymobile-simulation]`) | `/sp/simulation/` | Fee simulation page                          | Point to `[ymobile-sim-esim]`                                                                           |
| "official SIM page" (`[ymobile-simulation]`)     | `/sp/simulation/` | Fee simulation page                          | Point to `[ymobile-sim-esim]`                                                                           |


## Links dropped from JA in `abd976d`

Policy: EN and JA may differ in URLs when that helps the reader, but every target here is already a Japanese page, so both files should match.

| Dropped link                       | Recommendation                  | Reason                                                                                                |
| ---------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `unlock_procedure`                 | Keep dropped                    | It covers Y!mobile-sold devices, not SoftBank devices. Link `esim_app/unlock/` in both files instead. |
| `simfree_iphone/apn`               | Restore in both                 | Still the official settings page for SIM-free iPhone and iPad. EN mentions it without a link.         |
| `to_beginner/flow`                 | Keep dropped                    | SIM-card flow; the guide is eSIM-only and already links `flow_esim`.                                  |
| `necessaries` (inline)             | Restore in both                 | Source for the "no ID documents with a My SoftBank login" claim. EN mentions it without a link.       |
| "公式SIMページ" to `store/sp/sim/` | Restore in both                 | The current target is the fee simulation page.                                                        |
| `ymobile-devices`                  | Restore in both, with a new URL | Merged into `ymobile-sim-esim`, but the label promised the device list.                               |


## Adjustments to the subagent's proposals

* **Unlock fee.**
  The subagent proposed "The procedure is free".
  The SoftBank page it cited does not show that text, so leave the sentence out.
* **`超！おトク割`.**
  Confirmed: `シンプル3 M/L`, JPY 1,100 off for 12 months from the month after joining, not combinable with `おうち割 光セット（A）`, `家族割引サービス`, or `おうち割 でんきセット（E）`, which take priority.
  Not confirmed: that SoftBank number transfers qualify.
  For this guide's reader, who keeps SoftBank Hikari, the Hikari set takes priority anyway, so mention it only as an alternative.
* **First-month benefit caveat the subagent missed.**
  It does not apply if the old SoftBank line still has `基本料初月０円特典（ソフトバンク）` applied when it ends.
  The page also says the benefit may not combine with other campaigns.


## Unverified

* That recent SoftBank devices ship without a SIM lock.
* That the PayPay Card stays valid after canceling SoftBank; only implied by the benefit terms.
* Order screens after the first selector; the order site is a JavaScript app.
* An end date for the JPY 220 Gold bonus; none is shown.
* Whether the 4:00-23:15 hours apply to the eSIM-only path; the SoftBank tab shows them on the new-phone path, and the eSIM-only path shows no hours.


## Optional additions (verified)

* Y!mobile charges its own cancellation fee within 12 months of joining: "シンプル3 S/M：858円、シンプル3 L：1,100円".
* The PayPay Card benefit page lists a fourth linkage step: automatic exchange of SoftBank points to PayPay points.
