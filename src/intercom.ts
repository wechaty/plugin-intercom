/* eslint-disable camelcase */
import {
  Contact,
  log,
}                           from 'wechaty'
import {
  IRestResponse,
  RestClient,

}                           from 'typed-rest-client'
import {
  BearerCredentialHandler,
}                           from 'typed-rest-client/Handlers'

function intercomTalker (token: string) {
  log.verbose('WechatyPluginIntercom', 'intercomTalker(%s)', token)

  const bearerHandler: BearerCredentialHandler = new BearerCredentialHandler(token)
  const client = new RestClient(
    'WechatyPluginIntercom',
    'https://api.intercom.io/',
    [ bearerHandler ],
  )

  return async function talkIntercom (
    contact : Contact,
    text    : string,
  ): Promise<void> {
    log.verbose('WechatyPluginIntercom', 'talkIntercom(%s, %s)', contact, text)

    const contactId = contact.id
    const name      = contact.name()
    const avatar    = (contact as any).payload?.avatar
    const email     = (contact.weixin() || contactId) + '@wechat.com'

    /**
     * Create contact if not exist yet
     */
    const intercomContactIdList = await getContactIdListByExternalId(contactId)
    if (intercomContactIdList.length <= 0) {
      const newId = await createContact({
        avatar,
        contactId,
        email,
        name,
      })
      intercomContactIdList.push(newId)
    }

    const intercomContactId = intercomContactIdList[0]

    /**
     * Create conversation if not exist yet
     */
    if (!await replyLastConversation(intercomContactId, text)) {
      await createConversation(intercomContactId, text)
    }

  }

  async function createConversation (
    userId : string,
    body   : string,
  ): Promise<string> {
    const data = {
      body,
      from: {
        id: userId,
        type: 'user',
      },
    }
    const restRes: IRestResponse<{ id: string }> = await client.create<any>('conversations', data)
    // console.info('ret:', restRes.result)
    return restRes.result!.id
  }

  async function replyLastConversation (
    userId : string,
    body   : string,
  ): Promise<boolean> {
    const replyOptions = {
      body,
      intercom_user_id : userId,

      message_type     : 'comment',
      type             : 'user',
    }

    try {
      const restRes:  IRestResponse<any> = await client.create<any>('conversations/last/reply', replyOptions)
      console.info('ret:', restRes.result)
      return true
    } catch (e) {
      // console.error('error: ', e)
      return false
    }

  }

  interface CreateContactOptions {
    contactId : string,
    name      : string,

    avatar?   : string,
    email?    : string,
  }

  async function createContact (options: CreateContactOptions): Promise<string> {
    let restRes:  IRestResponse<any>

    const data = {
      avatar       : options.avatar,
      email        : options.email,
      external_id  : options.contactId,
      last_seen_at : Date.now() / 1000,
      name         : options.name,
      role         : 'user',
      signed_up_at : Date.now() / 1000,
    }

    restRes = await client.create<any>('contacts', data)
    return restRes.result.id
  }

  async function getContactIdListByExternalId (
    contactId: string,
  ): Promise<string[]> {
    let restRes:  IRestResponse<any>

    restRes = await client.create<any>('contacts/search', {
      query:  {
        field: 'external_id',
        operator: '=',
        value: contactId,
      },
    })
    console.info('ret:', restRes.result.data[0])
    return restRes.result.data.map(
      (o: { id: string }) => o.id,
    )

  }

}

// async function unarchiveContactById (id: string): Promise<void> {
//   const ret = await client.create<any>('contacts/' + id + '/unarchive', {})
//   console.info('ret: ', ret)
// }

// async function deleteContactById (id: string): Promise<void> {
//   const ret = await client.del<any>('contacts/' + id)
//   console.info('ret: ', ret)
// }

// async function getIdListByEmail (email: string): Promise<string[]> {
//   let restRes:  IRestResponse<any>

//   restRes = await client.create<any>('contacts/search', {
//     query:  {
//       field: 'email',
//       operator: '=',
//       value: email,
//     },
//   })
//   return restRes.result.data.map(
//     (o: { id: string }) => o.id,
//   )

// }

export { intercomTalker }
