import React from 'react'

const FormRow = ({name,type,value,handleChange, labelText}) => {
  return (
     <div className="form-row">
          <label htmlFor={name} autoCorrect={name} className="form-label">{labelText || name  }</label>
          <input autoComplete={name} type={type} id={name} name={name} value={value || ''} onChange={handleChange} className='form-input'/>
        </div>
  )
}

export default FormRow