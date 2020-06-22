import {
  Wechaty,
  WechatyPlugin,
  log,
}                   from 'wechaty'
import {
  matchers,
}                   from 'wechaty-plugin-contrib'

import { intercomTalker } from './intercom'

const WECHATY_PLUGIN_INTERCOM_WEBHOOK_PROXY_URL = 'WECHATY_PLUGIN_INTERCOM_WEBHOOK_PROXY_URL'
const WECHATY_PLUGIN_INTERCOM_TOKEN             = 'WECHATY_PLUGIN_INTERCOM_TOKEN'

export interface WechatyIntercomConfig {
  room: matchers.RoomMatcherOptions,

  at?              : boolean,
  webhookProxyUrl? : string,
  intercomToken?   : string,
}

function WechatyIntercom (config: WechatyIntercomConfig): WechatyPlugin {
  log.verbose('WechatyIntercom', 'WechatyIntercom(%s)', JSON.stringify(config))

  let token           = config.intercomToken
  let webhookProxyUrl = config.webhookProxyUrl

  if (!token) {
    token = process.env[WECHATY_PLUGIN_INTERCOM_TOKEN]
  }
  if (!token) {
    throw new Error(`
      Wechaty Intercom Plugin requires Intercom TOKEN for authorization.
      Please set ${WECHATY_PLUGIN_INTERCOM_TOKEN} environment variable,
      or set 'intercomToken' in plugin config.
    `)
  }

  if (!webhookProxyUrl) {
    webhookProxyUrl = process.env[WECHATY_PLUGIN_INTERCOM_WEBHOOK_PROXY_URL]
  }
  if (!webhookProxyUrl) {
    throw new Error(`
      Wechaty Intercom Plugin requires Webhook Proxy URL for receiving Intercom Conversation Replies.
      Please set ${WECHATY_PLUGIN_INTERCOM_WEBHOOK_PROXY_URL} environment variable,
      or set 'webhookProxyUrl' in plugin config.
    `)
  }

  const talkIntercom = intercomTalker(token)
  const matchRoom    = matchers.roomMatcher(config.room)

  /**
   * Connect with Wechaty
   */
  return function WechatyIntercomPlugin (wechaty: Wechaty) {
    log.verbose('WechatyIntercom', 'WechatyIntercomPlugin(%s)', wechaty)

    wechaty.on('message', async message => {
      const room = message.room()
      const from = message.from()
      const text = message.text()

      if (!from)                          { return }
      if (!room)                          { return }
      if (message.self())                 { return }
      if (!await matchRoom(room))         { return }
      if (config.at) {
        if (!await message.mentionSelf()) { return }
      }

      await talkIntercom(from, text)
    })
  }

}

export { WechatyIntercom }
