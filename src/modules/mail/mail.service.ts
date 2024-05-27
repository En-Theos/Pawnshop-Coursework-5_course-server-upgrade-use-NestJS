import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
    transporter: nodemailer.Transporter<SentMessageInfo>

    constructor (
        private readonly configService: ConfigService
    ) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>("mail_host"),
            port: +this.configService.get<number>("mail_port"),
            secure: false,
            auth: {
                user: this.configService.get<string>("mail_user"),
                pass: this.configService.get<string>("mail_password")
            }
        })
    }

    async sendActivationMail(toEmail: string, activatedLink: string) {
        await this.transporter.sendMail({
            from: "en.popyk.oleksandr@gmail.com",
            to: toEmail,
            subject: "Активація акаунта на сайті Ломбард 'Перспектива'",
            text: '',
            html: `
                <div>
                    <h1>Для активації перейдіть за посиланням</h1>
                    <a href="${activatedLink}">${activatedLink}</a>
                </div>
            `
        })
    }
}
