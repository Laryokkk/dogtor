const createOption = ()=>{
    const select = template.querySelector('.animalType');
    let newOption = document.createElement("option");
    newOption.text = "Kiwi";
    console.log(select);
    select.add(newOption);
}




export {createOption };