import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFrappeCreateDoc  } from 'frappe-react-sdk';
import './AddExpenseRecord.css';

export const AddExpenseRecord = ({ isOpen, onClose }: any) => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createDoc, loading } = useFrappeCreateDoc();

  const onSubmit = async (data: any) => {
    createDocument(data);
  };

  const createDocument = (data: any) => {
    createDoc('Expense Record', {
      ...data,

    }).then(() => {
      onClose();
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-header">
            <h2>Add Expense</h2>
            <button type="button" className="close-button" onClick={onClose}>×</button>
          </div>

          <div className="modal-body">


            <div className="form-group">
              <label>Amount</label>
              <input type="number" {...register('amount', {
                required: 'Amount is required',
                min: { value: 1, message: 'Minimum amount is 1' }
              })} />
              {errors.amount && <span className="error">{errors.amount.message}</span>}
            </div>

            <div className="form-group">
              <label>Type</label>
              <select {...register('type', { required: 'Type is required' })}>
                <option value="">Select Type</option>
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
              </select>
              {errors.type && <span className="error">{errors.type.message}</span>}
            </div>

            <div className="form-group">
              <label>Description</label>
              <input type="text" {...register('description', {
                required: 'Description is required',
                minLength: { value: 3, message: 'Minimum 3 characters' }
              })} />
              {errors.description && <span className="error">{errors.description.message}</span>}
            </div>

            <div className="form-group">
              <label>Remarks</label>
              <textarea {...register('remarks')} />
            </div>


          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Close</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
