import React, { useState } from 'react';
import styles from './PasswordGenerator.module.scss';

const PasswordGenerator = () => {
    const [length, setLength] = useState(12);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [password, setPassword] = useState('');
    const [copied, setCopied] = useState(false);

    const generatePassword = () => {
        let charset = '';
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) charset += '0123456789';
        if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        if (charset === '') {
            setPassword('');
            return;
        }

        let retVal = '';
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        setPassword(retVal);
        setCopied(false);
    };

    const copyToClipboard = () => {
        if (password) {
            navigator.clipboard.writeText(password);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className={styles.passwordGeneratorContainer}>
            <div className={styles.passwordGenerator}>
                <div className={styles.header}>
                    <h2>Password Generator</h2>
                    <p>Create strong and secure passwords instantly</p>
                </div>

                <div className={styles.passwordDisplay}>
                    <input
                        type="text"
                        value={password}
                        readOnly
                        placeholder="Click Generate Below"
                    />
                    <button
                        onClick={copyToClipboard}
                        className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>

                <div className={styles.optionsSection}>
                    <div className={styles.lengthControl}>
                        <div className={styles.lengthHeader}>
                            <label>Password Length</label>
                            <span className={styles.lengthValue}>{length}</span>
                        </div>
                        <input
                            type="range"
                            min="4"
                            max="64"
                            value={length}
                            onChange={(e) => setLength(parseInt(e.target.value))}
                        />
                    </div>

                    <div className={styles.checkboxGrid}>
                        <label className={styles.checkboxItem}>
                            <input
                                type="checkbox"
                                checked={includeUppercase}
                                onChange={(e) => setIncludeUppercase(e.target.checked)}
                            />
                            <span>Uppercase (A-Z)</span>
                        </label>
                        <label className={styles.checkboxItem}>
                            <input
                                type="checkbox"
                                checked={includeLowercase}
                                onChange={(e) => setIncludeLowercase(e.target.checked)}
                            />
                            <span>Lowercase (a-z)</span>
                        </label>
                        <label className={styles.checkboxItem}>
                            <input
                                type="checkbox"
                                checked={includeNumbers}
                                onChange={(e) => setIncludeNumbers(e.target.checked)}
                            />
                            <span>Numbers (0-9)</span>
                        </label>
                        <label className={styles.checkboxItem}>
                            <input
                                type="checkbox"
                                checked={includeSymbols}
                                onChange={(e) => setIncludeSymbols(e.target.checked)}
                            />
                            <span>Symbols (!@#$)</span>
                        </label>
                    </div>
                </div>

                <button
                    onClick={generatePassword}
                    className={styles.generateBtn}
                >
                    Generate Password
                </button>
            </div>
        </div>
    );
};

export default PasswordGenerator;

