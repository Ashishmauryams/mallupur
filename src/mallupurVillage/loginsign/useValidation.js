function useValidation(register){
     const validation = () => {
        const nameRegex = /^(?=(?:.*[A-Za-z]){5,})[A-Za-z]+(?: [A-Za-z]+)*$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const numberRegex = /^[6-9]\d{9}$/;
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
        const newErrors = {};
        if (!register.name.trim()) {
            newErrors.name = "Name is Required";
        } else if (!nameRegex.test(register.name)) {
            newErrors.name = "Name must be 5 Letter and no number Include";
        }
        if (!register.email.trim()) {
            newErrors.email = "Email is Required";
        } else if (!emailRegex.test(register.email)) {
            newErrors.email = "Please Enter currect email";
        }
        if (!register.number.trim()) {
            newErrors.number = "Number is Required";
        } else if (!numberRegex.test(register.number)) {
            newErrors.number = "Number must be start with 6 to 9 and total number of digit 10"
        }
        if (!register.password.trim()) {
            newErrors.password = "password is Required";
        } else if (!passwordRegex.test(register.password)) {
            newErrors.password = "password minimum 6 letter like Ashish@123";
        }
        return newErrors;
    }

    return validation;
}
export default useValidation;