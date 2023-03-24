export function validateInput(name, email, message) {
    const errors = {};
    
    if (name==='') {
      errors.name = 'Name is required.';
    }
    
    if (email==='') {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.';
    }
    
    if (message==='') {
      errors.message = 'Message is required.';
    }
    
    return errors;
  }
  