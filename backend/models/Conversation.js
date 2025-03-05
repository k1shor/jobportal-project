const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users in the chat
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },  // Store last message for quick preview
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]  // array of message IDs
},{timestamps: true});

module.exports = mongoose.model('Conversation', ConversationSchema);