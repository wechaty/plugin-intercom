import http from 'http'

import express from 'express'
import bodyParser from 'body-parser'

import {
  log,
}                   from 'wechaty'

const SmeeClient = require('smee-client')

type AdminReplyCallback = (contactId: string, text: string) => void

function smeeWebhook (webhookProxyUrl : string) {
  log.verbose('WechatyPluginIntercom', 'smeeWebhook(%s)', webhookProxyUrl)

  const app =  express()
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  const server = http.createServer(app)

  let events: any

  const listener = server.listen(0, () => {
    const port = (listener.address() as any).port

    const smee = new SmeeClient({
      logger: console,
      source: webhookProxyUrl,
      target: `http://127.0.0.1:${port}/events`,
    })
    events = smee.start()
  })

  log.verbose('WechatyPluginIntercom', 'smeeWebhook() is listening on port ' + (listener.address() as any).port)

  return function webhook (callback: AdminReplyCallback) {
    log.verbose('WechatyPluginIntercom', 'webhook(callback)')

    app.post('/events', intercomWebhook)

    return () => {
      // Stop forwarding events
      if (events) { events.close() }
      listener.close()
    }

    function intercomWebhook (req: express.Request, res: express.Response) {
      log.verbose('WechatyPluginIntercom', 'smeeWebhook() intercomWebhook(req, res)')

      const body = req.body

      const contactId = body.data.item.user.user_id
      const parts = body.data.item.conversation_parts.conversation_parts
      const html = parts[parts.length - 1].body

      // https://www.tutorialspoint.com/how-to-remove-html-tags-from-a-string-in-javascript
      const text = html.replace(/(<([^>]+)>)/ig, '')

      // console.info(contactId, ': ', text)
      log.verbose('WechatyPluginIntercom', 'intercomWebhook(req, res) %s -> %s', contactId, text)
      callback(contactId, text)

      res.end()
    }

  }

}

export { smeeWebhook }
