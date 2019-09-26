
//Projenin base response fonksiyonu
module.exports.createResponse = function createResponse(isError, response) {
    var res

    if (isError) { res = { error: "1", msg: response } }
    else { res = { code: "0", msg: "success", records:response} }
    console.log('response:\n' + JSON.stringify(res))
    return res
}
//body'i kontrol eden fonksiyon
module.exports.checkParameters = function checkParameters(eventParams) {

    const possibleFieldProps = [

        { fieldName: 'maxCount', type: 'number', required: true, possibleInputs: [] }, // string, number, object
        { fieldName: 'minCount', type: 'number', required: true, possibleInputs: [] },
        {fieldName: 'startDate', type: 'string', required: true, possibleInputs: [] },
        {fieldName: 'endDate', type: 'string', required: true, possibleInputs: [] }
    ]

    // check for required fields first and ensure that the body contains them
    for (let fieldProps of possibleFieldProps) {
        if (fieldProps.required === true && (eventParams[fieldProps.fieldName] === undefined || eventParams[fieldProps.fieldName] === "")) {
            throw `${fieldProps.fieldName} field is required`
        }
    }

    // ensure that the body doesn't include any other fields than the fields defined above and their values types are correct
    for (let [key, value] of Object.entries(eventParams)) {
        const fieldProps = possibleFieldProps.find(fieldProps => fieldProps.fieldName === key)
        // check if exists
        if (!fieldProps) {
            throw `Invalid field '${key}'`
            // check if the type is correct
        }
        else if (fieldProps.type !== typeof value) {
            throw `'${key}' must be sent as '${fieldProps.type}'`
        }
    }

    // check possible Inputs
    for (let fieldProps of possibleFieldProps) {

        if (eventParams[fieldProps.fieldName] !== undefined && fieldProps.possibleInputs.length > 0 && (fieldProps.type === "string" || fieldProps.type === "number")) {
            var isInPossibleInputs = 0
            for (let theInput of fieldProps.possibleInputs) {
                if (eventParams[fieldProps.fieldName] === theInput) {
                    isInPossibleInputs = 1
                }
            }
            if (isInPossibleInputs === 0) {
                throw `Possible inputs for '${fieldProps.fieldName}' are '${fieldProps.possibleInputs}'`
            }
        }
    }
}

