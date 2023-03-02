export const createOptions = (props ,positioin) => {
    let response = '<option value="null">Scegliere opzione</option>';
  
    props.forEach((type, index) => {
      const value =index+ 1; // Subtract 1 from index to start from 0
      const isSelected = positioin === value;
      response += `<option value="${value}"${isSelected ? ' selected' : ''}>${type}</option>`;
    });
  
    return response;
  };
  