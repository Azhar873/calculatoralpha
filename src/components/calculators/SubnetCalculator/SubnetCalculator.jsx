import React, { useState } from 'react';
import styles from './SubnetCalculator.module.scss';

const SubnetCalculator = () => {
    const [ipAddress, setIpAddress] = useState('');
    const [cidr, setCidr] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const calculateSubnet = () => {
        setError('');
        setResult(null);

        // Validate IP
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (!ipRegex.test(ipAddress)) {
            setError('Invalid IP Address format.');
            return;
        }

        const ipParts = ipAddress.split('.').map(Number);
        if (ipParts.some(part => part < 0 || part > 255)) {
            setError('IP octets must be between 0 and 255.');
            return;
        }

        // Validate CIDR
        const cidrNum = parseInt(cidr, 10);
        if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
            setError('CIDR must be between 0 and 32.');
            return;
        }

        // Logic
        const ipInt = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
        const maskInt = ~(2 ** (32 - cidrNum) - 1);

        const networkInt = ipInt & maskInt;
        const broadcastInt = networkInt | ~maskInt;

        const firstHostInt = networkInt + 1;
        const lastHostInt = broadcastInt - 1;

        const numHosts = cidrNum === 32 ? 1 : 2 ** (32 - cidrNum) - 2;

        const intToIp = (int) => {
            return [
                (int >>> 24) & 255,
                (int >>> 16) & 255,
                (int >>> 8) & 255,
                int & 255
            ].join('.');
        };

        // Mask String
        const maskIp = intToIp(maskInt);

        // Special cases for /31 and /32
        let usableRange = `${intToIp(firstHostInt)} - ${intToIp(lastHostInt)}`;
        if (cidrNum === 31) usableRange = "N/A (Point-to-Point)";
        if (cidrNum === 32) usableRange = intToIp(networkInt);

        setResult({
            ip: ipAddress,
            mask: maskIp,
            cidr: `/${cidrNum}`,
            network: intToIp(networkInt),
            broadcast: intToIp(broadcastInt),
            hosts: numHosts > 0 ? numHosts : 0,
            range: usableRange
        });
    };

    const resetCalculator = () => {
        setIpAddress('');
        setCidr('');
        setResult(null);
        setError('');
    };

    return (
        <div className={styles.subnetCalculatorContainer}>
            <div className={styles.subnetCalculator}>
                <div className={styles.header}>
                    <h2>Subnet Calculator</h2>
                    <p>Lookup subnet masks, network addresses, and usable host ranges</p>
                </div>

                <div className={styles.inputGroup}>
                    <label>IP Address</label>
                    <input
                        type="text"
                        value={ipAddress}
                        onChange={(e) => setIpAddress(e.target.value)}
                        placeholder="e.g. 192.168.1.1"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>CIDR / Prefix Size</label>
                    <input
                        type="number"
                        value={cidr}
                        onChange={(e) => setCidr(e.target.value)}
                        placeholder="e.g. 24"
                        min="0"
                        max="32"
                    />
                </div>

                {error && (
                    <div className={styles.error}>
                        {error}
                    </div>
                )}

                <div className={styles.buttonGroup}>
                    <button onClick={calculateSubnet} className={styles.calculateBtn}>
                        Calculate
                    </button>
                    <button onClick={resetCalculator} className={styles.resetBtn}>
                        Reset
                    </button>
                </div>

                {result && (
                    <div className={styles.resultContainer}>
                        <h3>Results</h3>
                        <div className={styles.resultList}>
                            <div className={styles.resultRow}>
                                <span className={styles.label}>Network Address:</span>
                                <span className={styles.value}>{result.network}</span>
                            </div>
                            <div className={styles.resultRow}>
                                <span className={styles.label}>Subnet Mask:</span>
                                <span className={styles.value}>{result.mask}</span>
                            </div>
                            <div className={styles.resultRow}>
                                <span className={styles.label}>Broadcast Address:</span>
                                <span className={styles.value}>{result.broadcast}</span>
                            </div>
                            <div className={styles.resultRow}>
                                <span className={styles.label}>Usable Host Range:</span>
                                <span className={styles.value}>{result.range}</span>
                            </div>
                            <div className={styles.resultRow}>
                                <span className={styles.label}>Total Usable Hosts:</span>
                                <span className={styles.value}>{result.hosts.toLocaleString()}</span>
                            </div>
                            <div className={styles.resultRow}>
                                <span className={styles.label}>CIDR Notation:</span>
                                <span className={styles.value}>{result.ip}{result.cidr}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubnetCalculator;

