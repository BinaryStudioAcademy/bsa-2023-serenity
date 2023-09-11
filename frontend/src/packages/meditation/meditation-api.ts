import { APIPath, ContentType } from '#libs/enums/enums.js';
import { BaseHttpApi } from '#libs/packages/api/api.js';
import { type HTTP } from '#libs/packages/http/http.js';
import { type Storage } from '#libs/packages/storage/storage.js';

import { MeditationApiPath } from './libs/enums/enums.js';
import {
  type MeditationEntryRequestDto,
  type MeditationEntryResponseDto,
} from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: HTTP;
  storage: Storage;
};

class MeditationApi extends BaseHttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: APIPath.MEDITATION, baseUrl, http, storage });
  }

  public async createMeditationEntry(
    payload: MeditationEntryRequestDto,
  ): Promise<MeditationEntryResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(MeditationApiPath.ROOT, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await response.json<MeditationEntryResponseDto>();
  }
}

export { MeditationApi };