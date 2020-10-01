import React from 'react';

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";
import userNotFoundImage from '../../assets/images/user_not_found.jpg';

import { Container, Schedule, Schedules, Avatar } from './styles';

export interface Schedule {
  week_day: number;
  to: number;
  from: number
}

export interface Classe {
  id: number;
  subject: string;
  cost: number;
  name: string;
  last_name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  schedules: Array<Schedule>;
}

interface ClasseItemProps {
  classe: Classe;
}

const ClasseItem: React.FC<ClasseItemProps> = ({ classe }) => {

  function createNewConnection() {

  }

  const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

  return (
    <Container>
      <header>
        <Avatar
          image={
            classe.avatar
              ? `http://localhost:3333/images/${classe.avatar}`
              : userNotFoundImage}
        />
        <div>
          <strong>{`${classe.name} ${classe.last_name}`}</strong>
          <span>{classe.subject}</span>
        </div>
      </header>

      <p>{classe.bio}</p>

      <Schedules>
        {
          days.map((day, index) => {

            const schedule = classe.schedules.find(schedule => Number(schedule.week_day) === index)

            if (schedule) {

              return (
                <Schedule disabled={false} key={index}>
                  <div>
                    <div>
                      <p>Dia</p>
                      <strong>{day}</strong>
                    </div>
                    <div>
                      <p>Horário</p>
                      <strong>{`${schedule.from}h - ${schedule.to}h`}</strong>
                    </div>
                  </div>
                </Schedule>
              )
            }

            return (
              <Schedule disabled={true} key={index}>
                <div>
                  <div>
                    <p>Dia</p>
                    <strong>{day}</strong>
                  </div>
                  <div>
                    <p>Horário</p>
                    <strong>-</strong>
                  </div>
                </div>
              </Schedule>
            )
          })
        }
      </Schedules>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {classe.cost}</strong>
        </p>
        <a
          onClick={createNewConnection}
          target="_blank"
          href={`https://wa.me/${classe.whatsapp}`}
          type="button"
          rel='noopener noreferrer'
        >
          <img src={whatsappIcon} alt="WhatsApp" />
          Entrar em contato
        </a>
      </footer>
    </Container>
  );
}

export default ClasseItem;