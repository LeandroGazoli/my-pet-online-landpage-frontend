import Image from 'next/image';
import styles from './styles.module.scss';

export default function HomeSection() {
  return (
    <section className={styles.wrapper}>
      <div className={`${styles.content} ${styles.container}`}>
        <div className={styles.title}>
          <p>Salve uma vida: participe da pesquisa sobre doação de pets!</p>
        </div>
        <div className={styles.flex}>
          <div className={styles.informative}>
            <p className={styles.subTitulo}>Junte-se a nós e ajude a acabar com o abandono de cachorros e gatos no Brasil.</p>
            <p className={styles.text}>
              Você sabia que existem cerca de 30 milhões de cães e gatos abandonados no Brasil? <br /> Infelizmente, essa é uma realidade muito triste e que precisa ser combatida.
              Por isso, estamos conduzindo uma pesquisa para entender melhor a situação da doação de pets no país e, assim, trabalhar para mudar esse cenário. Sua participação é
              fundamental para alcançarmos nossos objetivos e salvarmos vidas. Não perca a oportunidade de contribuir para essa causa tão importante, cadastre-se agora em nossa
              pesquisa!
            </p>
            <Image
              src={require('./10668.svg')}
              alt=""
              className={styles.carton}
            />
          </div>
          <div className={styles.forms}>
            <form>
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
              <div className={styles['mb-3']}>
                <label htmlFor="valor">
                  Adotar um pet pode mudar a vida dele e a sua. Com a nossa plataforma online, você pode ajudar uma pessoa que não tem condições de adotar, mas quer mudar a vida de
                  um animalzinho. Quanto você estaria disposto a contribuir financeiramente para ajudar na criação desse pet adotado?
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span>R$ </span>
                  <input type="number" />
                </div>
              </div>
              <p>Com que frequência você gostaria de contribuir financeiramente para ajudar na criação do seu pet adotado?</p>
              <div className={`${styles['mb-3']} ${styles.formCheck}`}>
                <div>
                  <input
                    className={styles['form-check-input']}
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Default radio
                  </label>
                </div>

                <div>
                  <input
                    className={styles['form-check-input']}
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Default radio
                  </label>
                </div>
                <div>
                  <input
                    className={styles['form-check-input']}
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault3"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault3"
                  >
                    Default radio
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
