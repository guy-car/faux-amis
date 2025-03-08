import { useState } from 'react';
import Header from './Header';
import Entry from './Entry';
import data from '../data';

export default function WordContainer({ isDarkMode, onDarkModeToggle }) {
    const [selectedLanguage, setSelectedLanguage] = useState('french');
    const [selectedCategory, setSelectedCategory] = useState('none');

    const categories = {
        none: [],
        misleading: ['attendre', 'demander', 'assister'],
        backstabbers: [],
        lostInTranslation: []
    };

    const getCategoryTitle = (category) => {
        switch(category) {
            case 'misleading':
                return selectedLanguage === 'french' ? "Les déroutants 🎭" : "The Misleading Ones 🎭";
            case 'backstabbers':
                return selectedLanguage === 'french' ? "Les traîtres 🗡️" : "The Backstabbers 🗡️";
            case 'lostInTranslation':
                return selectedLanguage === 'french' ? "Lost in Translation 🌐" : "Lost in Translation 🌐";
            default:
                return '';
        }
    };

    const getFilteredEntries = () => {
        if (selectedCategory === 'none') {
            return [];
        }
        
        const activeWords = categories[selectedCategory];
        console.log('Active category:', selectedCategory);
        console.log('Active words:', activeWords);
        
        const filtered = data
            .filter(entry => activeWords.includes(entry.id))
            .map(entry => {
                console.log('Processing entry:', entry);
                if (entry.frenchMeaningInFR) {
                    if (selectedLanguage === 'french') {
                        return {
                            id: entry.id,
                            word: entry.wordFR,
                            nativeMeaning: entry.frenchMeaningInFR,
                            nativeExample: entry.frenchMeaningExInFR,
                            foreignMeaning: entry.engMeaningInFR,
                            foreignExample: entry.engMeaningExinENG,
                            foreignExampleTranslation: entry.enMeaningExFRTranslation,
                            language: selectedLanguage
                        };
                    } else {
                        return {
                            id: entry.id,
                            word: entry.wordENG,
                            nativeMeaning: entry.engMeaningInENG,
                            nativeExample: entry.engMeaningExinENG,
                            foreignMeaning: entry.frenchMeaningInENG,
                            foreignExample: entry.frenchMeaningExInFR,
                            foreignExampleTranslation: entry.frenchMeaningExENGTranslation,
                            language: selectedLanguage
                        };
                    }
                } else {
                    if (selectedLanguage === 'french') {
                        return {
                            id: entry.id,
                            word: entry.wordFR,
                            nativeMeaning: entry.englishMeaningForFR,
                            nativeExample: entry.exampleForEN,
                            foreignMeaning: entry.frenchMeaningForUS,
                            foreignExample: entry.exampleForFR,
                            foreignExampleTranslation: entry.translationForUS,
                            language: selectedLanguage
                        };
                    } else {
                        return {
                            id: entry.id,
                            word: entry.wordUS,
                            nativeMeaning: entry.frenchMeaningForUS,
                            nativeExample: entry.exampleForFR,
                            foreignMeaning: entry.englishMeaningForFR,
                            foreignExample: entry.exampleForEN,
                            foreignExampleTranslation: entry.translationForFRExample,
                            language: selectedLanguage
                        };
                    }
                }
            });
        console.log('Filtered entries:', filtered);
        return filtered;
    };

    return (
        <div className={`word-container ${selectedLanguage} ${isDarkMode ? 'dark-mode' : ''}`}>
            <Header 
                onLanguageChange={setSelectedLanguage} 
                isDarkMode={isDarkMode}
                onDarkModeToggle={onDarkModeToggle}
                selectedLanguage={selectedLanguage}
            />
            <div className="category-section">
                <h3>
                    {selectedLanguage === 'french' 
                        ? <>Découvrez qui sont vos <span className="trickster-word">faux amis</span></>
                        : <>Find out who your <span className="trickster-word">false friends</span> are</>
                    }
                </h3>
                <div className="category-buttons">
                    {['misleading', 'backstabbers', 'lostInTranslation'].map(category => (
                        <button 
                            key={category}
                            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(selectedCategory === category ? 'none' : category)}
                        >
                            {getCategoryTitle(category)}
                        </button>
                    ))}
                </div>
            </div>
            <div className="entries-grid">
                {getFilteredEntries().map(entry => (
                    <Entry
                        key={entry.id}
                        {...entry}
                    />
                ))}
            </div>
        </div>
    );
}