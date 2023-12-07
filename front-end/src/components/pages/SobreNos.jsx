import Container from '../layouts/Container'
import styles from "./SobreNos.module.css"



export default function SobreNos() {
    return( 
        <Container customClass='backgroundWhite'>
            <section className={styles.sobreClass}>
                <h2>Sobre nós</h2>
                <div className={styles.acervo}>
                    <h3>ACERVO DIGITAL</h3>
                    <h4>UMA BIBLIOTECA VIRTUAL PARA O FUTURO DA EDUCAÇÃO</h4>
                    <p>
                    
                        No ápice do avanço tecnológico e da revolução digital, surge uma iniciativa inovadora que promete transformar a maneira como acessamos o conhecimento: a Biblioteca Virtual Acervo Digital. Concebida como parte integrante de um projeto final de desenvolvimento web, essa plataforma surge como resposta às demandas crescentes por soluções educacionais mais acessíveis, flexíveis e interativas.
                    </p>
                    <p>
                        Visão e Missão:
                    
                        A Acervo Digital nasce com a visão audaciosa de democratizar o acesso ao conhecimento, eliminando barreiras físicas e financeiras que frequentemente limitam a educação. Nossa missão é proporcionar uma experiência de aprendizado enriquecedora, conectando estudantes, pesquisadores e entusiastas a um vasto repositório de informações de forma digital e interativa.
                    
                        Arquitetura e Tecnologia:
                    </p>
                </div>

                <p>
                    Desenvolvida como parte essencial do projeto final de web, a Biblioteca Virtual Acervo Digital foi construída com base nas mais recentes tecnologias web. Utilizando uma arquitetura escalável e segura, garantimos não apenas o acesso fácil, mas também a integridade e confidencialidade das informações. A interface intuitiva e responsiva foi projetada para proporcionar uma experiência de usuário fluida em dispositivos variados, tornando o aprendizado acessível em qualquer lugar, a qualquer momento.
                </p>
            </section>
        </Container>
    )
}