---
title: Notes on international shipping from and to Japan
description: How to use Japan Post's International Mail My Page Service, including EAD rules, contact uploads, and label creation.
head:
  - - meta
    - name: keywords
      content: japan post, international shipping, ead, my page, postal
localization: sync
---

# {{$frontmatter.title}}

{{$frontmatter.description}}


## Table of contents <!-- omit in toc -->

* [Japan Post - international mail](#japan-post---international-mail)
* [International Mail My Page Service](#international-mail-my-page-service)
  * [Tips for using Japan Post](#tips-for-using-japan-post)
  * [Demo](#demo)
  * [jp-post-contact-upload csv file](#jp-post-contact-upload-csv-file)


## Japan Post - international mail

* International Mail labels must be done with [Electronic Advance Data (EAD)][ead]
* JAPAN Post does not accept postal items addressed to the United States with a handwritten label.
* use the "[International Mail My Page Service][my-page-what]" to send EMS, international parcels and small packets, etc.


## International Mail My Page Service

* [Login - International Mail My Page Service][my-page-login]
* [Online Shipping Tool - JAPAN Post][online-shipping-tool]
* Phone Support:
  * Japanese: 0120-5931-55
  * English: 0570-046-111
    * English was faster
  * Service Hours
    * Weekdays: 8:00~21:00
    * Saturdays, Sundays, and holidays: 9:00~21:00
* Upload contacts in bulk using [jp-post-contact-upload.csv][csv-template] as a template.
* As of March 29, 2021, JAPAN POST is only sending [Small Packets][small-packets] to USA.
  * Although the default option for [International Mail My Page Service][my-page-default] is the `International ePacket`, this is not available!
* The type of Shipping: [Small Packets][small-packets] & `AIR`


### Tips for using Japan Post

* Upload contacts in bulk using the add [Address book][address-book] feature.
  * Use [jp-post-contact-upload.csv][csv-template] as a template.
  * Make sure all text is inside quotes (`"`) and no space between the quotes & comma (`","`)
  * First line should contain the header:

    ```csv
    "User ID","Name","CompanyName","Department","Postal code","Address 1","Address 2","Address 3","STATES, etc.","COUNTRY","Tel","Fax","E-mail address"
    ```

  * Last light should be empty.

* Register the items to be shipped ahead of creating the label using [Contents List][contents-list] tool.

|     | Home                                                               | Address book                                                                 | Data Import for Address book                                                 |
| --- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
|     | ![global-shipping-home][img-global-shipping-home] | ![global-shipping-address-1][img-global-shipping-address-1] | ![global-shipping-address-2][img-global-shipping-address-2] |


### Demo

Pages went over by the demo videos:

1. Home
2. Create Label
3. Register Sender's Address (Yours)
4. Register Recipient's Address (Their)
5. Select Shipping Option ([Small Packets][small-packets] & `AIR`)
6. Register Content
7. Package Details
8. Confirmation
9. Save & Print Label

<!-- markdownlint-disable MD033 -->
<video controls>
  <source src="/global-shipping/global-shipping-demo.mp4" type="video/mp4">
</video>
<!-- markdownlint-enable MD033 -->


### jp-post-contact-upload csv file

```csv
<!--@include: ../../public/global-shipping/jp-post-contact-upload.csv-->
```

<!-- Links -->

[address-book]: https://www.post.japanpost.jp/intmypage/address_en.html
[contents-list]: https://www.post.japanpost.jp/intmypage/contents_en.html
[ead]: https://www.post.japanpost.jp/int/ead/index_en.html
[my-page-default]: https://www.int-mypage.post.japanpost.jp/mypage/M010000.do
[my-page-login]: https://www.int-mypage.post.japanpost.jp/mypage/M010000.do?request_locale=en
[my-page-what]: https://www.post.japanpost.jp/intmypage/whatsmypage_en.html
[online-shipping-tool]: https://www.post.japanpost.jp/intmypage/online_en.html
[small-packets]: https://www.post.japanpost.jp/int/service/small_packing_en.html

<!-- Internal links -->

[csv-template]: #jp-post-contact-upload-csv-file

<!-- Image links -->

[img-global-shipping-address-1]: /global-shipping/global-shipping-address-1.png
[img-global-shipping-address-2]: /global-shipping/global-shipping-address-2.png
[img-global-shipping-home]: /global-shipping/global-shipping-home.png
