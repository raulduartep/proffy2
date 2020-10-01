import React, { FormEvent, useState, useContext } from 'react';
import AuthContext from '../../contexts/auth';

import PageHeader from '../../components/PageHeader';
import ClasseItem, { Classe } from '../../components/ClasseItem';
import Select from '../../components/Select';
import StoppedTextField from '../../components/StoppedTextField';

import teachersFoundIcon from '../../assets/images/icons/teachers_found.svg';

import {
  Container,
  Header,
  ContainerTitle,
  Emoji,
  NoClasses,
} from './styles';

const TeacherList: React.FC = () => {

  const { api } = useContext(AuthContext)

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [classes, setClasses] = useState([])

  async function searchTeacher(event: FormEvent) {
    event.preventDefault()

    const response = await api.get('classes_by_filters', {
      params: {
        subject,
        week_day,
        time
      }
    })

    setClasses(response.data);
  }

  return (
    <Container>
      <PageHeader namePage='Estudar'>
        <Header>
          <ContainerTitle>
            <div>
              <h2>Estes são os proffys disponíveis.</h2>
            </div>
            <Emoji>
              <img src={teachersFoundIcon} alt="Ícone de foguete" />
              <p>Prepare-se!<br /> vai ser o máximo</p>
            </Emoji>
          </ContainerTitle>
          <form onSubmit={searchTeacher}>
            <Select
              name='subject'
              label='Matéria'
              value={subject}
              onChangeValue={value => setSubject(value)}
              options={[
                { value: "Artes", label: "Artes" },
                { value: "Biologia", label: "Biologia" },
                { value: "Ciências", label: "Ciências" },
                { value: "Eduacação física", label: "Eduacação física" },
                { value: "Geografia", label: "Geografia" },
                { value: "História", label: "História" },
                { value: "Matemática", label: "Matemática" },
                { value: "Português", label: "Português" },
                { value: "Química", label: "Química" },
              ]}
              className='input-block'
            />
            <Select
              name="week_day"
              label="Dia da semana"
              value={week_day}
              onChangeValue={value => setWeekDay(value)}
              options={[
                { value: '0', label: 'Domingo' },
                { value: '1', label: 'Segunda' },
                { value: '2', label: 'Terça' },
                { value: '3', label: 'Quarta' },
                { value: '4', label: 'Quinta' },
                { value: '5', label: 'Sexta' },
                { value: '6', label: 'Sábado' },
              ]}
              className='input-block'
            />
            <StoppedTextField
              name="time"
              label="Hora"
              type="time"
              value={time}
              onChange={event => setTime(event.target.value)}
              className='input-block little-input'
            />
            <button type="submit">
              Buscar
            </button>
          </form>
        </Header>
      </PageHeader>

      <main>
        <div>
          {
            classes.length !== 0
              ? classes.map((classe: Classe) => (
                <ClasseItem key={classe.id} classe={classe} />
              ))
              : <NoClasses>Nenhum professor encontrado com sua pesquisa.</NoClasses>
          }
        </div>
      </main>
    </Container>
  );
}

export default TeacherList;