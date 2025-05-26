import React, { useEffect, useState } from 'react';
import './Dashboard.css';

export const Dashboard = () => {
    const [creditCard, setCreditCard] = useState(null);
    const [debitCard, setDebitCard] = useState(null);
    const [totalCredits, setTotalCredits] = useState(null);
    const [totalDebits, setTotalDebits] = useState(null);

    // Fetch Credit Card config
    useEffect(() => {
        fetch('/api/resource/Number Card/Total Credits')
            .then(res => res.json())
            .then(data => setCreditCard(data.data))
            .catch(err => console.error("Failed to fetch Total Credits config", err));
    }, []);

    // Fetch Debit Card config
    useEffect(() => {
        fetch('/api/resource/Number Card/Total Debits')
            .then(res => res.json())
            .then(data => setDebitCard(data.data))
            .catch(err => console.error("Failed to fetch Total Debits config", err));
    }, []);

    // Fetch Credit value
    useEffect(() => {
        if (creditCard) {
            fetch('/api/method/frappe.desk.doctype.number_card.number_card.get_result', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    doc: creditCard,
                    filters: creditCard.filters_json,
                }),
            })
                .then(res => res.json())
                .then(result => setTotalCredits(result.message))
                .catch(err => console.error("Failed to fetch Total Credits", err));
        }
    }, [creditCard]);

    // Fetch Debit value
    useEffect(() => {
        if (debitCard) {
            fetch('/api/method/frappe.desk.doctype.number_card.number_card.get_result', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    doc: debitCard,
                    filters: debitCard.filters_json,
                }),
            })
                .then(res => res.json())
                .then(result => setTotalDebits(result.message))
                .catch(err => console.error("Failed to fetch Total Debits", err));
        }
    }, [debitCard]);

    return (
        <div className="grid">
            <div className="card">
                <div className="stat-label">Total Credits</div>
                <div className="stat-number">{totalCredits !== null ? totalCredits : 'Loading...'}</div>
            </div>
            <div className="card">
                <div className="stat-label">Total Debits</div>
                <div className="stat-number">{totalDebits !== null ? totalDebits : 'Loading...'}</div>
            </div>
        </div>
    );
};
