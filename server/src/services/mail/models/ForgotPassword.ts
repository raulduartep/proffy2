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
    this.subject = 'Esqueci minha senha';
    this.html = `<p>Você esqueceu sua senha ? Não tem problema, clique no link: <a href="${url}">${url}<a></p>`;
  }

  async send() {
    try {
      await mailer.sendMail({
        to: this.to,
        from: this.from,
        subject: this.subject,
        html: this.html
      })
    }catch(err) {
      throw new Error('Cannot send verification email')
    }
  }
}

export default VerificationEmail;