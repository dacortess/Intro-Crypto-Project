# DecryptSection Component Documentation

## Table of Contents

* [1. Overview](#1-overview)
* [2. Interfaces](#2-interfaces)
    * [2.1. `Method` Interface](#21-method-interface)
    * [2.2. `PossibleWord` Interface](#22-possibleword-interface)
    * [2.3. `DecryptionResult` Interface](#23-decryptionresult-interface)
    * [2.4. `DecryptSectionProps` Interface](#24-decryptsectionprops-interface)
* [3. Component: `DecryptSection`](#3-component-decryptsection)
    * [3.1. Props](#31-props)
    * [3.2. State Variables](#32-state-variables)
    * [3.3. Functions](#33-functions)
        * [3.3.1. `handleParamChange`](#331-handleparamchange)
        * [3.3.2. `handleDecrypt`](#332-handledecrypt)
* [4. Usage](#4-usage)


## 1. Overview

The `DecryptSection` component provides a user interface for decrypting text using various methods.  It allows users to input text, select a decryption method, provide necessary parameters, and view the decryption results.  The component utilizes the `decryptText` function from the `@/lib/cryptography` library to perform the decryption. Error handling and user feedback mechanisms are integrated using the `useToast` hook.


## 2. Interfaces

### 2.1. `Method` Interface

This interface defines the structure for each decryption method:

| Property           | Type                               | Description                                                                         |
|--------------------|------------------------------------|-------------------------------------------------------------------------------------|
| `value`            | `string`                           | Unique identifier for the method.                                                    |
| `label`            | `string`                           | User-friendly name displayed in the UI.                                              |
| `params`           | `string[]`                         | Array of parameter names required by the method.                                     |
| `paramOptions`     | `{ [key: string]: string[]; }`     | Optional; Provides a list of allowed values for specific parameters.                 |
| `paramPlaceholders` | `{ [key: string]: string; }`     | Optional; Placeholder text for input fields for each parameter.                      |
| `paramWarnings`    | `{ [key: string]: string; }`     | Optional; Warning messages to display for specific parameters.                       |
| `inputWarning`     | `string`                           | Optional; Warning message to display before the input text area.                    |


### 2.2. `PossibleWord` Interface

This interface represents a single possible decrypted word and its associated key:

| Property | Type    | Description                     |
|----------|---------|---------------------------------|
| `word`   | `string` | The decrypted word.             |
| `key`    | `string` | The key associated with the word. |


### 2.3. `DecryptionResult` Interface

This interface defines the structure of the decryption output:

| Property        | Type                     | Description                                         |
|-----------------|--------------------------|-----------------------------------------------------|
| `possibleWords` | `PossibleWord[]`         | Array of possible decrypted words and their keys.     |
| `mostProbable`  | `string`                 | The most probable decrypted word.                    |


### 2.4. `DecryptSectionProps` Interface

This interface defines the props passed to the `DecryptSection` component:

| Property | Type       | Description                               |
|----------|------------|-------------------------------------------|
| `methods` | `Method[]` | Array of available decryption methods. |


## 3. Component: `DecryptSection`

### 3.1. Props

The component receives an array of `Method` objects as a prop named `methods`.  Each `Method` object describes a decryption method available to the user.

### 3.2. State Variables

The component uses the following state variables:

| Variable Name    | Type                                  | Description                                                                  |
|-----------------|---------------------------------------|------------------------------------------------------------------------------|
| `inputText`     | `string`                              | Input text to be decrypted.                                                  |
| `method`        | `string`                              | Selected decryption method.                                                  |
| `params`        | `Record<string, string>`              | Parameters for the selected decryption method.                               |
| `outputText`    | `DecryptionResult | null`             | Decryption result (null if no decryption has been performed).               |
| `isLoading`     | `boolean`                             | Flag indicating whether the decryption process is in progress.               |


### 3.3. Functions

#### 3.3.1. `handleParamChange`

This function updates the state variable `params` when a parameter value changes. It uses a functional update to ensure that the state is correctly updated.

#### 3.3.2. `handleDecrypt`

This function is the core of the decryption process:

1. **Input Validation:** It first checks if the input text and decryption method are selected. If not, it displays appropriate error toasts. It also checks if all required parameters for the selected method are provided, again using toasts to notify the user if any parameters are missing.

2. **Decryption:**  If all input is valid, it sets the `isLoading` flag to `true` to indicate that the decryption is in progress. It then calls the `decryptText` function with the input text, method, and parameters.

3. **Result Handling:** The response from `decryptText` is handled using a `try...catch` block:
    * **Success:** A nested `try...catch` block attempts to parse the JSON response.  The JSON is expected to be an array containing: a list of `[word,key]` pairs, and the most probable single word. If parsing is successful, the data is formatted into the `DecryptionResult` structure and the `outputText` state is updated. If parsing fails, it indicates that `decryptText` returned a simple string, and the `outputText` is set accordingly. A success toast is then shown.
    * **Error:** If an error occurs during decryption or parsing, an error toast is displayed.

4. **Loading State:** Finally, regardless of success or failure, the `isLoading` flag is set to `false` to indicate completion.

The algorithm used for decryption is encapsulated within the `decryptText` function (external to this component).


## 4. Usage

The `DecryptSection` component is used to provide a user-friendly interface for performing text decryption.  It requires an array of `Method` objects defining the available decryption methods to be passed as a prop. The component handles input validation, decryption execution, and display of results, including error handling and user feedback via toasts.
