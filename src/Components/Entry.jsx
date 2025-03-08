export default function Entry({ 
    word,
    nativeMeaning,
    nativeExample,
    foreignMeaning,
    foreignExample,
    foreignExampleTranslation,
    language
}) {
    const nativeTitle = language === 'french' 
        ? '🇫🇷 En français ça veut dire...' 
        : '🇺🇸 In English that means...';
    const foreignTitle = language === 'french' 
        ? '🇺🇸 En anglais ça veut dire...' 
        : '🇫🇷 In French that means...';

    const wrapTricksterWords = (text, isMainWord = false) => {
        if (!text) return text;
        
        // If this is the main word, wrap it directly but handle hyphens specially
        if (isMainWord) {
            return <span className="trickster-word">
                {text.split('-').map((part, i) => (
                    <>
                        {i > 0 && <span className="hyphen">-</span>}
                        {part}
                    </>
                ))}
            </span>;
        }

        // For other text, look for instances of the word and other trickster words
        const tricksterWords = ['faux-amis', 'false friend', 'false friends', word];
        let processedText = text;
        
        tricksterWords.forEach(trickWord => {
            if (trickWord.includes('-')) {
                const escapedWord = trickWord.replace(/-/g, '\\-');
                const regex = new RegExp(`(${escapedWord})`, 'gi');
                processedText = processedText.replace(regex, (match) => {
                    const parts = match.split('-');
                    return `<span class="trickster-word">${parts.join('<span class="hyphen">-</span>')}</span>`;
                });
            } else {
                const regex = new RegExp(`(${trickWord})`, 'gi');
                processedText = processedText.replace(regex, '<span class="trickster-word">$1</span>');
            }
        });
        
        return <span dangerouslySetInnerHTML={{ __html: processedText }} />;
    };

    return (
        <div className={`entry-card ${language === 'french' ? 'fr-border' : 'us-border'}`}>
            <h2>{wrapTricksterWords(word, true)}</h2>
            <div className="meanings-container">
                <div className="meaning-section native">
                    <h3>{nativeTitle}</h3>
                    <p>{wrapTricksterWords(nativeMeaning)}</p>
                    {nativeExample && (
                        <div className="example-group">
                            <p className="example">{wrapTricksterWords(nativeExample)}</p>
                        </div>
                    )}
                </div>
                <div className="meaning-section foreign">
                    <h3>{foreignTitle}</h3>
                    <p>{wrapTricksterWords(foreignMeaning)}</p>
                    {foreignExample && (
                        <div className="example-group">
                            <p className="example">{wrapTricksterWords(foreignExample)}</p>
                            {foreignExampleTranslation && (
                                <p className="translation">{wrapTricksterWords(foreignExampleTranslation)}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}