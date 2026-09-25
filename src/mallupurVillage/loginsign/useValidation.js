function useValidation(formData, rules = {}) {
    const validate = () => {
        const errors = {};

        Object.keys(rules).forEach((field) => {
            const value = formData[field];
            const fieldRules = rules[field];

            // Required
            if (fieldRules.required) {
                if (
                    value === undefined ||
                    value === null ||
                    String(value).trim() === ""
                ) {
                    errors[field] =
                        fieldRules.requiredMessage || `${field} is required`;

                    return;
                }
            }

            // Agar field empty hai aur required nahi hai
            if (
                value === undefined ||
                value === null ||
                String(value).trim() === ""
            ) {
                return;
            }

            const stringValue = String(value);

            // Min Length
            if (
                fieldRules.minLength &&
                stringValue.length < fieldRules.minLength
            ) {
                errors[field] =
                    fieldRules.minLengthMessage ||
                    `${field} must be at least ${fieldRules.minLength} characters`;

                return;
            }

            // Max Length
            if (
                fieldRules.maxLength &&
                stringValue.length > fieldRules.maxLength
            ) {
                errors[field] =
                    fieldRules.maxLengthMessage ||
                    `${field} must not exceed ${fieldRules.maxLength} characters`;

                return;
            }

            // Regex / Pattern
            if (
                fieldRules.pattern &&
                !fieldRules.pattern.test(stringValue)
            ) {
                errors[field] =
                    fieldRules.patternMessage ||
                    `${field} is invalid`;

                return;
            }

            // Custom validation
            if (fieldRules.validate) {
                const customError = fieldRules.validate(
                    value,
                    formData
                );

                if (customError) {
                    errors[field] = customError;
                }
            }
        });

        return errors;
    };

    return validate;
}

export default useValidation;