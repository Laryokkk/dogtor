function createOptions(text) {
    const select = document.createElement('select');
    
    text.forEach((element, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = element;
        option.required = 'required';
        select.appendChild(option);
    });
  
    return select.innerHTML;
}
  





export { createOptions };