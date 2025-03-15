import { TASK } from "@/contants/enum";
import emailService from "@/services/email.service";
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
  constructor(task: string) {
    super(task);
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

const verifyEmail = new SendWorker(TASK.verifyEmail);
const forgotPassword = new SendWorker(TASK.forgotPassword);
verifyEmail.init();
forgotPassword.init();

export { verifyEmail, forgotPassword };
