import { type ContentType } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/value-of.type.js';

type MeditationEntryResponseDto = {
  topicName: string;
  mediaUrl: string;
  contentType: ValueOf<typeof ContentType>;
  createdAt: Date;
  updatedAt: Date;
};

export { type MeditationEntryResponseDto };
