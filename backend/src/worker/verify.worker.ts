import verify from '@/services/verify.service';
import Queue from 'bee-queue';

const { sendVerificationEmail } = verify;

const verifyWorker = {
  verifyEmailQueue: new Queue('verify-email', {
    removeOnSuccess: true,
    removeOnFailure: true,
  }),

  init() {
    verifyWorker.verifyEmailQueue.process(async (job) => {
      try {
        const { email, id } = job.data as { email: string; id: string };
        await sendVerificationEmail(email, id);
      } catch (err) {
        console.error(err);
      }
    });
  },

  addJobVerifyEmailToQueue: async (data: { email: string; id: string }) => {
    try {
      const job = await verifyWorker.verifyEmailQueue
        .createJob(data)
        .timeout(5000)
        .retries(3)
        .save();

      job.on('succeeded', (result) => {
        console.log(result);
      });

      job.on('failed', (err) => {
        console.log(err);
      });

      job.on('retrying', (err) => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
    }
  },
};

verifyWorker.init();

export default verifyWorker;
