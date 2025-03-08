import frenchHeaderImg from '../assets/french-header-img.webp';
import engHeaderImg from '../assets/eng-header-img.webp';
import Entry from './Entry';
import data from '../data';

export default function Header({ onLanguageChange, isDarkMode, onDarkModeToggle, selectedLanguage }) {
    const costumeEntry = data.find(entry => entry.id === 'costume');
    const getCostumeEntry = () => {
        if (costumeEntry.frenchMeaningInFR) {
            if (selectedLanguage === 'french') {
                return {
                    id: costumeEntry.id,
                    word: costumeEntry.wordFR,
                    nativeMeaning: costumeEntry.frenchMeaningInFR,
                    nativeExample: costumeEntry.frenchMeaningExInFR,
                    foreignMeaning: costumeEntry.engMeaningInFR,
                    foreignExample: costumeEntry.engMeaningExinENG,
                    foreignExampleTranslation: costumeEntry.enMeaningExFRTranslation,
                    language: selectedLanguage
                };
            } else {
                return {
                    id: costumeEntry.id,
                    word: costumeEntry.wordENG,
                    nativeMeaning: costumeEntry.engMeaningInENG,
                    nativeExample: costumeEntry.engMeaningExinENG,
                    foreignMeaning: costumeEntry.frenchMeaningInENG,
                    foreignExample: costumeEntry.frenchMeaningExInFR,
                    foreignExampleTranslation: costumeEntry.frenchMeaningExENGTranslation,
                    language: selectedLanguage
                };
            }
        }
    };

    return (
        <header>
            <div className="site-banner">
                <h1 className="site-logo">Faux-Amis</h1>
            </div>
            <button 
                className="dark-mode-toggle"
                onClick={onDarkModeToggle}
                aria-label="Toggle dark mode"
            >
                {isDarkMode ? '☀️' : '🌙'}
            </button>
            <h2 className="language-question">What do you speak? / Quelle langue tu parles?</h2>
            <div className="language-toggle">
                <input 
                    type="radio" 
                    id="french" 
                    name="language" 
                    value="french" 
                    defaultChecked
                    onChange={(e) => onLanguageChange(e.target.value)}
                />
                <label htmlFor="french" className="flag-label french-flag">
                </label>
                <input 
                    type="radio" 
                    id="english" 
                    name="language" 
                    value="english"
                    onChange={(e) => onLanguageChange(e.target.value)}
                />
                <label htmlFor="english" className="flag-label us-flag">
                </label>
            </div>
            <p className="intro-text french">
                <h1>Saviez-vous que l'anglais et le français partagent près de 45 % de leur vocabulaire ?</h1>
                <p>C'est un terrain commun assez vaste ! Mais attention—certains de ces mots sont de <span className="trickster-word">"faux amis"</span></p>
                <p>Ils vous font croire qu'ils sont de votre côté, alors qu'en réalité, ils risquent de vous induire en erreur !</p>
                <p>Ces petits malins peuvent avoir un sens légèrement différent... ou parfois, être totalement trompeurs.</p>
            </p>
            <p className="intro-text english">
                <h1>Did you know that English and French share nearly 45% of their vocabulary?</h1>
                <p>That's a lot of common ground! But beware—some of these words are <span className="trickster-word">"false friends"</span></p>
                <p>They act like they've got your back, but in reality, they might mislead you completely!</p>
                <p>They can be sneaky little tricksters, slightly off in meaning—or sometimes, wildly different.</p>
            </p>
            <figure className="header-image french">
                <img 
                    src={frenchHeaderImg} 
                    alt="A person wearing a full-body panda costume stands awkwardly in the middle of a formal business event. The surrounding attendees are dressed in eleg" 
                />
                <figcaption>
                    <p>Par exemple, vous rendez à un événement et votre ami vous dit:</p>
                    <p className="quote"><i>"Hey Benoit, can't wait to see tonight, the host wants everyone to wear a <span className="trickster-word">costume</span> tonight"</i></p>
                    <p>Porter un costume? Pas de problème!</p>
                    <p>Vous êtes trahis par un <span className="trickster-word">faux ami</span> !</p>
                </figcaption>
            </figure>
            <figure className="header-image english">
                <img 
                    src={engHeaderImg} 
                    alt="A person wearing a formal suit and tie stands confidently in the middle of a lively house party. Everyone else around them is dressed in funny, colorf" 
                />
                <figcaption>
                    <p>You get invited to a French event and your coworker advises you to wear a <span className="trickster-word">costume</span></p>
                    <p className="quote"><i>"Oh perfect there's one I've been wanting to wear for a while"</i></p>
                    <p>You fell prey to a <span className="trickster-word">false friend</span>!</p>
                </figcaption>
            </figure>
            <div className="header-entry">
                <Entry {...getCostumeEntry()} />
            </div>
        </header>
    );
}