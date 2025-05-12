import ReactMarkdown from 'react-markdown'


export default function ClaudeRecipe(props){
return(<section className="claude-recipe-section">
                <h2>{props.currentGlobalLanguage === 'es' ? 'Chef Claude recomienda:' : 'Chef Claude recommends:'}</h2>
                <br></br>
                <article className="suggested-recipe-container" aria-live="polite">
                    <ReactMarkdown>{props.recipe}</ReactMarkdown>
                </article>
            </section>)}