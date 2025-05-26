import { Reserve } from '@entity/entities';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  sendCreationEmail() {
    throw new Error('Method not implemented.');
  }
  private transporter;
  private appName: string;
  private appUrl: string;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('EMAIL_HOST'),
      port: this.configService.get('EMAIL_PORT'),
      secure: this.configService.get('EMAIL_SECURE') === 'true',
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      },
    });

    this.appName = this.configService.get('APP_NAME') || 'COWTEL';
    this.appUrl = this.configService.get('APP_URL') || 'https://COWTEL.com';
  }
  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    const mailOptions = {
      from: `"${this.appName}" <${this.configService.get('EMAIL_USER')}>`,
      to: email,
      subject: 'Bienvenido a COWTEL',
      html: this.getWelcomeEmailTemplate(name),
    };

    await this.transporter.sendMail(mailOptions);
  }
  async sendReserveCreationEmail(email: string, name: string): Promise<void> {
    const mailOptions = {
      from: `"${this.appName}" <${this.configService.get('EMAIL_USER')}>`,
      to: email,
      subject: 'Tu reserva ha sido creada',
      html: this.getReserveCreationEmailTemplate(name),
    };
    await this.transporter.sendMail(mailOptions);
  }
  async sendReserveConfirmationEmail(
    email: string,
    name: string,
  ): Promise<void> {
    const mailOptions = {
      from: `"${this.appName}" <${this.configService.get('EMAIL_USER')}>`,
      to: email,
      subject: 'Tu reserva ha sido aprobada',
      html: this.getReservationConfirmationEmailTemplate(name),
    };
    await this.transporter.sendMail(mailOptions);
  }
  async sendReserveRejectionEmail(email: string, name: string): Promise<void> {
    const mailOptions = {
      from: `"${this.appName}" <${this.configService.get('EMAIL_USER')}>`,
      to: email,
      subject: 'Tu reserva ha sido rechazada',
      html: this.getReservationRejectionEmailTemplate(name),
    };
    await this.transporter.sendMail(mailOptions);
  }
  async sendReserveNotificationEmail(
    email: string,
    name: string,
    reservation: Reserve,
  ): Promise<void> {
    const mailOptions = {
      from: `"${this.appName}" <${this.configService.get('EMAIL_USER')}>`,
      to: email,
      subject: 'Reserva por aprobar',
      html: this.getReserveNotificationEmailTemplate(name, reservation),
    };
    await this.transporter.sendMail(mailOptions);
  }
  private getReserveNotificationEmailTemplate(
    name: string,
    reservation: Reserve,
  ): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reserva a autorizar</title>
      <style>
        body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333333;
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
        }
        .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #d8ccf4;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header {
        text-align: center;
        padding: 20px 0;
        border-bottom: 1px solid #eeeeee;
        }
        .logo {
        max-height: 60px;
        margin-bottom: 10px;
        }
        .content {
        padding: 30px 20px;
        text-align: center;
        }
        .footer {
        text-align: center;
        padding-top: 20px;
        margin-top: 20px;
        color: #888888;
        font-size: 0.9em;
        border-top: 1px solid #eeeeee;
        }
        .text-highlight {
        color: #c06cb2;
        font-weight: 600;
        }
        .btn {
        display: inline-block;
        background-color: #c06cb2;
        color: white;
        text-decoration: none;
        padding: 12px 25px;
        border-radius: 5px;
        font-weight: bold;
        margin-top: 15px;
        transition: background-color 0.3s;
        }
        .btn:hover {
        background-color: #915487;
        }
        .warning {
        background-color: #db99d0;
        padding: 15px;
        border-radius: 5px;
        margin-top: 30px;
        font-size: 0.9em;
        color: #856404;
        border-left: 4px solid #ffd54f;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>BIENVENIDO A ${this.appName}</h1>
        </div>
        <div class="content">
          <p>Ey <span class="text-highlight">${name}</span>,</p>
          <p>La reserva ${reservation.id} esta pendiente de aprobacion.</p>
          <p>Rapido el tiempo apremia.</p
          <img src="asensoristaesperando.png">
          <p></p>
          
          <div class="warning">
            <p>Si no reconoces esta actividad, por favor contacta a nuestro equipo de soporte.</p>
          </div>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ${this.appName}. Todos los derechos reservados.</p>
          <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
        </div>
      </div>
    </body>
    </html>
    `;
  }
  private getReservationRejectionEmailTemplate(name: string): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tu reserva ha sido rechazada</title>
      <style>
        body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333333;
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
        }
        .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #d8ccf4;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header {
        text-align: center;
        padding: 20px 0;
        border-bottom: 1px solid #eeeeee;
        }
        .logo {
        max-height: 60px;
        margin-bottom: 10px;
        }
        .content {
        padding: 30px 20px;
        text-align: center;
        }
        .footer {
        text-align: center;
        padding-top: 20px;
        margin-top: 20px;
        color: #888888;
        font-size: 0.9em;
        border-top: 1px solid #eeeeee;
        }
        .text-highlight {
        color: #c06cb2;
        font-weight: 600;
        }
        .btn {
        display: inline-block;
        background-color: #c06cb2;
        color: white;
        text-decoration: none;
        padding: 12px 25px;
        border-radius: 5px;
        font-weight: bold;
        margin-top: 15px;
        transition: background-color 0.3s;
        }
        .btn:hover {
        background-color: #915487;
        }
        .warning {
        background-color: #db99d0;
        padding: 15px;
        border-radius: 5px;
        margin-top: 30px;
        font-size: 0.9em;
        color: #856404;
        border-left: 4px solid #ffd54f;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>BIENVENIDO A ${this.appName}</h1>
        </div>
        <div class="content">
          <p>Ey <span class="text-highlight">${name}</span>,</p>
          <p>Tu reserva ha sido rechazada :(</p>
          <img src="asensoristatriste.png">
          <p></p>
          
          <div class="warning">
            <p>Si no reconoces esta actividad, por favor contacta a nuestro equipo de soporte.</p>
          </div>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ${this.appName}. Todos los derechos reservados.</p>
          <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
        </div>
      </div>
    </body>
    </html>
    `;
  }
  private getReservationConfirmationEmailTemplate(name: string): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tu reserva ha sido aprobada</title>
      <style>
        body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333333;
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
        }
        .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #d8ccf4;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header {
        text-align: center;
        padding: 20px 0;
        border-bottom: 1px solid #eeeeee;
        }
        .logo {
        max-height: 60px;
        margin-bottom: 10px;
        }
        .content {
        padding: 30px 20px;
        text-align: center;
        }
        .footer {
        text-align: center;
        padding-top: 20px;
        margin-top: 20px;
        color: #888888;
        font-size: 0.9em;
        border-top: 1px solid #eeeeee;
        }
        .text-highlight {
        color: #c06cb2;
        font-weight: 600;
        }
        .btn {
        display: inline-block;
        background-color: #c06cb2;
        color: white;
        text-decoration: none;
        padding: 12px 25px;
        border-radius: 5px;
        font-weight: bold;
        margin-top: 15px;
        transition: background-color 0.3s;
        }
        .btn:hover {
        background-color: #915487;
        }
        .warning {
        background-color: #db99d0;
        padding: 15px;
        border-radius: 5px;
        margin-top: 30px;
        font-size: 0.9em;
        color: #856404;
        border-left: 4px solid #ffd54f;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>BIENVENIDO A ${this.appName}</h1>
        </div>
        <div class="content">
          <p>Ey <span class="text-highlight">${name}</span>,</p>
          <p>Tu reserva ha sido aprobada Yeiiiiiiiii</p>
          <img src="asensoristaaprobando.png">
          <p></p>
          
          <div class="warning">
            <p>Si no reconoces esta actividad, por favor contacta a nuestro equipo de soporte.</p>
          </div>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ${this.appName}. Todos los derechos reservados.</p>
          <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
        </div>
      </div>
    </body>
    </html>
    `;
  }
  private getReserveCreationEmailTemplate(name: string): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tu reserva ha sido creada</title>
      <style>
        body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333333;
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
        }
        .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #d8ccf4;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header {
        text-align: center;
        padding: 20px 0;
        border-bottom: 1px solid #eeeeee;
        }
        .logo {
        max-height: 60px;
        margin-bottom: 10px;
        }
        .content {
        padding: 30px 20px;
        text-align: center;
        }
        .footer {
        text-align: center;
        padding-top: 20px;
        margin-top: 20px;
        color: #888888;
        font-size: 0.9em;
        border-top: 1px solid #eeeeee;
        }
        .text-highlight {
        color: #c06cb2;
        font-weight: 600;
        }
        .btn {
        display: inline-block;
        background-color: #c06cb2;
        color: white;
        text-decoration: none;
        padding: 12px 25px;
        border-radius: 5px;
        font-weight: bold;
        margin-top: 15px;
        transition: background-color 0.3s;
        }
        .btn:hover {
        background-color: #915487;
        }
        .warning {
        background-color: #db99d0;
        padding: 15px;
        border-radius: 5px;
        margin-top: 30px;
        font-size: 0.9em;
        color: #856404;
        border-left: 4px solid #ffd54f;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>BIENVENIDO A ${this.appName}</h1>
        </div>
        <div class="content">
          <p>Ey <span class="text-highlight">${name}</span>,</p>
          <p>Has reservado una habitación.</p>
          <p>Gracias por tu reserva.</p>
          <p>Se te notificará cuando esta haya sido confirmada.</p>
          <img src="asensoristajoy.png">
          <p></p>
          
          <div class="warning">
            <p>Si no reconoces esta actividad, por favor contacta a nuestro equipo de soporte.</p>
          </div>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ${this.appName}. Todos los derechos reservados.</p>
          <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
        </div>
      </div>
    </body>
    </html>
    `;
  }
  private getWelcomeEmailTemplate(name: string): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bienvenido a COWTEL</title>
      <style>
        body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333333;
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
        }
        .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #d8ccf4;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header {
        text-align: center;
        padding: 20px 0;
        border-bottom: 1px solid #eeeeee;
        }
        .logo {
        max-height: 60px;
        margin-bottom: 10px;
        }
        .content {
        padding: 30px 20px;
        text-align: center;
        }
        .footer {
        text-align: center;
        padding-top: 20px;
        margin-top: 20px;
        color: #888888;
        font-size: 0.9em;
        border-top: 1px solid #eeeeee;
        }
        .text-highlight {
        color: #c06cb2;
        font-weight: 600;
        }
        .btn {
        display: inline-block;
        background-color: #c06cb2;
        color: white;
        text-decoration: none;
        padding: 12px 25px;
        border-radius: 5px;
        font-weight: bold;
        margin-top: 15px;
        transition: background-color 0.3s;
        }
        .btn:hover {
        background-color: #915487;
        }
        .warning {
        background-color: #db99d0;
        padding: 15px;
        border-radius: 5px;
        margin-top: 30px;
        font-size: 0.9em;
        color: #856404;
        border-left: 4px solid #ffd54f;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>BIENVENIDO A ${this.appName}</h1>
        </div>
        <div class="content">
          <p>Hola <span class="text-highlight">${name}</span>,</p>
          <p>Gracias por registrarte en <strong>${this.appName}</strong>.
          <img src="asensoristasaludo.png">
          <p></p>
          
          <a href="${this.appUrl}/verify" class="btn">iniciar sesion</a>
          
          <div class="warning">
            <p>Si no solicitaste este código, puedes ignorar este correo. Si no reconoces esta actividad, por favor contacta a nuestro equipo de soporte.</p>
          </div>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ${this.appName}. Todos los derechos reservados.</p>
          <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
        </div>
      </div>
    </body>
    </html>
    `;
  }
}
