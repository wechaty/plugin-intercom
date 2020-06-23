/* eslint-disable camelcase */

interface IntercomWebhookNotificationConversationAdminReplied {
  topic: 'conversation.admin.replied',
  data: {
    item: {
      user: {
        user_id: string,
      }
      conversation_parts: {
        conversation_parts: {
          body: string,
        }[],
      }
    }
  }
}

interface IntercomWebhookNotificationConversationAdminClosed {
  topic: 'conversation.admin.closed',
  data: {
    item: {
      user: {
        user_id: string,
      }
    }
  }
}

export type IntercomWebhookNotification = IntercomWebhookNotificationConversationAdminReplied
                                        | IntercomWebhookNotificationConversationAdminClosed
