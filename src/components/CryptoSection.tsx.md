# CryptoSection Component Documentation

## Table of Contents

* [1. Overview](#1-overview)
* [2. Component Props](#2-component-props)
* [3. Data Structures](#3-data-structures)
* [4. Internal State Variables](#4-internal-state-variables)
* [5. Event Handlers](#5-event-handlers)
    * [5.1 `handleParamChange`](#51-handleparamchange)
    * [5.2 `handleProcess`](#52-handleprocess)
    * [5.3 `handleCopy`](#53-handlecopy)
* [6. Rendering Logic](#6-rendering-logic)


## 1. Overview

The `CryptoSection` component provides a user interface for performing cryptographic operations on text.  It allows users to select a cryptographic method, input text, provide necessary parameters, and view the processed output. The component handles user input validation, process execution, and output display, including a copy-to-clipboard feature.  The cryptographic processing itself is delegated to a function passed as a prop (`onProcess`).


## 2. Component Props

The `CryptoSection` component accepts the following props:

| Prop Name       | Type                                                                     | Description                                                                                                         |
|-----------------|-------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| `title`         | `string`                                                              | The title displayed at the top of the section.                                                                       |
| `methods`       | `Method[]`                                                             | An array of available cryptographic methods. Each method object contains its value, label, parameters, and options. |
| `onProcess`     | `(text: string, method: string, params: Record<string, string>) => Promise<string>` | Asynchronous function to execute the selected cryptographic method. Returns a Promise resolving to the processed text.|
| `actionLabel`   | `string`                                                              | Label for the action button (e.g., "Encrypt", "Decrypt").                                                          |


## 3. Data Structures

The component uses the following interfaces:

**Interface: `Method`**

| Property        | Type             | Description                                                                          |
|-----------------|------------------|--------------------------------------------------------------------------------------|
| `value`         | `string`         | Unique identifier for the method.                                                    |
| `label`         | `string`         | Human-readable name of the method.                                                   |
| `params`        | `string[]`       | Array of parameter names required by the method.                                      |
| `paramOptions`  | `{ [key: string]: string[] }` | Optional object containing pre-defined options for specific parameters.                |
| `paramPlaceholders` | `{ [key: string]: string }` | Optional object containing placeholder text for input fields for each parameter. |


**Interface: `CryptoSectionProps`** (defined by the props)

This interface is described in the [Component Props](#2-component-props) section.


## 4. Internal State Variables

The component uses the following state variables:

| Variable Name    | Type                               | Description                                                                         |
|-------------------|------------------------------------|-------------------------------------------------------------------------------------|
| `inputText`      | `string`                           | Input text entered by the user.                                                       |
| `method`         | `string`                           | Selected cryptographic method.                                                        |
| `outputText`     | `string`                           | Processed output text.                                                               |
| `params`         | `Record<string, string>`           | An object storing the parameters for the selected method.                            |
| `isLoading`      | `boolean`                          | Flag indicating if the processing is in progress.                                  |
| `isCopying`      | `boolean`                          | Flag indicating if the copy-to-clipboard operation is in progress.                 |


## 5. Event Handlers

### 5.1 `handleParamChange`

This function updates the `params` state with a new parameter value. It uses the spread operator (`...prev`) to create a new object, ensuring that React re-renders the component.

### 5.2 `handleProcess`

This asynchronous function handles the cryptographic processing. It performs the following steps:

1. **Input Validation:** Checks if input text and method are provided. If not, it displays an error toast message.  It also validates that all required parameters for the selected method are filled.

2. **Processing:** Calls the `onProcess` prop with the input text, selected method, and parameters.

3. **State Updates:** Updates the `outputText` state with the result.

4. **Error Handling:** Uses a `try...catch` block to handle potential errors during processing, displaying an appropriate toast message.

5. **Loading State:** Sets `isLoading` to `true` before processing and `false` after processing (regardless of success or failure) using a `finally` block.


### 5.3 `handleCopy`

This asynchronous function handles the copy-to-clipboard functionality.  It attempts to copy the `outputText` to the clipboard using the `navigator.clipboard.writeText` API.  It updates the `isCopying` state to manage the disabled state of the copy button, and displays success or error toast messages.  A `finally` block ensures that `isCopying` is set to `false` after the operation completes.


## 6. Rendering Logic

The component renders a form with the following elements:

* A title (`h2` element).
* A `Textarea` for input text.
* A `Select` component for choosing a cryptographic method.
* A dynamically generated section for entering parameters based on the selected method, using `Textarea`, `Select`, or `Input` components as appropriate.
* A button to trigger the cryptographic processing (`handleProcess`).
* A `Textarea` to display the processed output text (only shown if `outputText` is not empty).
* A copy-to-clipboard button next to the output `Textarea`.

The conditional rendering (`{selectedMethod?.params && ...}`) ensures that parameter input fields are only shown if the selected method requires parameters.  The conditional rendering for the output text ensures that the output area only appears when there's text to display.  The parameter input uses a conditional rendering to determine whether to render a `Textarea`, `Select`, or `Input` based on the parameter name.  The `Select` component within the parameter input section uses dynamically generated options from `selectedMethod.paramOptions?.[param]`.
