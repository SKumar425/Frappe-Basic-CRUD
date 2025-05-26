// Expenses.jsx
import React, { useState } from 'react';
import { ExpenseListTab } from '../_components/ExpenseListTab';
import { Dashboard } from '../_components/Dashboard';
import './Expenses.css'; // CSS for styling

export const Expenses = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs">
      <div className="tab-list">
        <button
          className={`tab ${activeTab === 0 ? 'active' : ''}`}
          onClick={() => setActiveTab(0)}
        >
          Expense List
        </button>
        <button
          className={`tab ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => setActiveTab(1)}
        >
          Dashboard
        </button>
      </div>

      <div className="tab-panels">
        {activeTab === 0 && (
          <div className="tab-panel">
            <ExpenseListTab />
          </div>
        )}
        {activeTab === 1 && (
          <div className="tab-panel">
            <Dashboard />
          </div>
        )}
      </div>
    </div>
  );
};
