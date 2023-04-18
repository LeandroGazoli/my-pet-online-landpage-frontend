import styles from './styles.module.scss';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { TailSpin } from 'react-loader-spinner';
import { useState } from 'react';
import { api } from '@/services/apiClient';

const schema = yup.object().shape({
  name: yup.string().min(3).required(),
});

export default function HeroForms() {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const MySwal = withReactContent(Swal);

  const onSubmitHandle = async (data: any) => {
    setLoading(true);

    try {
      await api.post('/personagem', data);

      MySwal.fire({
        title: 'Obrigado por contribuir.',
        icon: 'success',
      });
      setLoading(false);
      reset();
    } catch (error: any) {
      MySwal.fire({
        title: 'Error',
        icon: 'error',
        text: error?.request.response ? JSON.parse(error?.request.response).error : 'Error desconhecido',
      });

      setLoading(false);
    }
  };

  return (
    <div className={styles.forms}>
      <form onSubmit={handleSubmit(onSubmitHandle)}>
        <div className={styles['mb-3']}>
          <label htmlFor="name">Sugira nomes para os super-heróis!</label>
          <input
            type="text"
            required
            placeholder="Nome dos personagens"
            className={`${errors?.name ? styles.invalid : ''}`}
            {...register('name')}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button
            className={styles.button}
            disabled={loading}
          >
            {!loading ? (
              'Salvar'
            ) : (
              <TailSpin
                height="20"
                width="20"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
