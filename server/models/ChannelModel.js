import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  secondPartyAddress: { type: String, unique: true },
  channelAddress: { type: String, unique: true },
}, { timestamps: true });

const ChannelModel = mongoose.model('Channel', userSchema);

export default ChannelModel;
