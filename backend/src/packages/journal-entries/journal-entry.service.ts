import { type Service } from '#libs/types/types.js';

import { JournalEntryEntity } from './journal-entry.entity.js';
import { type JournalEntryRepository } from './journal-entry.repository.js';
import {
  type JournalEntryCreateRequestDto,
  type JournalEntryGetAllItemResponseDto,
  type JournalEntryGetAllResponseDto,
} from './libs/types/types.js';

class JournalEntryService implements Service {
  private journalEntryRepository: JournalEntryRepository;

  public constructor(journalEntryRepository: JournalEntryRepository) {
    this.journalEntryRepository = journalEntryRepository;
  }

  public find(): ReturnType<Service['find']> {
    return Promise.resolve(null);
  }

  public async findAll(query: string): Promise<JournalEntryGetAllResponseDto> {
    const items = await this.journalEntryRepository.findAll(query);

    return {
      items: items.map((item) => {
        return item.toObject();
      }),
    };
  }

  public async create(
    payload: JournalEntryCreateRequestDto,
  ): Promise<JournalEntryGetAllItemResponseDto> {
    const item = await this.journalEntryRepository.create(
      JournalEntryEntity.initializeNew({
        title: payload.title,
        text: payload.text,
      }),
    );

    return item.toObject();
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Service['delete']> {
    return Promise.resolve(true);
  }
}

export { JournalEntryService };
