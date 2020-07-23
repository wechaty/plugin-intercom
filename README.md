# wechaty-intercom [![Wechaty Plugin Intercom](https://img.shields.io/badge/Wechaty%20Plugin-Intercom-brightgreen.svg)](https://github.com/wechaty/wechaty-intercom)

 [![NPM Version](https://img.shields.io/npm/v/wechaty-intercom?color=brightgreen)](https://www.npmjs.com/package/wechaty-intercom)
 [![NPM](https://github.com/wechaty/wechaty-intercom/workflows/NPM/badge.svg)](https://github.com/wechaty/wechaty-intercom/actions?query=workflow%3ANPM)

Intercom is a Conversational Relationship Platform (CRP).

Wechaty Intercom Plugin helps you build better customer relationships through WeChat across the customer journey.

![Wechaty Plugin Intercom](docs/images/intercom-wechaty.png)

[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-brightgreen.svg)](https://github.com/Wechaty/wechaty)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)

## Introduction

Wechaty Intercom Plugin helps you to manage your customers/leads/users in the WeChat Room, with the power of the Intercom service.

## Usage

```ts
import { WechatyIntercom } from 'wechaty-intercom'

const config = {
  room: 'room_id@chatroom',

  mention: true,
  webhookProxyUrl : 'https://smee.io/your_smee_io_proxy_url',
  intercomToken   : 'your_intercom_authorization_token',
}

const IntercomPlugin = WechatyIntercom(config)

const wechaty = new Wechaty()
wechaty.use(IntercomPlugin)
```

1. `config.room`: The room id of your service WeChat room.
1. `config.mention`: If set to `true`, customers need to use `@` to mention the bot when they want to ask questions.
1. `config.webhookProxyUrl`: A `semee.io` link that you need to set it to receive the Intercom Webhook events.
    1. [Intercom Developer Hub - Webhook Topics](https://developers.intercom.com/building-apps/docs/webhook-model#section-webhook-topics)
    1. [smee.io - Webhook payload delivery service](https://smee.io/) - Receives payloads then sends them to your locally running application.
1. `config.intercomToken`: The Authorization Token for your Intercom account.
    1. [Intercom Developer Hub - How to get your Access Token](https://developers.intercom.com/building-apps/docs/authentication-types#section-how-to-get-your-access-token)

## Configure Intercom Webhooks

In order to receive the reply and close events from Intercom, we need to configure two webhooks:

1. `conversation.admin.replied`
1. `conversation.admin.closed`

The `request endpoint URL` must be as same as the `webhookProxyUrl` setting in the `config`.

![Intercom Webhooks](docs/images/intercom-webhooks.png)

> Do not forget to click [Save] button after you set them.

## Environment Variables

The following two environment variables will be used if the required information is not provided by the config.

### 1 `WECHATY_PLUGIN_INTERCOM_TOKEN`

`process.env.WECHATY_PLUGIN_INTERCOM_TOKEN` will be used if the `config.intercomToken` is not provided.

Learn more about the authorization token of intercom: [Intercom Developers - How to get your Access Token](https://developers.intercom.com/building-apps/docs/authentication-types#section-how-to-get-your-access-token)

### 2 `WECHATY_PLUGIN_INTERCOM_WEBHOOK_PROXY_URL`

We receive webhook payloads with the help from <smee.io>, by proxy them to our locally running Wechaty Plugin application.

`process.env.WECHATY_PLUGIN_INTERCOM_WEBHOOK_PROXY_URL` will be used if the `config.webhookProxyUrl` is not provided.

See:

1. [Intercom Developer Hub - Webhook Topics](https://developers.intercom.com/building-apps/docs/webhook-model#section-webhook-topics)
1. [smee.io - Webhook payload delivery service](https://smee.io/) - Receives payloads then sends them to your locally running application.

## Screenshot

![Wechaty Intercom Conversation](docs/images/wechaty-intercom-conversation.png)

## Example

Our Friday BOT are using `wechaty-intercom` to connect our WeChat customers to Intercom.

You can read the source code from: <https://github.com/wechaty/friday/blob/master/src/plugins/intercom.ts>

## History

### v0.4 master

1. Renamed from `wechaty-plugin-intercom` to `wechaty-intercom`.
1. Rename `at` to `mention` in config.

### v0.2 (Jun 2020)

1. Init code base
1. Room message to Intercom
1. Intercom message to Room (Powered by Smee.io)

## Contributors

[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-intercom/images/0)](https://sourcerer.io/fame/huan/wechaty/wechaty-intercom/links/0)
[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-intercom/images/1)](https://sourcerer.io/fame/huan/wechaty/wechaty-intercom/links/1)
[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-intercom/images/2)](https://sourcerer.io/fame/huan/wechaty/wechaty-intercom/links/2)
[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-intercom/images/3)](https://sourcerer.io/fame/huan/wechaty/wechaty-intercom/links/3)
[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-intercom/images/4)](https://sourcerer.io/fame/huan/wechaty/wechaty-intercom/links/4)
[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-intercom/images/5)](https://sourcerer.io/fame/huan/wechaty/wechaty-intercom/links/5)
[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-intercom/images/6)](https://sourcerer.io/fame/huan/wechaty/wechaty-intercom/links/6)
[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-intercom/images/7)](https://sourcerer.io/fame/huan/wechaty/wechaty-intercom/links/7)

## Author

[Huan LI](https://github.com/huan) ([李卓桓](http://linkedin.com/in/zixia)),
Tencent TVP of Chatbot, \<zixia@zixia.net\>

[![Profile of Huan LI (李卓桓) on StackOverflow](https://stackexchange.com/users/flair/265499.png)](https://stackexchange.com/users/265499)

## Copyright & License

* Code & Docs © 2020 Huan LI \<zixia@zixia.net\>
* Code released under the Apache-2.0 License
* Docs released under Creative Commons
