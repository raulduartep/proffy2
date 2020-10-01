import React, { useState, useEffect, FormEvent, useContext } from 'react';

import AuthContext from '../../contexts/auth';

import PageHeader from '../../components/PageHeader';
import StoppedTextField from '../../components/StoppedTextField';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import StatusPage from '../StatusPage';
import ButtonLoading from '../../components/ButtonLoading';

import rocketIcon from '../../assets/images/icons/rocket.svg';
import warningIcon from "../../assets/images/icons/warning.svg";
import userNotFoundImage from '../../assets/images/user_not_found.jpg';

import {
  Container,
  Header,
  Emoji,
  InputGroup,
  ProfileContainer,
  ProfileImage,
  ProfileName,
  FormContainer,
  EmptyScheduleItems,
  ScheduleItemContainer
} from './styles';

const TeacherForm: React.FC = () => {

  const { api } = useContext(AuthContext)

  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [registed, setRegisted] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false)
  const [error, setError] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState('');
  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: "", from: "", to: "" },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: "", from: "", to: "" }]);
  }

  function deleteScheduleItem(position: number) {
    setScheduleItems(scheduleItems.filter((scheduleItem, index) =>
      index !== position
    ))
  }

  function setScheduleItemValue(position: number, field: string, value: string) {

    const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {

      if (index === position) {
        return { ...scheduleItem, [field]: value }
      }

      return scheduleItem
    })

    setScheduleItems(updateScheduleItems)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setButtonLoading(true)

    try {
      if (isTeacher) {
        await api.put('/classes', {
          whatsapp,
          bio,
          avatar,
          subject,
          cost,
          schedule: scheduleItems
        })

      } else {
        await api.post('/classes', {
          whatsapp,
          bio,
          avatar,
          subject,
          cost,
          schedule: scheduleItems
        })
      }

    } catch (err) {
      setError(err.response.data.error)
    }

    setButtonLoading(false)
    setRegisted(true)
  }

  useEffect(() => {
    (async () => {
      const responseClasses = await api.get(`/classes`);
      const responseUser = await api.get('/users');

      if (responseUser && responseUser.data) {
        const userData = responseUser.data;

        setName(userData.name);
        setLastName(userData.last_name);
      }

      if (responseClasses && responseClasses.data) {
        const classesData = responseClasses.data;

        setSubject(classesData.subject);
        setCost(classesData.cost);
        setScheduleItems(classesData.schedules);
        setAvatar(classesData.avatar);
        setBio(classesData.bio);
        setWhatsapp(classesData.whatsapp);
        setIsTeacher(classesData.true)
      }
    }
    )()
  }, [api])

  if (registed) {
    return <StatusPage
      type={error ? 'error' : 'success'}
      title={
        isTeacher
          ? error
            ? 'Atualização falhou'
            : 'Atualização salva'
          : error
            ? 'Cadastro falhou'
            : 'Cadastro salvo'
      }
      description={
        !error
          ? isTeacher
            ? 'Tudo certo, seu cadastro foi atualizado.'
            : 'Tudo certo, seu cadastro está na nossa lista de professores. Agora é só ficar de olho no seu WhatsApp.'
          : error
      }
      buttonText={
        error
          ? 'Voltar'
          : 'Ver cadastro'
      }
      buttonTo={
        error
          ? '/'
          : '/profile'
      }
    />
  }

  return (
    <Container>

      <PageHeader namePage='Dar aulas'>
        <Header>
          <div>
            <h2>Que incrivel que você quer dar aulas</h2>
            <p>O primeiro passo é preencher esse formulário de inscrição.</p>
          </div>
          <Emoji>
            <div>
              <img src={rocketIcon} alt="Ícone de foguete" />
              <p>Prepare-se!<br /> vai ser o máximo</p>
            </div>
          </Emoji>
        </Header>
      </PageHeader>

      <main>
        <div>
          <FormContainer onSubmit={handleSubmit}>
            <fieldset>
              <legend>Seus Dados</legend>
              <InputGroup>
                <ProfileContainer>
                  <ProfileImage>
                    <img
                      src={
                        avatar
                          ? `http://localhost:3333/images/${avatar}`
                          : userNotFoundImage}
                      alt={`${name} ${last_name}`}
                    />
                  </ProfileImage>
                  <ProfileName>
                    {`${name} ${last_name}`}
                  </ProfileName>
                </ProfileContainer>
                <StoppedTextField
                  name='whatsapp'
                  label='Whatsapp'
                  required
                  value={whatsapp}
                  onChange={(event) => setWhatsapp(event.target.value)}
                  className='little-input'
                />

              </InputGroup>
              <TextArea
                name='bio'
                label='Biografia'
                value={bio}
                onChange={(event) => setBio(event.target.value)}
              />
            </fieldset>

            <fieldset>
              <legend>Sobre a aula</legend>
              <InputGroup>
                <Select
                  name='subject'
                  label='Matéria'
                  required
                  value={subject}
                  onChangeValue={(value) => setSubject(value)}
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
                />
                <StoppedTextField
                  name='cost'
                  required
                  label='Custo hora/aula'
                  className='little-input'
                  value={cost}
                  onChange={(event) => setCost(event.target.value)}
                />
              </InputGroup>
            </fieldset>

            <fieldset>
              <legend>
                Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                  + Novo horário
              </button>
              </legend>

              {
                scheduleItems.length === 0
                  ? <EmptyScheduleItems>
                    Sem horários para mostrar
                  </EmptyScheduleItems>
                  : scheduleItems.map((scheduleItem, index) => (
                    <ScheduleItemContainer key={index} className="schedule-item">
                      <div>
                        <Select
                          name="week_day"
                          label="Dia da semana"
                          value={scheduleItem.week_day}
                          onChangeValue={text => setScheduleItemValue(index, 'week_day', text)}
                          options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda' },
                            { value: '2', label: 'Terça' },
                            { value: '3', label: 'Quarta' },
                            { value: '4', label: 'Quinta' },
                            { value: '5', label: 'Sexta' },
                            { value: '6', label: 'Sábado' },
                          ]}
                        />
                        <StoppedTextField
                          name="from"
                          label="Das"
                          type="time"
                          value={scheduleItem.from}
                          onChange={event => setScheduleItemValue(index, 'from', event.target.value)}
                          className='tiny-input'
                        />
                        <StoppedTextField
                          name="to"
                          label="Até"
                          type="time"
                          value={scheduleItem.to}
                          onChange={event => setScheduleItemValue(index, 'to', event.target.value)}
                          className='tiny-input'
                        />
                      </div>
                      <button type='button' onClick={() => deleteScheduleItem(index)}>
                        Excluir horário
                  </button>
                    </ScheduleItemContainer>
                  ))
              }
            </fieldset>

            <footer>
              <p>
                <img src={warningIcon} alt="Aviso Importante" />
                Importante! <br />
                Preencha todos os dados
              </p>
              <ButtonLoading loading={buttonLoading} type="submit">Salvar cadastro</ButtonLoading>
            </footer>
          </FormContainer>
        </div>
      </main>

    </Container>
  );
}

export default TeacherForm;