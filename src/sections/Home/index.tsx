import Image from 'next/image';
import styles from './styles.module.scss';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().min(3).required(),
  telefone: yup
    .string()
    .matches(/^(\(?([1-9]{2})\)?[.\-\/ ]?)?([2-9][0-9]{3,4})[.\-\/ ]?([0-9]{4})$/, 'Telefone inválido')
    .required(),
});

export default function HomeSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const MySwal = withReactContent(Swal);

  const onSubmitHandle = (data: any) => {
    MySwal.fire({
      title: 'Obrigado por fazer parte dessa pesquisa.',
      icon: 'success',
      text: 'Você compartilharia essa pesquisa com seus contatos para engajar mais anjos My Pet On-line?',
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
            text: 'Um texto de resumo',
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

    reset();
  };

  return (
    <section className={styles.wrapper}>
      <div className={`${styles.content} ${styles.container}`}>
        <div className={styles.title}>
          <p>Salve vidas: participe da pesquisa sobre ser um Anjo do My Pet Online! Onde você poderá contribuir com a saúde e Bem-estar dos Pets adotado.!</p>
        </div>
        <div className={styles.flex}>
          <div className={styles.informative}>
            <p className={styles.subTitulo}>Junte-se a nós e seja um Anjo!</p>
            <p className={styles.text}>
              Você sabia que existem cerca de 30 milhões de cães e gatos abandonados no Brasil? Ao saber destes dados estamos conduzindo uma pesquisa para entender melhor a sua
              opinião sobre a possibilidade de voce poder alimentar um Pet Online, através de um app. Sua participação é fundamental para alcançarmos nossos objetivos e salvarmos
              vidas. Aproveite está oportunidade de contribuir com informações para essa causa tão importante Basta responder algumas perguntas agora em nossa pesquisa!
            </p>
            <Image
              src={require('./10668.svg')}
              alt=""
              className={styles.carton}
            />
          </div>
          <div className={styles.forms}>
            <form onSubmit={handleSubmit(onSubmitHandle)}>
              <p className={styles.formTitle}>Você pode salvar vidas com essa pesquisa</p>
              <div className={styles['mb-3']}>
                <label htmlFor="Nome">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Nome completo"
                  className={`${errors?.name ? styles.invalid : ''}`}
                  {...register('name')}
                />
              </div>
              <div className={styles['mb-3']}>
                <label htmlFor="Nome">Email</label>
                <input
                  type="email"
                  required
                  placeholder="Seu email"
                  className={`${errors?.email ? styles.invalid : ''}`}
                  {...register('email')}
                />
              </div>
              <div className={styles['mb-3']}>
                <label htmlFor="Nome">Telefone</label>
                <input
                  type="text"
                  required
                  placeholder="Número de telefone"
                  className={`${errors?.telefone ? styles.invalid : ''}`}
                  {...register('telefone')}
                />
                {errors?.telefone && typeof errors?.telefone.message === 'string' && <span>{errors?.telefone?.message}</span>}
              </div>
              <p>Qual a sua opinião de participar desta iniciativa e poder alimentar um Pet a distância, se tornando um(a) Anjo My Pet Online?</p>
              <div className={`${styles['mb-3']} ${styles.formCheck}`}>
                <div>
                  <input
                    className={styles['form-check-input']}
                    type="radio"
                    name="iniciativa"
                    id="iniciativa1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="iniciativa1"
                  >
                    Ruim
                  </label>
                </div>

                <div>
                  <input
                    className={styles['form-check-input']}
                    type="radio"
                    name="iniciativa"
                    id="iniciativa2"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="iniciativa2"
                  >
                    Boa
                  </label>
                </div>
                <div>
                  <input
                    className={styles['form-check-input']}
                    type="radio"
                    name="iniciativa"
                    id="iniciativa3"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="iniciativa3"
                  >
                    Excelente
                  </label>
                </div>
              </div>
              <p>Você seria um Anjo e teria um My Pet Online?</p>
              <div className={`${styles['mb-3']} ${styles.formCheck}`}>
                <div>
                  <input
                    className={styles['form-check-input']}
                    type="radio"
                    name="anjo"
                    id="anjo1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="anjo1"
                  >
                    Não
                  </label>
                </div>

                <div>
                  <input
                    className={styles['form-check-input']}
                    type="radio"
                    name="anjo"
                    id="anjo2"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="anjo2"
                  >
                    Sim
                  </label>
                </div>
                <div>
                  <input
                    className={styles['form-check-input']}
                    type="radio"
                    name="anjo"
                    id="anjo3"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="anjo3"
                  >
                    Quero saber mais
                  </label>
                </div>
              </div>
              <p>Se sim, qual valor estaria disposto(a) a gastar com o My Pet Online ?</p>
              <span>Lembrando, que essa contribuição será destinada a um Pet que estava abandonado e hoje, com o My Pet on-line, tem um tutor e você como Anjo.</span>
              <div className={`${styles['mb-3']} ${styles.formCheck}`}>
                <div>
                  <input
                    className={styles['form-check-input']}
                    type="radio"
                    name="valor"
                    id="valor1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="valor1"
                  >
                    R$ 25,00
                  </label>
                </div>

                <div>
                  <input
                    className={styles['form-check-input']}
                    type="radio"
                    name="valor"
                    id="valor2"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="valor2"
                  >
                    R$ 50,00
                  </label>
                </div>
                <div>
                  <input
                    className={styles['form-check-input']}
                    type="radio"
                    name="valor"
                    id="valor3"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="valor3"
                  >
                    Acima de R$ 50,00
                  </label>
                </div>
              </div>
              <div className={styles.buttonGroup}>
                <button className={styles.button}>Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
