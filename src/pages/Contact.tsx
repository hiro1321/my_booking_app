// Contact.tsx

import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className='contact-container'>
      <h2>Contact Us</h2>
      <p>
        If you have any questions or inquiries, please feel free to contact us
        using the form below.
      </p>
      <form>
        <div className='form-group'>
          <label>Name:</label>
          <input type='text' />
        </div>
        <div className='form-group'>
          <label>Email:</label>
          <input type='email' />
        </div>
        <div className='form-group'>
          <label>Message:</label>
          <textarea></textarea>
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
