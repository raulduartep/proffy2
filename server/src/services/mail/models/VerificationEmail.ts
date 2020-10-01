import mailer from '../mailer';
import jwt from 'jsonwebtoken';

class VerificationEmail {
  from: string
  to: string
  html: string
  subject: string

  constructor(email: string, url: string) {
    this.from = '"Next Level Week" noreply@nextlevelweek.com.br';
    this.to = email;
    this.subject = 'Verificação de e-mail';
    this.html = `<p>Para confirmar seu email, clique no link: <a href="${url}">${url}<a></p>`;
  }

  async send() {

    await mailer.sendMail({
      to: this.to,
      from: this.from,
      subject: this.subject,
      html: this.html
    })
  }
}

export default VerificationEmail;