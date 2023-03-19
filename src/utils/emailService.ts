import nodemailer, { SendMailOptions } from 'nodemailer';

interface EmailOptions {
    service?: string;
    host?: string;
    port?: number;
    auth: {
      user: string;
      pass: string;
    };
  }
  
class EmailService {
  private transporter: any;

  constructor(private options: EmailOptions) {
    this.transporter = nodemailer.createTransport(options);
  }

  public async sendMail(mailOptions: SendMailOptions): Promise<void> {
    await this.transporter.sendMail(mailOptions);
  }
}

/**
 * Returns an instance of an email service based on the default email provider set in environment variables.
 * 
 * @returns An instance of an email service.
 */
const getEmailService = (): EmailService => {

    const emailProviders: { [key: string]: () => EmailService } = {
      gmail: () =>
        new EmailService({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD,
          },
        }),
      mailtrap: () =>
        new EmailService({
          host: process.env.MAILTRAP_HOST,
          port: 2525,
          auth: {
            user: process.env.MAILTRAP_USERNAME,
            pass: process.env.MAILTRAP_PASSWORD,
          },
        }),
    };
  
    const defaultEmailProvider =
      process.env.DEFAULT_EMAIL_PROVIDER?.toLowerCase() || 'mailtrap';
  
    if (!emailProviders[defaultEmailProvider]) {
      throw new Error(
        `Invalid email provider '${defaultEmailProvider}'. Supported providers are ${Object.keys(
          emailProviders
        ).join(', ')}`
      );
    }
  
    return emailProviders[defaultEmailProvider]();
  };

/**
 * Sends an email using the default email provider specified in the environment variables.
 * 
 * @param email - The recipient(s) email address.
 * @param subject - The subject of the email.
 * @param html - The HTML content of the email.
 * @returns Promise<void>
 */
const sendEmail = async (to: string | string[], subject: string, html: string): Promise<void> => {
    const emailService = getEmailService();

    const mailOptions = {
        from: process.env.EMAIL_SENDER,
        to: Array.isArray(to) ? to.join(',') : to,
        subject: subject,
        html: html,
    };

    await emailService.sendMail(mailOptions);
};

export default sendEmail;
