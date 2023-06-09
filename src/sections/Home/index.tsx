import Image from 'next/image';
import styles from './styles.module.scss';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { api } from '@/services/apiClient';
import InputMask from 'react-input-mask';

import { TailSpin } from 'react-loader-spinner';
import HeroForms from '@/components/HeroForms';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().min(3).required(),
  telefone: yup
    .string()
    .matches(/^\s*(\(\d{2}\)|\d{2}|\d{0})[-. ]?(9|\d{1})[-. ]?(\d{4})[-. ]?(\d{4})[-. ]?\s*$/, 'Telefone inválido')
    .required(),
  personName: yup.string(),
});

export default function HomeSection() {
  const [token, setToken] = useState<string | undefined>();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = useState<boolean>(false);
  const [ping, setPing] = useState<boolean>(true);

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    const token_key = await executeRecaptcha('MyPetOnlinePesquisaDeCampo');
    // Do whatever you want with the token

    setToken(token_key);
  }, [executeRecaptcha]);

  // You can use useEffect to trigger the verification as soon as the component being loaded
  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  useEffect(() => {
    if (ping) {
      const getping = async () => {
        const res = await api.get('/');

        return res;
      };
      getping()
        .then(() => setPing(false))
        .catch(() => setPing(false));
      setPing(false);
    }
  }, [ping]);

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
    data[`g-recaptcha-response`] = token;
    setLoading(true);

    try {
      await api.post('/', data);

      MySwal.fire({
        title: 'Obrigado por fazer parte dessa pesquisa.',
        icon: 'success',
        text: 'Você compartilharia essa pesquisa com seus contatos para engajar mais super-heróis My Pet On-line?',
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: 'SIM',
        denyButtonText: 'NÃO',
      }).then((result) => {
        if (result.isConfirmed) {
          navigator.clipboard.writeText(location.href);
          if (screen.width < 1024) {
            navigator.share({
              title: 'O título da sua página',
              text: 'Fiz minha parte, agora é sua vez!',
              url: location.href,
            });
          }

          toast.success('Link Copiado com sucesso!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        }
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
    <section className={styles.wrapper}>
      <div className={`${styles.content} ${styles.container}`}>
        <div className={styles.title}>
          <p>Salve vidas! Participe da pesquisa de como se tornar um super-herói do "MY PET ONLINE" e ajudar a SALVAR VIDAS!!</p>
        </div>
        <div className={styles.flex}>
          <div className={styles.informative}>
            <p className={styles.subTitulo}>Junte-se a nós e seja também um super-herói "MY PET ONLINE"!</p>
            <p className={styles.text}>Você sabia que existem cerca de 30 milhões de cães e gatos abandonados no Brasil?</p>
            <p className={styles.text}>
              Ao saber destes dados, estamos conduzindo uma pesquisa para entender melhor a sua opinião sobre a possibilidade de você poder alimentar PETS ONLINE, através de um
              app.
            </p>
            <p className={styles.text}>
              Sua participação, nesta PESQUISA, é fundamental para alcançarmos a VALIDAÇÃO destes nobres objetivos e salvarmos vidas JUNTOS! Aproveite esta oportunidade de
              contribuir com informações para esta causa tão importante! Basta responder, rapidamente, esta pesquisa!
            </p>
            <Image
              src={require('./superHero.svg')}
              alt=""
              className={styles.carton}
            />
            {/* <HeroForms  /> */}
            <div
              className={styles.forms}
              style={{
                width: '100%',
                padding: '1rem',
                marginBottom: '0.3rem',
                backgroundColor: 'transparent',
              }}
            >
              <div className={styles['mb-3']}>
                <label htmlFor="name">Sugira nomes para os super-heróis!</label>
                <input
                  type="text"
                  placeholder="Nome dos personagens"
                  className={`${errors?.name ? styles.invalid : ''}`}
                  {...register('personName')}
                />
              </div>
            </div>
          </div>
          <div className={styles.forms}>
            <form onSubmit={handleSubmit(onSubmitHandle)}>
              <p className={styles.formTitle}>Você pode salvar vidas com essa pesquisa</p>
              <p className={styles.formSubtitle}>Pois, ao se tornar super-herói do "MY PET ONLINE", você poderá contribuir na saúde e bem-estar dos Pets adotados!</p>
              <div className={styles['mb-3']}>
                <label htmlFor="name">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Nome completo"
                  className={`${errors?.name ? styles.invalid : ''}`}
                  {...register('name')}
                />
              </div>
              <div className={styles['mb-3']}>
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  required
                  placeholder="Seu email"
                  className={`${errors?.email ? styles.invalid : ''}`}
                  {...register('email')}
                />
              </div>
              <div className={styles['mb-3']}>
                <label htmlFor="telefone">Telefone</label>
                <InputMask
                  mask="(99) 9 9999-9999"
                  type="text"
                  required
                  placeholder="Número de telefone"
                  className={`${errors?.telefone ? styles.invalid : ''}`}
                  {...register('telefone')}
                />
                {errors?.telefone && typeof errors?.telefone.message === 'string' && <span>{errors?.telefone?.message}</span>}
              </div>
              <p>Qual a sua opinião de participar desta iniciativa e poder alimentar um Pet a distância, se tornando um(a) super-herói My Pet Online?</p>
              <div className={`${styles['mb-3']} ${styles.formCheck}`}>
                <div>
                  <input
                    className={styles['form-check-input']}
                    type="radio"
                    id="iniciativa1"
                    defaultValue="Ruim"
                    {...register('iniciativa')}
                  />
                  <label
                    className={styles['form-check-label']}
                    htmlFor="iniciativa1"
                  >
                    Ruim
                  </label>
                </div>

                <div>
                  <input
                    className={styles['form-check-input']}
                    type="radio"
                    defaultValue="Boa"
                    {...register('iniciativa')}
                    id="iniciativa2"
                  />
                  <label
                    className={styles['form-check-label']}
                    htmlFor="iniciativa2"
                  >
                    Boa
                  </label>
                </div>
                <div>
                  <input
                    className={styles['form-check-input']}
                    type="radio"
                    defaultValue="Excelente"
                    {...register('iniciativa')}
                    id="iniciativa3"
                  />
                  <label
                    className={styles['form-check-label']}
                    htmlFor="iniciativa3"
                  >
                    Excelente
                  </label>
                </div>
              </div>
              <p>Você seria um super-herói e teria um My Pet Online?</p>
              <div className={`${styles['mb-3']} ${styles.formCheck}`}>
                <div>
                  <input
                    className={styles['form-check-input']}
                    type="radio"
                    {...register('anjo')}
                    defaultValue="Não"
                    id="anjo1"
                  />
                  <label
                    className={styles['form-check-label']}
                    htmlFor="anjo1"
                  >
                    Não
                  </label>
                </div>

                <div>
                  <input
                    className={styles['form-check-input']}
                    type="radio"
                    {...register('anjo')}
                    defaultValue="Sim"
                    id="anjo2"
                  />
                  <label
                    className={styles['form-check-label']}
                    htmlFor="anjo2"
                  >
                    Sim
                  </label>
                </div>
                <div>
                  <input
                    className={styles['form-check-input']}
                    type="radio"
                    {...register('anjo')}
                    defaultValue="Quero saber mais"
                    id="anjo3"
                  />
                  <label
                    className={styles['form-check-label']}
                    htmlFor="anjo3"
                  >
                    Quero saber mais
                  </label>
                </div>
              </div>
              <p>Se sim, você ajudaria o pet adotado em quais situações abaixo:</p>
              {/* <span>Lembrando, que essa contribuição será destinada a um Pet que estava abandonado e hoje, com o My Pet online, tem um tutor e você como super-herói.</span> */}
              <div className={`${styles['mb-3']} ${styles.formCheck}`}>
                <div>
                  <input
                    className={styles['form-check-input']}
                    type="radio"
                    {...register('valor')}
                    defaultValue="ração"
                    id="valor1"
                  />
                  <label
                    className={styles['form-check-label']}
                    htmlFor="valor1"
                  >
                    Ração
                  </label>
                </div>

                <div>
                  <input
                    className={styles['form-check-input']}
                    type="radio"
                    {...register('valor')}
                    defaultValue="Higiene e Bem-estar"
                    id="valor2"
                  />
                  <label
                    className={styles['form-check-label']}
                    htmlFor="valor2"
                  >
                    Higiene e Bem-estar
                  </label>
                </div>
                <div>
                  <input
                    className={styles['form-check-input']}
                    type="radio"
                    {...register('valor')}
                    defaultValue="saúde"
                    id="valor3"
                  />
                  <label
                    className={styles['form-check-label']}
                    htmlFor="valor3"
                  >
                    Saúde
                  </label>
                </div>
              </div>
              <div className={styles.buttonGroup}>
                <button
                  className={styles.button}
                  disabled={loading}
                >
                  {!loading ? (
                    'Enviar'
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
        </div>
      </div>
    </section>
  );
}
