// Constants used in the calculations
const conversionConstants = {
    kConst: 273.15,
    fConst: 32
};

// Key-value pairs for storing valid inputs of the scales
const validScaleEntries = {
    celsius: ["C", "c"],
    fahrenheit: ["F", "f"],
    kelvin: ["K", "k"]
};

// Error check for valid temperature inputs
const validateTemperature = (temperature) => {
    if (temperature === null || temperature === undefined || isNaN(temperature)) {
        throw new Error("Temperature must be a valid numeric value");
    }
};

// Standardises the scales to Uppercase
const validateAndNormaliseScale = (scale) => {
    if (validScaleEntries.celsius.includes(scale)) return "C";
    if (validScaleEntries.fahrenheit.includes(scale)) return "F";
    if (validScaleEntries.kelvin.includes(scale)) return "K";
    throw new Error("Invalid temperature scale. Use C, F, or K");
};

// Direct conversions for each possible conversion pair
const directConversions = {
    "C_TO_F": (celsius) => (celsius * 9/5) + conversionConstants.fConst,
    "C_TO_K": (celsius) => celsius + conversionConstants.kConst,
    "F_TO_C": (fahrenheit) => (fahrenheit - conversionConstants.fConst) * 5/9,
    "F_TO_K": (fahrenheit) => (fahrenheit - conversionConstants.fConst) * 5/9 + conversionConstants.kConst,
    "K_TO_C": (kelvin) => kelvin - conversionConstants.kConst,
    "K_TO_F": (kelvin) => (kelvin - conversionConstants.kConst) * 9/5 + conversionConstants.fConst
};

// Gets the appropriate conversion function for the given scales
const getConversionFunction = (fromScale, toScale) => {
    if (fromScale === toScale) {
        return (temp) => temp;  // No conversion needed
    }
    
    const conversionKey = `${fromScale}_TO_${toScale}`;
    return directConversions[conversionKey];
};

// Main function body running all the above helper functions
const temperatureConversion = (temperature, fromScale, toScale) => {
    // Input validation
    validateTemperature(temperature);
    const normalisedFromScale = validateAndNormaliseScale(fromScale);
    const normalisedToScale = validateAndNormaliseScale(toScale);
    
    // Get and apply the appropriate conversion function
    const convertFunction = getConversionFunction(normalisedFromScale, normalisedToScale);
    const result = convertFunction(temperature);
    
    // Round to 4 decimal places for consistency
    return Number(result.toFixed(4));
};
 
export default temperatureConversion;
