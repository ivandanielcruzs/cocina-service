import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { NotificationService } from 'src/infra/notification/notification.service';
import { IJobData } from './interface/jobdata.interface';
import { IUserRepository } from 'src/infra/database/interfaces/repositories/user.repository';

@Processor('supply-confirmation')
@Injectable()
export class OrderWorkerService extends WorkerHost {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly notification: NotificationService,
  ) {
    super();
  }

  async process(job: Job): Promise<void> {
    const { orderId } = job.data as IJobData;
    // const user = await this.userRepository.findByUserName('chef_1');
    console.log(
      'notificando que la orden ha sido suplida y se puede empezar a preparar el platillo',
    );
    const body = {
      orderId,
      extraInsctructions:
        'La orden ha sido suplida, puede continuar su elaboración',
    };
    const user = await this.userRepository.findByUserName('chef_1');
    console.info('se envía al token', user?.token);
    if (user?.token) {
      await this.notification.sendNotification(
        user?.token,
        'Orden suplida, puede continuar',
        JSON.stringify(body),
      );
    }
  }
}
