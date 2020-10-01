import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import StatusPage from '../StatusPage';
import api from '../../services/publicApi';

const ConfimedEmail: React.FC = () => {

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const { token } = useParams();

  useEffect(() => {
    (async function(){
      try {
        await api.post(`/verify_email/${token}`)
      }catch(err) {
        setError(err.response.data.error)
      }

      setLoading(false)
    })()
  }, [token])

  return (
    <StatusPage
      type={ error ? 'error' : 'success' }
      title={ error ? 'Email não confirmado' : 'Email confirmado com sucesso' }
      description={
        error
          ? error
          : 'Agora você faz parte da plataforma da Proffy.'
      }
      buttonText='Início'
      buttonTo='/login'
      loading={loading}
    />
  );
}

export default ConfimedEmail;