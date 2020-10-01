import React, { FormEvent, useContext, useEffect, useRef, useState } from 'react';

import StoppedTextField from '../../components/StoppedTextField';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import ButtonLoading from '../../components/ButtonLoading';
import StatusPage from '../StatusPage';
import AuthContext from '../../contexts/auth';

import PageHeader from '../../components/PageHeader';
import userNotFoundImage from '../../assets/images/user_not_found.jpg';
import cameraIcon from "../../assets/images/icons/camera.svg";
import warningIcon from "../../assets/images/icons/warning.svg";

import {
  Container,
  ProfileContainer,
  ProfileImageContainer,
  ProfileProps,
  ProfileImage,
  BadgeButton,
  ProfileName,
  ProfileWorkspace,
  InputGroup,
  FormContainer,
  EmptyScheduleItems,
  ScheduleItemContainer
} from './styles';

const ProfilePage: React.FC = () => {

  const { api } = useContext(AuthContext)

  const [buttonLoading, setButtonLoading] = useState(false);
  const [choosedAvatar, setChoosedAvatar] = useState<{ file: File, preview: string } | null>(null);
  const [name, setName] = useState("");
  const [error, setError] = useState('');
  const [registed, setRegisted] = useState(false);
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState('');
  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: "", from: "", to: "" },
  ]);

  const chooseFileRef = useRef<HTMLInputElement>(null)

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
      await api.put('/classes', {
        name,
        last_name,
        whatsapp,
        bio,
        avatar,
        subject,
        cost,
        schedule: scheduleItems
      })

      if (choosedAvatar) {
        const avatarData = new FormData();

        avatarData.append('file', choosedAvatar.file)

        await api.put('/teacher_image', avatarData)
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
      const responseUser = await api.get('/users')

      if (responseUser && responseUser.data) {
        const userData = responseUser.data;

        setName(userData.name)
        setLastName(userData.last_name)
        setEmail(userData.email)
      }

      if (responseClasses && responseClasses.data) {
        const classesData = responseClasses.data;

        setSubject(classesData.subject);
        setCost(classesData.cost);
        setScheduleItems(classesData.schedules);
        setAvatar(classesData.avatar);
        setBio(classesData.bio);
        setWhatsapp(classesData.whatsapp);
      }
    }
    )()
  }, [api])

  if (registed) {
    return <StatusPage
      type={error ? 'error' : 'success'}
      title={error
        ? 'Atualização falhou'
        : 'Atualização salva'
      }
      description={
        !error
          ? 'Tudo certo, seu cadastro foi atualizado.'
          : error
      }
      buttonText={
        error
          ? 'Voltar'
          : 'Ver cadastro'
      }
      buttonTo='/'
    />
  }

  function handleUpload() {
    chooseFileRef.current?.click()
  }

  return (
    <Container>
      <PageHeader namePage='Meu Perfil'>
        <ProfileContainer>
          <ProfileProps>
            <ProfileImageContainer>
              <BadgeButton onClick={handleUpload}>
                <input
                  ref={chooseFileRef}
                  type='file'
                  accept='image/*'
                  hidden
                  onChange={
                    e => {

                      const { files } = e.target

                      if (files)
                        setChoosedAvatar({
                          file: files[0],
                          preview: URL.createObjectURL(files[0])
                        })
                    }
                  }
                />
                <img src={cameraIcon} alt="Upload de Foto" />
              </BadgeButton>
              <ProfileImage image={
                !choosedAvatar
                  ? avatar
                    ? `http://localhost:3333/images/${avatar}`
                    : userNotFoundImage
                  : choosedAvatar.preview
              } />
            </ProfileImageContainer>
            <ProfileName>
              {`${name} ${last_name}`}
            </ProfileName>
            <ProfileWorkspace>
              {subject}
            </ProfileWorkspace>
          </ ProfileProps>
        </ProfileContainer>
      </PageHeader>
      <main>
        <FormContainer onSubmit={handleSubmit}>
          <fieldset>
            <legend>Seus Dados</legend>
            <InputGroup>
              <StoppedTextField
                name='name'
                label='Nome'
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <StoppedTextField
                name='last_name'
                label='Sobrenome'
                value={last_name}
                onChange={(event) => setLastName(event.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <StoppedTextField
                name='email'
                label='E-mail'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <StoppedTextField
                name='whatsapp'
                label='Whatsapp'
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
      </main>
    </Container >
  );
}

export default ProfilePage;