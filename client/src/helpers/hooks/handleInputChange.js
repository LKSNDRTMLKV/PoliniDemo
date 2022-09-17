const handleInputChange = (e, setValue) => {
    const {name, value, id} = e.target;
    setValue(prevState => ({...prevState, [name]: value}));
}

export default handleInputChange;