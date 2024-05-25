import { EChatSender } from 'app/core/enums';

export interface ISharedChatComponentProps {
  petName: string;
}

export interface IChatMessage {
  message: string;
  sender: EChatSender;
}
