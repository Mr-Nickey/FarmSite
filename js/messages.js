window.messagingService = {
  /**
   * Sends a message to another user.
   *
   * @param {string} toUserId The ID of the user to send the message to.
   * @param {string} content The text content of the message.
   * @param {File[]} attachments An optional array of file attachments.
   * @returns {Promise<any>} A promise that resolves with the created message record.
   */
  async sendMessage(toUserId, content, attachments = []) {
    // Use FormData to handle files
    const formData = new FormData();
    formData.append('from_user', window.pb.authStore.model.id);
    formData.append('to_user', toUserId);
    formData.append('content', content);
    formData.append('read', 'false');

    if (attachments && attachments.length > 0) {
        attachments.forEach(file => {
            // Assuming the PocketBase field is named 'attachment' (singular) 
            // but allows multiple values (Max number of files > 1 in schema)
            formData.append('attachment', file);
        });
    }

    const record = await window.pb.collection('messages').create(formData);
    return record;
  },

  /**
   * Fetches the conversation between the current user and another user.
   *
   * @param {string} otherUserId The ID of the other user.
   * @returns {Promise<any[]>} A promise that resolves with the list of messages in the conversation.
   */
  async getConversation(otherUserId) {
    const currentUserId = window.pb.authStore.model.id;
    
    // For the member side, we want to see the entire support thread, 
    // which includes messages from the member to the admin, AND messages from ANY staff member to the member.
    // We broaden the filter to include all messages involving the current user.
    const records = await window.pb.collection('messages').getFullList({
      sort: 'created',
      filter: `(from_user = "${currentUserId}") || (to_user = "${currentUserId}")`,
      expand: 'from_user,to_user'
    });
    return records;
  },

  /**
   * For the Admin view, fetches a list of users who have messaged me recently, grouped by user.
   * @returns {Promise<any[]>} A promise that resolves with a list of recent conversations.
   */
  async getRecentConversations() {
      const currentUserId = window.pb.authStore.model.id;
      const records = await window.pb.collection('messages').getFullList({
          sort: '-created',
          filter: `to_user = "${currentUserId}"`,
          expand: 'from_user'
      });

      const conversations = {};
      for (const message of records) {
          const otherUser = message.expand.from_user;
          if (!conversations[otherUser.id]) {
              conversations[otherUser.id] = {
                  user: otherUser,
                  lastMessage: message,
                  unreadCount: 0
              };
          }
          if (!message.read) {
              conversations[otherUser.id].unreadCount++;
          }
      }

      return Object.values(conversations);
  },


  /**
   * Marks a list of messages as read.
   *
   * @param {string[]} messageIds An array of message IDs to mark as read.
   * @returns {Promise<any[]>} A promise that resolves with the updated message records.
   */
  async markAsRead(messageIds) {
    if (!messageIds || messageIds.length === 0) {
      return Promise.resolve([]);
    }
    const promises = messageIds.map(id => {
      // Catch individual errors so one failure doesn't break the whole batch
      return window.pb.collection('messages').update(id, { read: true }).catch(err => {
          if (err.status === 404) {
              console.warn(`Permission denied (404) marking message ${id} as read. Check 'Update' API rule in PocketBase.`);
          } else {
              console.warn(`Failed to mark message ${id} as read:`, err);
          }
          return null;
      });
    });
    return Promise.all(promises);
  }
};
