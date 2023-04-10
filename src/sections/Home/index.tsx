import Image from 'next/image';
import styles from './styles.module.scss';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FormEvent } from 'react';

export default function HomeSection() {
  const MySwal = withReactContent(Swal);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        MySwal.fire({
          title: 'Link Copiado com sucesso',
        });
      }
    });
  };
  return (
    <section className={styles.wrapper}>
      <div className={`${styles.content} ${styles.container}`}>
        <div className={styles.title}>
          <p>Salve vidas: participe da pesquisa sobre ser um Anjo do My Pet Online! Onde você poderá contribuir com a saúde e Bem-estar dos Pets adotado.!</p>
        </div>
        <div className={styles.flex}>
          <div className={styles.informative}>
            <p className={styles.subTitulo}>JJunte-se a nós e seja um Anjo!</p>
            <p className={styles.text}>
              Você sabia que existem cerca de 30 milhões de cães e gatos abandonados no Brasil? Ao saber destes dados estamos conduzindo uma pesquisa para entender melhor a sua
              opinião sobre a possibilidade de voce poder alimentar um Pet Online,através de um app. Sua participação é fundamental para alcançarmos nossos objetivos e salvarmos
              vidas. Aproveite está oportunidade de contribuir com informações para essa causa tão importante Basta responder algumas perguntas agora em nossa pesquisa!
            </p>
            <Image
              src={require('./10668.svg')}
              alt=""
              className={styles.carton}
            />
          </div>
          <div className={styles.forms}>
            <form onSubmit={handleSubmit}>
              <p className={styles.formTitle}>Você pode salvar vidas com essa pesquisa</p>
              <div className={styles['mb-3']}>
                <label htmlFor="Nome">Nome Completo</label>
                <input
                  type="text"
                  placeholder="Nome completo"
                />
              </div>
              <div className={styles['mb-3']}>
                <label htmlFor="Nome">Email</label>
                <input
                  type="email"
                  placeholder="Seu email"
                />
              </div>
              <div className={styles['mb-3']}>
                <label htmlFor="Nome">Telefone</label>
                <input
                  type="text"
                  placeholder="Número de telefone"
                />
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
