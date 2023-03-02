export const createOptions = (props) => {
    let response = '<option value="null">Scegliere opzione</option>';

    props.forEach((type, index) => {
        response += `<option value="${index}">${type}</option>`;
    });

    return response;
}