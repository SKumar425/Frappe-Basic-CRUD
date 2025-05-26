import React, { useEffect, useState } from 'react';
import { useFrappeGetDocList, useFrappeDocTypeEventListener, useFrappeDeleteDoc } from 'frappe-react-sdk';
import { AddExpenseRecord } from './AddExpenseRecord';
import './ExpenseListTab.css';

export const ExpenseListTab = () => {
 

  const { data, isLoading, error, mutate } = useFrappeGetDocList('Expense Record', {
    fields: ['*']
  });

  const { deleteDoc } = useFrappeDeleteDoc();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useFrappeDocTypeEventListener('Expense Record', (d) => {
    if (d.doctype === 'Expense Record') {
      mutate();
    }
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const deleteData = async (name: any) => {
    try {
      await deleteDoc('Expense Record',name);
      console.log("Document deleted successfully");
    } catch (err) {
      console.error("Error deleting document:", err);
    }

  }

  return (
    <div className="expense-container">
      <div className="expense-header">
        <h3>Expenses</h3>
        <button className="btn-primary" onClick={handleOpenModal}>Add</button>
      </div>

      {isLoading && <div className="centered"><div className="spinner"></div></div>}

      {error && (
        <div className="alert">
          <strong>{error.exception}</strong>
          <p>{error.httpStatusText} {error.httpStatus}</p>
        </div>
      )}

      {data && (
        <table className="expense-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Remarks</th>
              <th>Owner</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.name}>
                <td>{d.name}</td>
                <td>{d.description}</td>
                <td>{d.amount}</td>
                <td>{d.type}</td>
                <td>{d.remarks}</td>
                <td>{d.owner}</td>
                <td><button className='deleteButton' onClick={() => deleteData(d.name)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && <AddExpenseRecord isOpen={isModalOpen} onClose={handleCloseModal} />}
    </div>
  );
};
