function createOptions(text,selectedIndex) {
    const select = document.createElement('select');
    
    text.forEach((element, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = element;
        option.required = 'required';

        console.log(selectedIndex);

        if (index === 2) {
            option.selected = true;
          }

        select.appendChild(option);
    });
  
    return select.innerHTML;
}
  





export { createOptions };