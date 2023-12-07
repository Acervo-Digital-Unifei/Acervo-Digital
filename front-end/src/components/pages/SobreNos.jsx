import Container from '../layouts/Container'
import styles from "./SobreNos.module.css"



export default function SobreNos() {
    return( 
        <Container customClass='backgroundStandart'>
            <section className={styles.sobreClass}>
                <h2>Sobre nós</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan euismod neque, vel fermentum risus ullamcorper ut. Ut sit amet malesuada nunc. Vivamus facilisis mauris non libero fermentum, vel dictum orci interdum. Nullam eu quam nec turpis convallis auctor vel in tortor. Aliquam vel purus nec felis placerat suscipit. In hac habitasse platea dictumst. Duis eu tortor sed odio ullamcorper varius.

Quisque vel leo eu metus tincidunt lacinia. Suspendisse potenti. Vivamus nec ante eu ligula aliquet dignissim eu vitae risus. Etiam eu neque non odio rhoncus hendrerit. Aliquam nec varius turpis, eu congue urna. Sed id eleifend mauris, nec efficitur elit. Nunc vel hendrerit nulla, vel fringilla risus. Fusce id enim ut ligula hendrerit bibendum eu sit amet arcu. Nulla facilisi.

Integer ullamcorper, erat non bibendum varius, justo elit ultrices tellus, id tincidunt eros lectus vitae sapien. Fusce sit amet tortor eget justo aliquam euismod. Curabitur ut luctus orci. Nulla facilisi. Vivamus gravida, metus eu rhoncus fermentum, tellus tortor luctus ex, et tincidunt arcu elit nec quam. Fusce vel arcu ut odio fermentum vestibulum. Curabitur sodales urna sit amet lacus tempor, a sodales est semper.
Vestibulum euismod a mauris vel ultrices. Nam vehicula nibh ut elit finibus, in fringilla dolor rhoncus. Fusce volutpat, sem ac euismod sollicitudin, ligula velit efficitur libero, id cursus dui velit in dolor. Nulla facilisi. Aliquam erat volutpat. Sed vestibulum sem eget malesuada gravida. Nullam hendrerit mauris eu augue posuere, vel gravida turpis bibendum. Vivamus in justo nec augue rhoncus congue.</p>
            </section>
        </Container>
    )
}