# EncryptSection Component Documentation

## Table of Contents

* [1. Overview](#1-overview)
* [2. Component Structure](#2-component-structure)
* [3. State Variables](#3-state-variables)
* [4. Function Details](#4-function-details)
    * [4.1 `handleParamChange` Function](#41-handleparamchange-function)
    * [4.2 `handleEncrypt` Function](#42-handleencrypt-function)
    * [4.3 `handleCopy` Function](#43-handlecopy-function)
* [5. Encryption Methods and Parameters](#5-encryption-methods-and-parameters)


## 1. Overview

The `EncryptSection` component provides a user interface for encrypting text using various cipher methods.  Users select a cipher, input text, provide necessary parameters, and then encrypt the text. The encrypted output is displayed and can be copied to the clipboard. The component utilizes the `encryptText` function from the `@/lib/cryptography` library for the actual encryption process.


## 2. Component Structure

The component is structured to present a user-friendly form:

1.  **Input Area:** A textarea for entering the text to be encrypted.
2.  **Method Selection:** A select dropdown to choose the encryption method (Caesar, Affine, Multiplicative, RSA, Permutation).
3.  **Parameter Input:** Dynamically rendered input fields (either text inputs or select dropdowns) for providing parameters specific to the selected encryption method.
4.  **Encrypt Button:** A button to initiate the encryption process.  Displays "Encrypting..." while processing.
5.  **Output Area:** A read-only textarea to display the encrypted text. Includes a button to copy the encrypted text to the clipboard.  Displays "Copying..." while copying.


## 3. State Variables

The component uses the following state variables managed by `useState` hook:

| Variable Name        | Data Type                               | Description                                                                     |
|-----------------------|-------------------------------------------|---------------------------------------------------------------------------------|
| `inputText`           | string                                    | Stores the text entered by the user.                                             |
| `method`              | string                                    | Stores the selected encryption method.                                           |
| `outputText`          | string                                    | Stores the encrypted text output.                                               |
| `params`              | `Record<string, string>`                 | Stores the parameters for the selected encryption method.                       |
| `isLoading`           | boolean                                   | Indicates whether the encryption process is in progress.                         |
| `isCopying`           | boolean                                   | Indicates whether the copying process to clipboard is in progress.             |


## 4. Function Details

### 4.1 `handleParamChange` Function

This function updates the `params` state variable whenever a parameter's value changes. It uses the functional update pattern to ensure the state update is based on the previous state.

```javascript
const handleParamChange = (param: string, value: string) => {
    setParams(prev => ({ ...prev, [param]: value }));
};
```

### 4.2 `handleEncrypt` Function

This function handles the encryption process. It performs input validation, calls the `encryptText` function, and updates the UI based on the success or failure of the encryption.

```javascript
const handleEncrypt = async () => {
    // Input validation
    if (!inputText) { /* ... */ }
    if (!method) { /* ... */ }
    if (selectedMethod && selectedMethod.params.some(param => !params[param])) { /* ... */ }

    setIsLoading(true); // Indicate loading
    try {
        const result = await encryptText(inputText, method, params);
        setOutputText(result);
        toast({ /* Success toast */ });
    } catch (error) {
        toast({ /* Error toast */ });
    } finally {
        setIsLoading(false); // End loading
    }
};
```


### 4.3 `handleCopy` Function

This function handles copying the encrypted text to the clipboard using the `navigator.clipboard` API. It updates the UI to indicate the copying status and displays appropriate toasts for success or failure.

```javascript
const handleCopy = async () => {
    if (!outputText) return;
    setIsCopying(true);
    try {
        await navigator.clipboard.writeText(outputText);
        toast({ /* Success toast */ });
    } catch (error) {
        toast({ /* Error toast */ });
    } finally {
        setIsCopying(false);
    }
};
```


## 5. Encryption Methods and Parameters

The component supports the following encryption methods, each with its specific parameters:

| Method Name         | Value       | Label                 | Parameters     | Description                                                                                                                              |
|----------------------|-------------|-----------------------|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| Caesar Cipher        | `caesar`    | Caesar Cipher          | `a`             | Shifts each letter in the alphabet by a fixed amount (`a`).                                                                              |
| Affine Cipher        | `affine`    | Affine Cipher         | `a`, `b`        | Uses a linear transformation:  `E(x) = (ax + b) mod 26`. `a` and `b` must satisfy certain conditions to ensure invertibility.           |
| Multiplicative Cipher | `multiplicative` | Multiplicative Cipher | `a`             | Similar to Caesar but only multiplies. `a` must be coprime to 26.                                                                        |
| RSA                  | `rsa`       | RSA                    | `p`, `q`        | Uses two large prime numbers (`p` and `q`) to generate public and private keys.  This implementation uses pre-defined small primes for demo. |
| Permutation Cipher   | `permutation` | Permutation Cipher     | `m`, `pi`       | Rearranges letters according to a permutation (`pi`) of length `m`.                                                                       |

The `PARAM_OPTIONS` object defines the allowed values for each parameter of each encryption method.  For example, for the Caesar cipher, the parameter 'a' can take values from 1 to 25.  The Affine and Multiplicative ciphers have restrictions on the values of 'a' to ensure invertibility.  The RSA cipher uses pre-defined small primes for demonstration purposes.  The permutation cipher allows for custom permutation input.
