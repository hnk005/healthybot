import emailService from "@/services/email.service";
import { logger } from "@/utils/logger";
import Queue from "bee-queue";

const { sendOTP } = emailService;

class BaseWorker extends Queue {
  constructor(
    name: string,
    option = {
      removeOnSuccess: true,
      removeOnFailure: true,
    },
  ) {
    super(name, option);
  }

  init(processFunction: (job: any) => Promise<any>) {
    this.process(async (job) => {
      try {
        return await processFunction(job);
      } catch (err) {
        return err;
      }
    });
  }

  async createJobAndHandleEvents(data: any, jobData: any): Promise<string> {
    const job = await this.createJob(jobData).timeout(5000).retries(3).save();

    return new Promise((rs, rj) => {
      job.on("succeeded", (result) => {
        logger.info(`Job for ${data.email} succeeded`);
        rs(result);
      });

      job.on("failed", (err) => {
        rj(err);
      });

      job.on("retrying", (err) => {
        rj(err);
      });
    });
  }
}

class SendWorker extends BaseWorker {
  constructor(name: string) {
    super(name);
  }

  init() {
    super.init(async (job) => {
      const { email } = job.data as { email: string };
      return await sendOTP(email);
    });
  }

  async sendOTPEmail(data: { email: string }): Promise<string> {
    return this.createJobAndHandleEvents(data, { email: data.email });
  }
}

const verifyEmail = new SendWorker("verify-email");
verifyEmail.init();
const forgotPassword = new SendWorker("forgot-password");
forgotPassword.init();

export { verifyEmail, forgotPassword };
