import {Inject} from '@nestjs/common';
import {IEventRepository} from '../Repository/IEventRepository';
import {Event} from '../Event.entity';

export class IsMaximumTimeSpentReached {
  constructor(
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository
  ) {}

  public async isSatisfiedBy(event: Event): Promise<boolean> {
    const timeSpent = await this.eventRepository.getDayTimeSpentByUser(
      event.getUser(),
      event.getDate()
    );

    return timeSpent + event.getTime() > Event.MAXIMUM_TIMESPENT_PER_DAY;
  }
}
