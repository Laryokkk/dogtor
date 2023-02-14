# dogtor

## BEST SOLUTIONS EVER
```json
initTimeStart() {
    let response = '';

    this.props.forEach(section => {
        if (section.title === "Inizio") {
            response += ` 
            <h4 class="text-light  text-visit-form">Inizio:</h4>
            <h4 class="text-accent text-light padding-left text-visit-form">${section.value}</h4>`;
        }
    });

    return response;

}

initEndTime() {
    let response = '';

    this.props.forEach(section => {
        if (section.title === "Fine") {
            response += `
            <h4 class="text-light  text-visit-form">Fine:</h4>
        <h4 class="text-accent text-light padding-left text-visit-form">${section.value}  </h4>`;
        }
    });

    return response;

}

initData() {
    let response = '';

    this.props.forEach(section => {
        if (section.title === "Data") {
            response += `<h4 class="text-light  text-visit-form">Data:</p>
            <h4 class="text-light padding-left text-visit-form">${section.value} </h4>`;
        }
    });

    return response;

}

initDoctorName() {
    let response = '';

    this.props.forEach(section => {
        if (section.title === "Doctor") {
            response += `
            <h4 class="text-light  text-visit-form">Doctor:</p>
            <h4 class="text-light padding-left text-visit-form">${section.value}</h4>`;
        }
    });

    return response;

}
```
